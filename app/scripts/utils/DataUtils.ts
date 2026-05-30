import { Item } from "../data/Item";
import { wynnItems } from "../DataManager";

import powderData from "../../json/powders.json"

export let itemDataCache: Item | null = null;
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
