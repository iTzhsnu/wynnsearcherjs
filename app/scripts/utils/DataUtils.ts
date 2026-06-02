import { Item } from "../data/Item";
import { wynnItems } from "../DataManager";

import powderData from "../../json/powders.json"
import { JSONValueEx } from "./JSONValueEx";
import { dNormal, dDungeon, dDungeonMerchant, dRaid, dMerchant, dLootrun, dQuest, dDiscontinued, dUnobtainable, dLegendaryIsland, dTheQiraHive, dSecretDiscovery, dOther, dWorldEvent, dSpecific, namePos } from "./DataKeys";

let itemDataCache: Item | null = null;
export function getItemFromName(name: string): Item | null {
    if (itemDataCache !== null && itemDataCache.getName().toLowerCase() === name.toLowerCase()) {
        return itemDataCache;
    } else {
        for (const item of wynnItems) {
            if (item.getName().length > 0 && item.getName().toLowerCase() === name.toLowerCase()) {
                itemDataCache = item;
                return item;
            }
        }
    }

    return null;
}

export function setPowderOnNonCraft(damages: number[], powderText: string, sortType: string): void {
    let neutral = damages[0];

    const size = (powderText.length >> 1) << 1;
    for (let i = 0; size > i; i += 2) {
        const text = powderText.substring(i, i+2);
        if (text in powderData) {
            const powder = powderData[text as keyof typeof powderData];
            
            const converted = Math.floor(Math.min(neutral, damages[0] * powder.convert * 0.01));
            const addValue = powder[sortType as keyof typeof powder];
            neutral -= converted;
            if (typeof addValue === "number") damages[powder.pos] += converted + addValue;
        }
    }

    damages[0] = neutral;
}

export function haveManualDrop(json: JSONValueEx, itemName: string): number {
    if (typeof json === "object" && json !== null && !Array.isArray(json)) {
        // Normal
        if (Array.isArray(json[dNormal])) {
            for (const j of json[dNormal]) {
                if (typeof j === "string" && j === itemName) return 11;
            }
        }

        // Unobtainable
        if (Array.isArray(json[dUnobtainable])) {
            for (const j of json[dUnobtainable]) {
                if (typeof j === "string" && j === itemName) return 1;
            }
        }

        // Dungeon and Forgery Chest
        if (typeof json[dDungeon] === "object" && json[dDungeon] !== null && !Array.isArray(json[dDungeon]) 
            && typeof json[dDungeon][itemName] !== "undefined" && json[dDungeon][itemName] !== null) return 2;

        // Legendary Island
        if (Array.isArray(json[dLegendaryIsland])) {
            for (const j of json[dLegendaryIsland]) {
                if (typeof j === "string" && j === itemName) return 3;
            }
        }

        // Merchant
        if (typeof json[dMerchant] === "object" && json[dMerchant] !== null && !Array.isArray(json[dMerchant]) 
            && typeof json[dMerchant][itemName] !== "undefined" && json[dMerchant][itemName] !== null) return 4;

        // The Qira Hive
        if (typeof json[dTheQiraHive] === "object" && json[dTheQiraHive] !== null && !Array.isArray(json[dTheQiraHive]) 
            && typeof json[dTheQiraHive][itemName] !== "undefined" && json[dTheQiraHive][itemName] !== null) return 5;

        // Secret Discovery
        if (typeof json[dSecretDiscovery] === "object" && json[dSecretDiscovery] !== null && !Array.isArray(json[dSecretDiscovery]) 
            && typeof json[dSecretDiscovery][itemName] !== "undefined" && json[dSecretDiscovery][itemName] !== null) return 6;

        // Quest Rewards
        if (typeof json[dQuest] === "object" && json[dQuest] !== null && !Array.isArray(json[dQuest]) 
            && typeof json[dQuest][itemName] !== "undefined" && json[dQuest][itemName] !== null) return 7;

        // Specific
        if (typeof json[dSpecific] === "object" && json[dSpecific] !== null && !Array.isArray(json[dSpecific]) 
            && typeof json[dSpecific][itemName] !== "undefined" && json[dSpecific][itemName] !== null) return 8;

        // Raid Rewards
        if (typeof json[dRaid] === "object" && json[dRaid] !== null && !Array.isArray(json[dRaid]) 
            && typeof json[dRaid][itemName] !== "undefined" && json[dRaid][itemName] !== null) return 9;

        // Other
        if (typeof json[dOther] === "object" && json[dOther] !== null && !Array.isArray(json[dOther]) 
            && typeof json[dOther][itemName] !== "undefined" && json[dOther][itemName] !== null) return 10;

        // Dungeon Merchant
        if (typeof json[dDungeonMerchant] === "object" && json[dDungeonMerchant] !== null && !Array.isArray(json[dDungeonMerchant]) 
            && typeof json[dDungeonMerchant][itemName] !== "undefined" && json[dDungeonMerchant][itemName] !== null) return 12;

        // Discontinued
        if (typeof json[dDiscontinued] === "object" && json[dDiscontinued] !== null && !Array.isArray(json[dDiscontinued]) 
            && typeof json[dDiscontinued][itemName] !== "undefined" && json[dDiscontinued][itemName] !== null) return 13;

        // World Event
        if (typeof json[dWorldEvent] === "object" && json[dWorldEvent] !== null && !Array.isArray(json[dWorldEvent]) 
            && typeof json[dWorldEvent][itemName] !== "undefined" && json[dWorldEvent][itemName] !== null) return 15;

        // Lootrun
        if (typeof json[dLootrun] === "object" && json[dLootrun] !== null && !Array.isArray(json[dLootrun]) 
            && typeof json[dLootrun][itemName] !== "undefined" && json[dLootrun][itemName] !== null) return 16;
    }
    
    return 0;
}

