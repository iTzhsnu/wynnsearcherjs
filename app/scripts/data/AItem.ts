import { getItemFromName, setPowderOnNonCraft, setTooltip } from "../utils/DataUtils";
import { JSONValueEx } from "../utils/JSONValueEx";
import { Identifications, ids, typeInt, typeSum } from "./Identifications";
import { sumIds } from "./SumIds";
import { raw, min, max, identified, sFast, vFast, fast, aNormal, slow, vSlow, sSlow, namePos, typePos, subTypePos, sBonuses, sSets, sMinor } from "../utils/DataKeys";
import setsData from "../../json/sets.json"
import styles from "../../styles.module.css";

const baseDamages = [29, 30, 31, 32, 33, 34];
const atkSpdId = ids[43];

export abstract class AItem {
    protected readonly json: JSONValueEx;
    public readonly filterMinValues: number[] = [0, 0, 0, 0];
    public readonly filterMaxValues: number[] = [0, 0, 0, 0];

    public constructor(json: JSONValueEx) {
        this.json = json;
    }

    // sortType: true=max, false=min
    public abstract getIdValue(idNum: number, sortType: string): number;

    protected getIdValueBase(idNum: number, idName: string, fieldPos: string, sortType: string): number {
        const id = ids[idNum]; // number to Identifications
        if (idName.length > 0 && id.idType === typeInt && typeof this.json === "object" && this.json !== null && !Array.isArray(this.json)) {
            if (fieldPos.length > 0) { // have ID fieldpos
                if (typeof this.json[fieldPos] === "object" && this.json[fieldPos] !== null && !Array.isArray(this.json[fieldPos])) {
                    const j = this.json[fieldPos];
                    if (typeof j[idName] === "object" && j[idName] !== null && !Array.isArray(j[idName])) {
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

    public haveId(idNum: number, howToObtain: JSONValueEx, filterMin: string, filterMax: string): boolean {
        const id = ids[idNum];
        if (id.idType !== typeSum) {
            return this.haveIdValue(idNum, howToObtain, filterMin, filterMax);
        } else {
            if (idNum === 195 || idNum === 196) { // SUM (Spell Appro~) or SUM (Melee Appro~)
                return this.haveDamageAppropriateSumId(id.sumIds, filterMin, filterMax);
            }

            let need = false;
            let needAll = true;
            const sum = sumIds[id.sumIds];

            if (sum.sumIds.length > 0) { // if sum in sum
                for (const sumId of sum.sumIds) {
                    const has = this.haveId(sumId, howToObtain, filterMin, filterMax);
                    if (has) {
                        need = true;
                    } else {
                        needAll = false;
                    }
                }
            } else { // if normal sum
                for (const baseId of sum.baseIds) {
                const has = this.haveIdValue(baseId, howToObtain, filterMin, filterMax);
                if (has) {
                    need = true;
                } else {
                    needAll = false;
                }
            }
            }

            if (sum.needAll) {
                return needAll;
            } else {
                return need;
            }
        }
    }

    public abstract haveIdValue(idNum: number, howToObtain: JSONValueEx, filterMin: string, filterMax: string): boolean;

    public getTotalSumFloat(sumNum: number, sortType: string, filterMin: string, filterMax: string): number {
        if (sumNum === 46 || sumNum === 47) {
            return this.getDamAppropriateSumFloat(sumNum, sortType, filterMin, filterMax);
        }

        const sum = sumIds[sumNum];
        let total = 0;
        let sumTotal = 0;
        let sumTotalSub = 0;

        // Base IDs
        if (sum.baseIds.length > 0) {
            for (let n = 0; sum.baseIds.length > n; ++n) {
                const baseId = sum.baseIds[n];
                if (sum.useAverage) {
                    sumTotal += (this.getIdValue(baseId, max) + this.getIdValue(baseId, min)) * 0.5;
                } else {
                    sumTotal += this.getIdValue(baseId, sortType);
                }
            }
        }

        // Sub IDs
        if (sum.multiIds.length > 0) {
            for (let n = 0; sum.multiIds.length > n; ++n) {
                sumTotalSub += this.getIdValue(sum.multiIds[n], sortType);
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
        if (sum.addIds.length > 0) {
            for (let n = 0; sum.addIds.length > n; n++) {
                const t = this.getIdValue(sum.addIds[n], sortType);

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
        if (weaponName.length > 0 && getItemFromName(weaponName)) {
            const weapon = getItemFromName(weaponName);

            if (weapon !== null) {
                const have = [false, false, false, false, false, false];

                // Set Powder Damage
                if (powder.length > 0) {
                    const size = (powder.length >> 1) << 1;
                    POWDER_FIND: for (let i = 0; size > i; i += 2) {
                        const tier = parseInt(powder.charAt(i + 1));
                        if (Number.isNaN(tier)) {
                            break;
                        } else {
                            if (tier > 0 && 7 >= tier) {
                                switch (powder.charAt(i)) {
                                    case 'e':
                                        have[1] = true;
                                        break;
                                    case 't':
                                        have[2] = true;
                                        break;
                                    case 'w':
                                        have[3] = true;
                                        break;
                                    case 'f':
                                        have[4] = true;
                                        break;
                                    case 'a':
                                        have[5] = true;
                                        break;
                                    default:
                                        break POWDER_FIND;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }

                // Weapon Damage
                for (let i = 0; baseDamages.length > i; ++i) {
                    if (weapon.haveId(baseDamages[i], null, "", "")) have[i] = true;
                }

                // Check
                if (have[0] || have[1] || have[2] || have[3] || have[4] || have[5]) {
                    const sum = sumIds[sumNum];
                    // Raw Damage
                    for (const id of sumIds[sum.sumIds[6]].addIds) {
                        if (this.haveId(id, null, "", "")) return true;
                    }

                    // Raw Elem. Damage
                    for (const id of sumIds[sum.sumIds[7]].addIds) {
                        if (this.haveId(id, null, "", "")) return true;
                    }

                    // Neutral, Earth, Thunder, Water, Fire and Air Damage (Raw and %)
                    for (let i = 0; 6 > i; ++i) {
                        if (have[i]) {
                            // Raw ~ Damage and Raw ~ Melee or Spell Damage
                            for (const id of sumIds[sum.sumIds[i]].addIds) {
                                if (this.haveId(id, null, "", "")) return true;
                            }

                            // ~ Damage %, Elem. Damage %, ~ Melee or Spell Damage % or Elem. Melee or Spell Damage %
                            for (const id of sumIds[sum.sumIds[i]].multiIds) {
                                if (this.haveId(id, null, "", "")) return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    public getDamAppropriateSumFloat(sumNum: number, sortType: string, weaponName: string, powder: string): number {
        if (weaponName.length > 0 && getItemFromName(weaponName)) {
            const weapon = getItemFromName(weaponName);
            const mainSum = sumIds[sumNum];

            if (weapon !== null) {
                let total = 0;
                let totalSub = 0;

                // Set Weapon Min and Max Damage
                const damagesMin = [weapon.getIdValue(baseDamages[0], min), weapon.getIdValue(baseDamages[1], min), weapon.getIdValue(baseDamages[2], min), weapon.getIdValue(baseDamages[3], min), weapon.getIdValue(baseDamages[4], min), weapon.getIdValue(baseDamages[5], min)];
                const damagesMax = [weapon.getIdValue(baseDamages[0], max), weapon.getIdValue(baseDamages[1], max), weapon.getIdValue(baseDamages[2], max), weapon.getIdValue(baseDamages[3], max), weapon.getIdValue(baseDamages[4], max), weapon.getIdValue(baseDamages[5], max)];

                // Set Powder Damage
                if (powder.length > 0) {
                    setPowderOnNonCraft(damagesMin, powder, min);
                    setPowderOnNonCraft(damagesMax, powder, max);
                }

                // Avg. Damages
                const damages = [
                    (damagesMin[0] + damagesMax[0]) * 0.5,
                    (damagesMin[1] + damagesMax[1]) * 0.5,
                    (damagesMin[2] + damagesMax[2]) * 0.5,
                    (damagesMin[3] + damagesMax[3]) * 0.5,
                    (damagesMin[4] + damagesMax[4]) * 0.5,
                    (damagesMin[5] + damagesMax[5]) * 0.5
                ];

                // Apply Damage %, Raw ~ Damage and Raw ~ Melee or Spell Damage
                for (let i = 0; 6 > i; ++i) {
                    if (damages[i] != 0) {
                        const sum = sumIds[mainSum.sumIds[i]];
                        for (const id of sum.multiIds) { // %
                            let dmg = damages[i] * this.getIdValue(id, sortType) * 0.01;
                            if (dmg < 0) dmg = 0;
                            total += dmg;
                        }

                        for (const id of sum.addIds) { // Raw
                            totalSub += this.getIdValue(id, sortType);
                        }
                    }
                }

                if (damages[0] || damages[1] || damages[2] || damages[3] || damages[3] || damages[4] || damages[5]) {
                    // Apply Raw Damages
                    for (const id of sumIds[mainSum.sumIds[6]].addIds) {
                        totalSub += this.getIdValue(id, sortType);
                    }

                    // Apply Raw Elem. Damages
                    if (damages[1] || damages[2] || damages[3] || damages[4] || damages[5]) {
                        for (const id of sumIds[mainSum.sumIds[7]].addIds) {
                            totalSub += this.getIdValue(id, sortType);
                        }
                    }

                    // Return Damage
                    if (mainSum.isDPS) { // if spell dps
                        total *= weapon.getAttackSpeed();
                    }

                    return total + totalSub;
                }
            }
        }

        return 0;
    }

    public getAttackSpeed(): number {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
            && typeof this.json[atkSpdId.itemName] === "string" && this.json[atkSpdId.itemName] !== null) {
            switch (this.json[atkSpdId.itemName]) {
                case sFast:
                    return 4.3;
                case vFast:
                    return 3.1;
                case fast:
                    return 2.5;
                case aNormal:
                    return 2.05;
                case slow:
                    return 1.5;
                case vSlow:
                    return 0.83;
                case sSlow:
                    return 0.51;
            }
        }

        return 0;
    }

    public getName(): string {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
            && typeof this.json[namePos] === "string" && this.json[namePos] !== null) {
            return this.json[namePos];
        }

        return "";
    }

    public getSubType(): string {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
            && typeof this.json[subTypePos] === "string" && this.json[subTypePos] !== null) {
            return this.json[subTypePos];
        }
        
        return "";
    }

    public getType(): string {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
            && typeof this.json[typePos] === "string" && this.json[typePos] !== null) {
            return this.json[typePos];
        }

        return "";
    }

    public getIdStringFromIdNum(idNum: number): string {
        return this.getIdString(ids[idNum]);
    }

    public abstract getIdString(id: Identifications): string;

    protected getIdStringBase(idName: string, fieldPos: string): string {
        if (idName.length > 0 && typeof this.json === "object" && this.json !== null && !Array.isArray(this.json)) {
            if (fieldPos.length === 0) {
                if (typeof this.json[idName] === "string" && this.json[idName] !== null) return this.json[idName];
            } else {
                if (typeof this.json[fieldPos] === "object" && this.json[fieldPos] !== null && !Array.isArray(this.json[fieldPos])
                    && typeof this.json[fieldPos][idName] === "string" && this.json[fieldPos][idName] !== null) return this.json[fieldPos][idName];
            }
        }

        return "";
    }

    public abstract haveFieldPos(idNum: number): boolean;

    public haveFieldPosBase(fieldPos: string): boolean {
        return fieldPos.length > 0;
    }

    public abstract setHowToObtainTooltip(parent: HTMLElement, howToObtain: JSONValueEx): void;

    public setMajorIdTooltip(parent: HTMLElement): void {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) && this.haveId(65, null, "", "")) {
            const idName = ids[65].itemName;
            
            if (typeof this.json[idName] === "object" && this.json[idName] !== null && !Array.isArray(this.json[idName])) {
                const tooltip = document.createElement("span");
                const tooltipText = document.createElement("span");
                tooltip.className = styles.tooltip;
                tooltipText.className = styles.tooltip_text;

                const key = Object.keys(this.json[idName])[0];
                const value = this.json[idName][key];

                if (typeof value === "string" && value !== null) tooltipText.innerHTML += value;
            
                parent.appendChild(tooltip);
                tooltip.appendChild(tooltipText);
                tooltip.appendChild(document.createTextNode("Major ID: " + key));
                parent.appendChild(document.createElement("br"));
            }
        }
    }

    public setSetEffectTooltip(parent: HTMLElement): void {
        if (this.haveId(149, null, "", "")) {
            const tooltip = document.createElement("button");
            const tooltipText = document.createElement("span");
            tooltip.className = styles.tooltip;
            tooltipText.className = styles.tooltip_text;

            const texts: string[] = [];
            const sets = setsData as JSONValueEx;

            if (typeof sets === "object" && sets !== null && !Array.isArray(sets) 
                && typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
                && Array.isArray(this.json[sSets]) && typeof this.json[sSets][0] == "string" && this.json[sSets][0] !== null) {
                const setName = this.json[sSets][0];
                const setData = sets[setName];
                texts.push(setName);

                if (typeof setData === "object" && setData !== null && !Array.isArray(setData) 
                    && typeof setData[sBonuses] == "object" && setData[sBonuses] !== null && !Array.isArray(setData[sBonuses])) {
                    const bonuses = setData[sBonuses];
                    for (let i = 0; 10 > i; ++i) {
                        const n = String(i);
                        if (typeof bonuses[n] === "object" && bonuses[n] !== null && !Array.isArray(bonuses[n]) && typeof bonuses[n][sMinor] === "object" && bonuses[n][sMinor] !== null && !Array.isArray(bonuses[n][sMinor])) {
                            texts.push(n + ":");
                            const bonus = bonuses[n][sMinor];
                            for (let j = 9; 118 >= j; ++j) {
                                if (j === 65 || j === 64 || j === 43 
                                    || (35 >= j && j >= 29) 
                                    || (22 >= j && j >= 18)) continue;

                                const id = ids[j];
                                const idName = id.itemName;
                                if (typeof bonus[idName] === "number" && bonus[idName] !== null) {
                                    texts.push(id.displayName + " " + bonus[idName] + id.displaySp);
                                }
                            }
                            texts.push("");
                        }
                    }
                }
            }

            setTooltip(tooltip, tooltipText, texts);
            
            parent.appendChild(tooltip);
            tooltip.appendChild(tooltipText);
            tooltip.appendChild(document.createTextNode("Set Bonuses"));
            parent.appendChild(document.createElement("br"));
        }
    }

    public static getBaseId(idNum: number) {
        return Math.round(idNum / 1.3);
    }

    public static isReversedId(idNum: number): boolean {
        return idNum >= 66 && idNum <= 73;
    }
}