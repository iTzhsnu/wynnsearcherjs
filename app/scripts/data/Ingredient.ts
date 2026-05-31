import { dDummy, dLootrun, dMerchant, dNever, dNormal, dQuest, dRaid, dSpecific, dUnobtainable, dWorldEvent, max, namePos } from "../utils/DataKeys";
import { haveManualDrop } from "../utils/DataUtils";
import { JSONValueEx } from "../utils/JSONValueEx";
import { AItem } from "./AItem";
import { idDropBy, Identifications, ids, reqPos, typeInt, typeString } from "./Identifications";

export const ingSkills = "skills";

export class Ingredient extends AItem {
    public getIdValue(idNum: number, sortType: string): number {
        const id = ids[idNum];
        return this.getIdValueBase(idNum, id.ingName, id.ingFieldPos, sortType);
    }

    public haveIdValue(idNum: number, howToObtain: JSONValueEx, filterMin: string, filterMax: string): boolean {
        const id = ids[idNum];
        const idName = id.ingName;
        const fieldPos = id.ingFieldPos;

        if (idName.length > 0 && typeof this.json === "object" && this.json !== null && !Array.isArray(this.json)) {
            if (id.idType === typeInt) {
                return this.getIdValue(idNum, max) !== 0;
            } else if (id.idType === typeString) {
                if (fieldPos.length > 0) {
                    return typeof this.json[fieldPos] === "object" && this.json[fieldPos] !== null && !Array.isArray(this.json[fieldPos]) && typeof this.json[fieldPos][idName] !== "undefined" && this.json[fieldPos][idName] !== null;
                } else {
                    if (typeof this.json[idName] !== "undefined" && this.json[idName] !== null) {
                        if (idName == idDropBy) {
                            const itemName = this.getName();
                            const dropType = id.displayName;
                            if (typeof howToObtain === "object" && howToObtain !== null && !Array.isArray(howToObtain)) {
                                switch (id.displayName) {
                                    case dNever: {
                                        let isObtainable = false;
                                        // Check from api data 
                                        if (Array.isArray(this.json[idDropBy])) {
                                            for (const je of this.json[idDropBy]) {
                                                if (typeof je === "object" && je !== null && !Array.isArray(je) 
                                                    && typeof je[namePos] === "string" && je[namePos] !== null && je[namePos] !== dDummy) {
                                                    isObtainable = true;
                                                }
                                            }
                                        }

                                        // Check from manual data
                                        const haveItem = haveManualDrop(howToObtain, itemName);
                                        if (haveItem > 0 && haveItem != 1) isObtainable = true;

                                        return !isObtainable;
                                    }
                                    case dSpecific: {
                                        // Check from api data
                                        if (Array.isArray(this.json[idDropBy])) {
                                            for (const je of this.json[idDropBy]) {
                                                if (typeof je === "object" && je !== null && !Array.isArray(je) 
                                                    && typeof je[namePos] === "string" && je[namePos] !== null && je[namePos] !== dDummy) {
                                                    return true;
                                                }
                                            }
                                        }

                                        return typeof howToObtain[dSpecific] === "object" && howToObtain[dSpecific] !== null && !Array.isArray(howToObtain[dSpecific]) && typeof howToObtain[dSpecific][itemName] !== "undefined" && howToObtain[dSpecific][itemName] !== null;
                                    }
                                    case dNormal:
                                    case dUnobtainable:
                                        if (Array.isArray(howToObtain[dropType])) {
                                            for (const je of howToObtain[dropType]) {
                                                if (typeof je === "string" && je !== null && je === itemName) return true;
                                            }
                                        }
                                        break;
                                    case dMerchant:
                                    case dQuest:
                                    case dRaid:
                                    case dWorldEvent:
                                    case dLootrun:
                                        return typeof howToObtain[dropType] === "object" && howToObtain[dropType] !== null && !Array.isArray(howToObtain[dropType]) && typeof howToObtain[dropType][itemName] !== "undefined" && howToObtain[dropType][itemName] !== null;
                                }
                            }
                        } else {
                            return true;
                        }
                    }
                }
            } else {
                console.log("Error: Can't check this ID");
            }
        }

        return false;
    }

    public getIdString(id: Identifications): string {
        return this.getIdStringBase(id.ingName, id.ingFieldPos);
    }
    
    public haveFieldPos(idNum: number): boolean {
        return this.haveFieldPosBase(ids[idNum].ingFieldPos);
    }

    // please use => if (Array.isArray(value))
    public getSkills(): JSONValueEx {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
            && typeof this.json[reqPos] === "object" && this.json[reqPos] !== null && !Array.isArray(this.json[reqPos])
        && typeof this.json[reqPos][ingSkills] === "object") {
            return this.json[reqPos][ingSkills];
        }

        return false;
    }
}