export function setTooltip(tooltip: HTMLElement, tooltipText: HTMLElement, texts: string[]) {
    let text = "";
    for (let i = 0; texts.length > i; ++i) {
        const t = texts[i];
        tooltipText.appendChild(document.createTextNode(t));
        text += t;

        if (texts.length - 1 > i) {
            tooltipText.appendChild(document.createElement("br"));
            text += "\n";
        }
    }
    
    tooltip.onclick = (() => {navigator.clipboard.writeText(text);});
}

export function setPosOnlyDropType(data: string[], manual: JSONValueEx, itemName: string, path: string, desc: string): boolean {
    if (typeof manual === "object" && manual !== null && !Array.isArray(manual) 
        && typeof manual[path] === "object" && manual[path] != null && !Array.isArray(manual[path]) 
        && typeof manual[path][itemName] === "object" && manual[path][itemName] !== null && !Array.isArray(manual[path][itemName])) {
        if (typeof manual[path][itemName]["pos"] === "string" && manual[path][itemName]["pos"] !== null) {
            const split = manual[path][itemName]["pos"].split("<br>");
            if (split.length === 1) {
                data.push(desc + split[0]);
            } else {
                data.push(desc);
                for (let i = 0; split.length > i; ++i) {
                    data.push(split[i]);
                }
            }
        }
        return true;
    }
    return false;
}

export function setMerchant(data: string[], manual: JSONValueEx, itemName: string, path: string): boolean {
    if (typeof manual === "object" && manual !== null && !Array.isArray(manual) 
        && typeof manual[path] === "object" && manual[path] != null && !Array.isArray(manual[path]) 
        && typeof manual[path][itemName] === "object" && manual[path][itemName] !== null && !Array.isArray(manual[path][itemName])) {
        const j = manual[path][itemName];
        let isEmpty = true;
        
        if (typeof j[namePos] === "string" && j[namePos] !== null && j[namePos].length > 0) {
            data.push("Merchant: " + j[namePos]);
            isEmpty = false;
        }
        
        if (typeof j["pos"] === "string" && j["pos"] !== null && j["pos"].length > 0) {
            data.push("Locate: " + j["pos"]);
            isEmpty = false;
        }

        if (typeof j["price"] === "string" && j["price"] !== null && j["price"].length > 0) {
            data.push("Price: " + j["price"]);
            isEmpty = false;
        }

        if (isEmpty) data.push("Merchant");
        return true;
    }
    return false;
}

export function setSpecificDrop(data: string[], manual: JSONValueEx, itemName: string): boolean {
    if (typeof manual === "object" && manual !== null && !Array.isArray(manual) 
        && typeof manual[dSpecific] === "object" && manual[dSpecific] != null && !Array.isArray(manual[dSpecific]) 
        && Array.isArray(manual[dSpecific][itemName])) {
        for (const jsp of manual[dSpecific][itemName]) {
            if (typeof jsp === "object" && jsp !== null && !Array.isArray(jsp)) {
                let name = "";
                if (typeof jsp["ismobname"] === "boolean" && jsp["ismobname"] !== null && jsp["ismobname"]) name = "Mob Name: ";
                if (typeof jsp[namePos] === "string" && jsp[namePos] !== null) data.push(name + jsp[namePos]);

                if (Array.isArray(jsp["pos"])) {
                    for (const je of jsp["pos"]) {
                        if (typeof je === "string" && je !== null) {
                            data.push("Locate: " + je);
                        }
                    }
                }
            }
        }
        return true;
    }
    return false;
}

