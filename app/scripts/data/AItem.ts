import { JSONValue } from "next/dist/server/config-shared";
import { ids, raw, min, max, identified, typeInt, typeSum } from "./Identifications";
import { sumIds } from "./SumIds"; 

export abstract class AItem {
    protected json: JSONValue;

    public constructor(json: JSONValue) {
        this.json = json;
    }

    // sortType: true=max, false=min
    public abstract getIdValue(idNum: number, sortType: string): number;

    protected getIdValueBase(idNum: number, idName: string, fieldPos: string, sortType: string): number {
        const id = ids[idNum]; // number to Identifications
        if (idName.length > 0 && id.idType === typeInt && typeof this.json === "object" && !Array.isArray(this.json)) {
            if (fieldPos.length > 0) { // have ID fieldpos
                if (typeof this.json[fieldPos] === "object" && !Array.isArray(this.json[fieldPos])) {
                    const j = this.json[fieldPos];
                    if (typeof j[idName] === "object" && !Array.isArray(j[idName])) {
                        const j2 = j[idName];
                        if (typeof this.json[identified] === "boolean" && this.json[identified]) { // Not have ID range (identified)
                            if (typeof j2[raw] === "number") {
                                return j2[raw];
                            } else if (typeof j2[min] === "number" && typeof j2[max] === "number") { // Not have ID range (get from min or max)
                                if (AItem.isReversedId(idNum)) {
                                    if (j2[max] > 0) return AItem.getBaseId(j2[min]);
                                } else {
                                    if (j2[max] < 0) return AItem.getBaseId(j2[min]);
                                }

                                return AItem.getBaseId(j2[max]);
                            }
                        } else { // have ID range
                            if (typeof j2[sortType] === "number") return j2[sortType];
                        }
                    } else if (typeof j[idName] === "number") {
                        return j[idName];
                    }
                }
            } else { // Not have ID fieldpos and ID range
                if (typeof this.json[idName] === "number") return this.json[idName];
            }
        }
        return 0;
    }

    public haveId(idNum: number, howToObtain: JSONValue, min: string, max: string): boolean {
        const id = ids[idNum];
        if (id.idType !== typeSum) {
            return this.haveIdValue(idNum, howToObtain, min, max);
        } else {
            if (idNum >= 195 || idNum <= 197) { // SUM (Spell Appro~) or SUM (Melee Appro~)
                return this.haveDamageAppropriateSumId(id.sumIds, min, max);
            }

            let need = false;
            let needAll = true;
            const sum = sumIds[id.sumIds];

            for (let n = 0; sum.sumBaseIds.length > n; ++n) {
                const has = this.haveIdValue(sum.sumBaseIds[n], howToObtain, min, max);
                if (has) {
                    need = true;
                } else {
                    needAll = false;
                }
            }

            if (sum.needAll) {
                return needAll;
            } else {
                return need;
            }
        }
    }

    public abstract haveIdValue(idNum: number, howToObtain: JSONValue, min: string, max: string): boolean;

    public getTotalSumFloat(sumNum: number, sortType: string, min: string, max: string): number {
        // TODO set value => a, b
        if (sumNum >= 195 && sumNum <= 197) {
            return this.getDamAppropriateSumFloat(sumNum, sortType, min, max);
        }

        const sum = sumIds[sumNum];
        let total = 0;
        let sumTotal = 0;
        let sumTotalSub = 0;

        // Base IDs
        if (sum.sumBaseIds.length > 0) {
            for (let n = 0; sum.sumBaseIds.length > n; ++n) {
                const baseId = sum.sumBaseIds[n];
                if (sum.useAverage) {
                    sumTotal += (this.getIdValue(baseId, max) + this.getIdValue(baseId, min)) * 0.5;
                } else {
                    sumTotal += this.getIdValue(baseId, sortType);
                }
            }
        }

        // Sub IDs
        if (sum.sumMultiIds.length > 0) {
            for (let n = 0; sum.sumMultiIds.length > n; ++n) {
                sumTotalSub += this.getIdValue(sum.sumMultiIds[n], sortType);
            }

            if (sumTotal < 0 && sumTotalSub < 0) {
                sumTotalSub *= -1;
            } else if (sumTotal < 0 && sumTotalSub > 0) {
                sumTotalSub *= -1;
                if (sumTotalSub < -100) {
                    sumTotalSub = -100;
                }
            }
            sumTotal = sumTotal * (1 + sumTotalSub * 0.01);
        }
        if (sum.sumAddIds.length > 0) {
            for (let n = 0; sum.sumAddIds.length > n; n++) {
                const t = this.getIdValue(sum.sumAddIds[n], sortType);

                if (sum.isMeleeDPS) {
                    sumTotal += t;
                } else {
                    total += t;
                }
            }
        }

        // DPS
        if (sum.isDPS) {
            const atkSpeed = this.getAttackSpeed();
            if (atkSpeed !== 0) {
                sumTotal *= atkSpeed;
            }
        }

        return total + sumTotal;
    }

    public haveDamageAppropriateSumId(sumNum: number, weaponName: string, powder: string): boolean {
        if (weaponName.length > 0) {
            
        }

        return false;
    }

    public getDamAppropriateSumFloat(id: number, sortType: string, weaponName: string, powder: string): number {
        return 0;
    }

    public getAttackSpeed(): number {
        return 0;
    }

    public getName(): string {
        return "";
    }

    public getSubType(): string {
        return "";
    }

    public getType(): string {
        return "";
    }

    public abstract getIdString(id: number): string;

    protected getIdStringBase(id: number, idName: string, fieldPos: string): string {
        return "";
    }

    public abstract haveFieldPos(id: number): boolean;

    public haveFieldPosBase(fieldPos: string): boolean {
        return false;
    }

    public static getBaseId(i: number) {
        return Math.round(i / 1.3);
    }

    public static isReversedId(id: number): boolean {
        return id >= 66 && id <= 73;
    }
}