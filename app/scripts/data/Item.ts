import { coordsPos, dAltar, dChallenge, dDungeon, dDungeonMerchant, dEvent, dLegendaryIsland, dLootChest, dLootrun, dMerchant, dMiniboss, dNever, dNormal, dOther, dQuest, dRaid, dSecretDiscovery, dTheQiraHive, dWorldEvent, max, namePos, typePos } from "../utils/DataKeys";
import { haveManualDrop, setMerchant, setPosOnlyDropType, setSpecificDrop, setTooltip } from "../utils/DataUtils";
import { JSONValueEx } from "../utils/JSONValueEx";
import { AItem } from "./AItem";
import { idDropMeta, idDropRestriction, Identifications, ids, typeInt, typeString } from "./Identifications";
import styles from "../../styles.module.css";

const questReqIdPos = 6;
const majorIdPos = 65;
const atkSpdIdPos = 43;
const setsIdPos = 149;

export class Item extends AItem {
    public getIdValue(idNum: number, sortType: string): number {
        const id = ids[idNum];
        return this.getIdValueBase(idNum, id.itemName, id.itemFieldPos, sortType);
    }

    public haveIdValue(idNum: number, howToObtain: JSONValueEx, filterMin: string, filterMax: string): boolean {
        const id = ids[idNum];
        const idName = id.itemName;
        const fieldPos = id.itemFieldPos;
        if (idName.length > 0 && typeof this.json === "object" && this.json !== null && !Array.isArray(this.json)) {
            if (id.idType === typeInt) {
                return this.getIdValue(idNum, max) !== 0;
            } else if (id.idType === typeString) {
                if (fieldPos.length > 0) {
                    if (typeof this.json[fieldPos] === "object" && this.json[fieldPos] !== null && !Array.isArray(this.json[fieldPos])) {
                        const j = this.json[fieldPos];
                        if (idNum === questReqIdPos) { // If Quest Req
                            if (typeof j[idName] === "string" && j[idName] !== null) {
                                if (filterMin.length > 0 || filterMax.length > 0) {
                                    let filterName = filterMax;
                                    if (filterMin.length > 0) filterName = filterMin;

                                    return j[idName].toLowerCase().includes(filterName.toLowerCase());
                                } else {
                                    return true;
                                }
                            }
                        } else {
                            return typeof j[idName] !== "undefined" && j[idName] !== null;
                        }
                    }
                } else if (typeof this.json[idName] !== "undefined" && this.json[idName] !== null) {
                    const j = this.json[idName];

                    if (idName === idDropRestriction) { // If Drop Type
                        const itemName = this.getName();
                        const dropType = id.displayName;

                        // Manual Data
                        if (haveManualDrop(howToObtain, itemName) > 0 
                        && typeof howToObtain === "object" && howToObtain !== null && !Array.isArray(howToObtain) 
                        && typeof howToObtain[dropType] !== "undefined" && howToObtain[dropType] !== null) {
                            if (Array.isArray(howToObtain[dropType])) {
                                for (const je of howToObtain[dropType]) {
                                    if (typeof je === "string" && je === itemName) return true;
                                }
                            } else if (typeof howToObtain[dropType] === "object") {
                                if (typeof howToObtain[dropType][itemName] !== "undefined") return true;
                            }
                        }

                        // Drop Meta
                        if (typeof this.json[idDropMeta] === "object" && this.json[idDropMeta] !== null && !Array.isArray(this.json[idDropMeta]) 
                            && typeof this.json[idDropMeta][typePos] !== "undefined" && this.json[idDropMeta][typePos] !== null) {
                            const j = this.json[idDropMeta][typePos];
                            if (Array.isArray(j)) {
                                for (const je of j) {
                                    if (typeof je === "string" && dropType === je) return true;
                                }
                            } else if (typeof j === "string") {
                                return dropType === j;
                            }
                        }

                        // Drop Restriction
                        if (typeof this.json[idDropRestriction] === "string" && this.json[idDropRestriction] !== null) {
                            if (dropType === dNever && haveManualDrop(howToObtain, itemName) > 0) {
                                return false;
                            }

                            return dropType === this.json[idDropRestriction];
                        }


                    } else if (idNum === majorIdPos) { // If Major ID
                        if (filterMin.length > 0 || filterMax.length > 0) {
                            let filterName = filterMax;
                            if (filterMin.length > 0) filterName = filterMin;

                            if (typeof j === "object" && !Array.isArray(j)) {
                                const keys = Object.keys(j);
                                for (let i = 0; keys.length > i; ++i) {
                                    if (keys[i].toLowerCase().includes(filterName.toLowerCase())) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            return true;
                        }
                    } else if (idNum === atkSpdIdPos || idNum === setsIdPos) { // If Attack Speed or Sets
                        if (filterMin.length > 0 || filterMax.length > 0) {
                            let filterName = filterMax;
                            if (filterMin.length > 0) filterName = filterMin;

                            return typeof j === "string" && j.toLowerCase().includes(filterName.toLowerCase());
                        } else {
                        return true;
                        }
                    }

                    return true;
                }
            } else {
                console.log("Error: Can't check this ID");
            }
        }


        return false;
    }

    public getIdString(id: Identifications): string {
        return this.getIdStringBase(id.itemName, id.itemFieldPos);
    }

    public haveFieldPos(idNum: number): boolean {
        return this.haveFieldPosBase(ids[idNum].itemFieldPos);
    }

    public setHowToObtainTooltip(parent: HTMLElement, howToObtain: JSONValueEx): void {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json)) {
            const tooltip = document.createElement("button");
            const tooltipText = document.createElement("span");
            tooltip.className = styles.tooltip;
            tooltipText.className = styles.tooptip_text;

            const itemName = this.getName();
            const lv = this.getIdValue(0, max);
            const p = haveManualDrop(howToObtain, itemName);
            const texts = ["This item can be obtained by"];

            if (p > 0 && typeof this.json[idDropMeta] === "undefined" && typeof howToObtain === "object" && howToObtain !== null && !Array.isArray(howToObtain)) {
                if (p === 1) {
                    // Unobtainable
                    setTooltip(tooltip, tooltipText, ["This item can't be obtained."]);
                } else if (p === 13) {
                    // Discontinued
                    setTooltip(tooltip, tooltipText, ["This item is Discontinued."]);
                } else {
                    // Normal (Hostile Mob and Any Loot)
                    if (Array.isArray(howToObtain[dNormal])) {
                        for (const je of howToObtain[dNormal]) {
                            if (typeof je === "string" && je !== null && je === itemName) {
                                texts.push("Hostile Mob and Any Loot Chests", "Level" + Math.max((lv - 4), 1) + " to " + (lv + 4));
                                break;
                            }
                        }
                    }
                    
                    // Legendary Island
                    if (Array.isArray(howToObtain[dLegendaryIsland])) {
                        for (const je of howToObtain[dLegendaryIsland]) {
                            if (typeof je === "string" && je !== null && je === itemName) {
                                texts.push("Legendary Island");
                                break;
                            }
                        }
                    }

                    setPosOnlyDropType(texts, howToObtain, itemName, dDungeon, "");
                    setMerchant(texts, howToObtain, itemName, dMerchant);
                    setMerchant(texts, howToObtain, itemName, dDungeonMerchant);
                    setPosOnlyDropType(texts, howToObtain, itemName, dTheQiraHive, "The Qira Hive: ");
                    setPosOnlyDropType(texts, howToObtain, itemName, dSecretDiscovery, "");
                    setPosOnlyDropType(texts, howToObtain, itemName, dQuest, "Quest: ");
                    setPosOnlyDropType(texts, howToObtain, itemName, dRaid, "Raid Rewards: ");
                    setPosOnlyDropType(texts, howToObtain, itemName, dOther, "");
                    setPosOnlyDropType(texts, howToObtain, itemName, dWorldEvent, "World Event: ");
                    setPosOnlyDropType(texts, howToObtain, itemName, dLootrun, "");

                    setSpecificDrop(texts, howToObtain, itemName);
                }
            } else {
                if (typeof this.json[idDropMeta] === "object" && this.json[idDropMeta] !== null && Array.isArray(this.json[idDropMeta])) {
                    const j = this.json[idDropMeta];
                    let t = "";

                    if (typeof j[namePos] === "string" && j[namePos] !== null) t = j[namePos];
                    
                    if (typeof j[typePos] !== "undefined") {
                        if (Array.isArray(j[typePos]) && typeof j[dEvent] === "string" && j[dEvent] !== null) {
                            texts.push(" Merchant and " + j[dEvent] + " Event");
                        } else if (typeof j[typePos] === "string" && j[typePos] !== null) {
                            let skipUnknown = false;
                            switch (j[typePos]) {
                                case dDungeonMerchant:
                                    texts.push(t + " Dungeon Merchant");
                                    break;
                                case dRaid:
                                    texts.push(t + " Raid Rewards");
                                    break;
                                case dAltar:
                                case dMerchant:
                                case dLootrun:
                                case dQuest:
                                case dChallenge:
                                case dMiniboss:
                                    skipUnknown = true;
                                default:
                                    texts.push(t + " " + j[typePos].charAt(0).toUpperCase() + j[typePos].substring(1));
                                    
                                    if (!skipUnknown) console.log(itemName + " has unknown drop type: " + j[typePos]);
                                    break;
                            }
                        }
                    }

                    if (Array.isArray(j[coordsPos])) {
                        // may j[coordsPos][0] as number ?
                        const p: number[] = [];
                        for (const je of j[coordsPos]) {
                            if (typeof je === "number" && je !== null) {
                                p.push(je);
                            }
                        }
                        texts.push("Locate: " + p[0] + ", " + p[1] + ", " + p[2]);
                    }
                } else if (typeof this.json[idDropRestriction] === "string" && this.json[idDropRestriction] !== null) {
                    switch (this.json[idDropRestriction]) {
                        case dNormal:
                            texts.push();
                            break;
                        case dLootChest:
                            texts.push();
                            break;
                        case dNever:
                            texts.push("Unknown");
                            break;
                        case dDungeon:
                            texts.push("");
                            break;
                        default:
                            texts.push();
                            console.log();
                            break;
                    }
                }
            }

            setTooltip(tooltip, tooltipText, texts);

            parent.appendChild(tooltip);
            tooltip.appendChild(tooltipText);
            tooltip.appendChild(document.createTextNode("How to obtain (not perfect)"));
        }
    }
}