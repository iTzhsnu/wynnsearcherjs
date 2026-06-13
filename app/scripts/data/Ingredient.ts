import { dDummy, dLootrun, dMerchant, dNever, dNormal, dQuest, dRaid, dSpecific, dUnobtainable, dWorldEvent, ingCoordsPos, max, namePos } from "../utils/DataKeys";
import { haveManualDrop, setMerchant, setPosOnlyDropType, setSpecificDrop, setTooltip } from "../utils/DataUtils";
import { JSONValueEx } from "../utils/JSONValueEx";
import { AItem } from "./AItem";
import { idDropBy, Identifications, ids, reqPos, typeInt, typeString } from "./Identifications";
import styles from "../../styles.module.css";

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
    public getSkills(): string[] {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
            && typeof this.json[reqPos] === "object" && this.json[reqPos] !== null && !Array.isArray(this.json[reqPos])
            && Array.isArray(this.json[reqPos][ingSkills])) {
            return this.json[reqPos][ingSkills] as string[];
        }

        return [""];
    }

    public setHowToObtainTooltip(parent: HTMLElement, howToObtain: JSONValueEx): void {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json)) {
            const tooltip = document.createElement("button");
            const tooltipText = document.createElement("span");
            tooltip.className = styles.tooltip;
            tooltipText.className = styles.tooltip_text;

            const itemName = this.getName();
            const lv = this.getIdValue(0, max);
            const p = haveManualDrop(howToObtain, itemName);
            const texts = ["This item can be obtained by"];

            // Manual (specific not included)
            if (p > 0 && typeof howToObtain === "object" && howToObtain !== null && !Array.isArray(howToObtain)) {
                if (p === 11) {
                    texts.push("Hostile Mob and Any Loot Chests", "Level " + Math.max((lv - 4), 1) + " to " + (lv + 4), "");
                }
                
                if (setMerchant(texts, howToObtain, itemName, dMerchant)) texts.push("");
                if (setPosOnlyDropType(texts, howToObtain, itemName, dQuest, "Quest: ")) texts.push("");
                if (setPosOnlyDropType(texts, howToObtain, itemName, dRaid, "Raid Rewards: ")) texts.push("");
                if (setPosOnlyDropType(texts, howToObtain, itemName, dWorldEvent, "World Event: ")) texts.push("");
                if (setPosOnlyDropType(texts, howToObtain, itemName, dLootrun, "")) texts.push("");
            }

            // Dropped by
            if (Array.isArray(this.json[idDropBy])) {
                for (const je of this.json[idDropBy]) {
                    if (typeof je === "object" && je !== null && !Array.isArray(je)) {
                        if (typeof je[namePos] === "string" && je[namePos] !== null) {
                            if (je[namePos] === dDummy) continue;

                            texts.push("Mob Name: " + je[namePos]);

                            if (Array.isArray(je[ingCoordsPos])) {
                                const coords = je[ingCoordsPos];
                                if (Array.isArray(coords[0])) {
                                    for (const coordsN of coords) {
                                        if (Array.isArray(coordsN)) {
                                            texts.push("Locate: " + coordsN[0] + ", " + coordsN[1] + ", " + coordsN[2] + " | Radius: " + (coordsN[3] as number * 0.5));
                                        }
                                    }
                                } else {
                                    texts.push("Locate: " + coords[0] + ", " + coords[1] + ", " + coords[2] + " | Radius: " + (coords[3] as number * 0.5));
                                }
                            }
                            texts.push("");
                        }
                    }
                }
            }

            // Specific (Manual)
            setSpecificDrop(texts, howToObtain, itemName);

            if (texts[texts.length - 1].length === 0) texts.pop();
            setTooltip(tooltip, tooltipText, texts);

            parent.appendChild(tooltip);
            tooltip.appendChild(tooltipText);
            tooltip.appendChild(document.createTextNode("How to obtain (not perfect)"));
            parent.appendChild(document.createElement("br"));
        }
    }
}