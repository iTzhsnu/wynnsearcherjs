import { AItem } from "./data/AItem";
import { idList, Identifications, ids, emptyId, rarityId, typeInt, typeSum, typeString } from "./data/Identifications";
import { typeEquip, typeIng, typeOthers } from "./ui/filterUIManager";
import { JSONValueEx } from "./utils/JSONValueEx";

import equipManualDrop from "../json/manual_item_drop.json"
import ingManualDrop from "../json/manual_ingredient_drop.json"
import othersManualDrop from "../json/manual_other_drop.json"
import { wynnItems, wynnIngs, wynnOthersItems, bowData, spearData, wandData, daggerData, relikData, helmetData, chestplateData, leggingsData, bootsData, ringData, braceletData, necklaceData, armouringData, tailoringData, weaponsmithingData, woodworkingData, jewelingData, scribingData, cookingData, alchemismData, tomeData, charmData, toolData, materialData, armourTomeData, guildTomeData, weaponTomeData, marathonTomeData, lootrunTomeData, expertiseTomeData, mysticismTomeData, typeArmouring, typeTailoring, typeWeaponsmithing, typeWoodworking, typeJeweling, typeScribing, typeCooking } from "./DataManager";
import { rAny, rNoNormal, rNormal, min, max } from "./utils/DataKeys";
import { sumIds } from "./data/SumIds";
import { AItemUI } from "./ui/AItemUI";
import { ItemUI } from "./ui/ItemUI";
import { IngUI } from "./ui/IngUI";
import { OthersUI } from "./ui/OthersUI";

const foundItems: AItem[] = [];
const displayedElems: AItemUI[] = []; // Displayed item Elements

export function search(): void {
    resetUI();

    const itemType = (<HTMLSelectElement>document.getElementById("item-type-select")).value;
    switch (itemType) {
        case typeEquip:
            filterItems();
            break;
        case typeIng:
            filterIngs();
            break;
        case typeOthers:
            filterOthers();
            break;
    }

    setSortedDisplay(itemType);
}

function resetUI() {
    for (const item of displayedElems) {
        item.dispose();
    }

    displayedElems.length = 0;
    foundItems.length = 0;
}

function filterItems(): void {
    const bowCB = (<HTMLInputElement>document.getElementById("bow-checkbox")).checked;
    const spearCB = (<HTMLInputElement>document.getElementById("spear-checkbox")).checked;
    const wandCB = (<HTMLInputElement>document.getElementById("wand-checkbox")).checked;
    const daggerCB = (<HTMLInputElement>document.getElementById("dagger-checkbox")).checked;
    const relikCB = (<HTMLInputElement>document.getElementById("relik-checkbox")).checked;
    const helmetCB = (<HTMLInputElement>document.getElementById("helmet-checkbox")).checked;
    const chestplateCB = (<HTMLInputElement>document.getElementById("chestplate-checkbox")).checked;
    const leggingsCB = (<HTMLInputElement>document.getElementById("leggings-checkbox")).checked;
    const bootsCB = (<HTMLInputElement>document.getElementById("boots-checkbox")).checked;
    const ringCB = (<HTMLInputElement>document.getElementById("ring-checkbox")).checked;
    const braceletCB = (<HTMLInputElement>document.getElementById("bracelet-checkbox")).checked;
    const necklaceCB = (<HTMLInputElement>document.getElementById("necklace-checkbox")).checked;

    if (bowCB && spearCB && wandCB && daggerCB && relikCB && helmetCB && chestplateCB && leggingsCB && bootsCB && ringCB && braceletCB && necklaceCB) {
        foundItems.push(...wynnItems);
    } else {
        if (bowCB) foundItems.push(...bowData);
        if (spearCB) foundItems.push(...spearData);
        if (wandCB) foundItems.push(...wandData);
        if (daggerCB) foundItems.push(...daggerData);
        if (relikCB) foundItems.push(...relikData);
        if (helmetCB) foundItems.push(...helmetData);
        if (chestplateCB) foundItems.push(...chestplateData);
        if (leggingsCB) foundItems.push(...leggingsData);
        if (bootsCB) foundItems.push(...bootsData);
        if (ringCB) foundItems.push(...ringData);
        if (braceletCB) foundItems.push(...braceletData);
        if (necklaceCB) foundItems.push(...necklaceData);
    }

    filter(typeEquip, equipManualDrop);
}

function filterIngs(): void {
    const armouringCB = (<HTMLInputElement>document.getElementById("armouring-checkbox")).checked;
    const tailoringCB = (<HTMLInputElement>document.getElementById("tailoring-checkbox")).checked;
    const weaponsmithingCB = (<HTMLInputElement>document.getElementById("weaponsmithing-checkbox")).checked;
    const woodworkingCB = (<HTMLInputElement>document.getElementById("woodworking-checkbox")).checked;
    const jewelingCB = (<HTMLInputElement>document.getElementById("jeweling-checkbox")).checked;
    const scribingCB = (<HTMLInputElement>document.getElementById("scribing-checkbox")).checked;
    const cookingCB = (<HTMLInputElement>document.getElementById("cooking-checkbox")).checked;
    const alchemismCB = (<HTMLInputElement>document.getElementById("alchemism-checkbox")).checked;

    if (armouringCB && tailoringCB && weaponsmithingCB && woodworkingCB && jewelingCB && scribingCB && cookingCB && alchemismCB) {
        foundItems.push(...wynnIngs);
    } else {
        // Add Armouring
        if (armouringCB) foundItems.push(...armouringData);

        // Add Tailoring
        if (tailoringCB) {
            if (!armouringCB) {
                foundItems.push(...tailoringData);
            } else {
                for (const item of tailoringData) {
                    let add = true;

                    const skills = item.getSkills();
                    if (Array.isArray(skills)) {
                        for (const skill of skills) {
                            if (typeof skill === "string" && skill !== null 
                                && skill == typeArmouring) {
                                add = false;
                                break;
                            }
                        }
                    }

                    if (add) foundItems.push(item);
                }
            }
        }

        // Add Weaponsmithing
        if (weaponsmithingCB) {
            if (!armouringCB && !tailoringCB) {
                foundItems.push(...weaponsmithingData);
            } else {
                for (const item of weaponsmithingData) {
                    let add = true;

                    const skills = item.getSkills();
                    if (Array.isArray(skills)) {
                        for (const skill of skills) {
                            if (typeof skill === "string" && skill !== null 
                                && (skill === typeArmouring || skill === typeTailoring)) {
                                add = false;
                                break;
                            }
                        }
                    }

                    if (add) foundItems.push(item);
                }
            }
        }

        // Add Woodworking
        if (woodworkingCB) {
            if (!armouringCB && !tailoringCB && !weaponsmithingCB) {
                foundItems.push(...woodworkingData);
            } else {
                for (const item of woodworkingData) {
                    let add = true;

                    const skills = item.getSkills();
                    if (Array.isArray(skills)) {
                        for (const skill of skills) {
                            if (typeof skill === "string" && skill !== null 
                                && (skill === typeArmouring || skill === typeTailoring || skill === typeWeaponsmithing)) {
                                add = false;
                                break;
                            }
                        }
                    }

                    if (add) foundItems.push(item);
                }
            }
        }

        // Add Jeweling
        if (jewelingCB) {
            if (!armouringCB && !tailoringCB && !weaponsmithingCB && !woodworkingCB) {
                foundItems.push(...jewelingData);
            } else {
                for (const item of jewelingData) {
                    let add = true;

                    const skills = item.getSkills();
                    if (Array.isArray(skills)) {
                        for (const skill of skills) {
                            if (typeof skill === "string" && skill !== null 
                                && (skill === typeArmouring || skill === typeTailoring || skill === typeWeaponsmithing || skill === typeWoodworking)) {
                                add = false;
                                break;
                            }
                        }
                    }

                    if (add) foundItems.push(item);
                }
            }
        }

        // Add Scribing
        if (scribingCB) {
            if (!armouringCB && !tailoringCB && !weaponsmithingCB && !woodworkingCB && !jewelingCB) {
                foundItems.push(...scribingData);
            } else {
                for (const item of scribingData) {
                    let add = true;

                    const skills = item.getSkills();
                    if (Array.isArray(skills)) {
                        for (const skill of skills) {
                            if (typeof skill === "string" && skill !== null 
                                && (skill === typeArmouring || skill === typeTailoring || skill === typeWeaponsmithing || skill === typeWoodworking || skill === typeJeweling)) {
                                add = false;
                                break;
                            }
                        }
                    }

                    if (add) foundItems.push(item);
                }
            }
        }

        // Add Cooking
        if (cookingCB) {
            if (!armouringCB && !tailoringCB && !weaponsmithingCB && !woodworkingCB && !jewelingCB && !scribingCB) {
                foundItems.push(...cookingData);
            } else {
                for (const item of cookingData) {
                    let add = true;

                    const skills = item.getSkills();
                    if (Array.isArray(skills)) {
                        for (const skill of skills) {
                            if (typeof skill === "string" && skill !== null 
                                && (skill === typeArmouring || skill === typeTailoring || skill === typeWeaponsmithing || skill === typeWoodworking || skill === typeJeweling || skill === typeScribing)) {
                                add = false;
                                break;
                            }
                        }
                    }

                    if (add) foundItems.push(item);
                }
            }
        }

        // Add Alchemism
        if (alchemismCB) {
            if (!armouringCB && !tailoringCB && !weaponsmithingCB && !woodworkingCB && !jewelingCB && !scribingCB && !cookingCB) {
                foundItems.push(...alchemismData);
            } else {
                for (const item of alchemismData) {
                    let add = true;

                    const skills = item.getSkills();
                    if (Array.isArray(skills)) {
                        for (const skill of skills) {
                            if (typeof skill === "string" && skill !== null 
                                && (skill === typeArmouring || skill === typeTailoring || skill === typeWeaponsmithing || skill === typeWoodworking || skill === typeJeweling || skill === typeCooking)) {
                                add = false;
                                break;
                            }
                        }
                    }

                    if (add) foundItems.push(item);
                }
            }
        }
    }

    filter(typeIng, ingManualDrop);
}

function filterOthers(): void {
    const tomeCB = (<HTMLInputElement>document.getElementById("tome-checkbox")).checked;
    const charmCB = (<HTMLInputElement>document.getElementById("charm-checkbox")).checked;
    const toolCB = (<HTMLInputElement>document.getElementById("tool-checkbox")).checked;
    const materialCB = (<HTMLInputElement>document.getElementById("material-checkbox")).checked;

    if (tomeCB && charmCB && toolCB && materialCB) {
        foundItems.push(...wynnOthersItems);
    } else {
        if (tomeCB) {
            const expertiseCB = (<HTMLInputElement>document.getElementById("expertise-checkbox")).checked;
            const mysticismCB = (<HTMLInputElement>document.getElementById("mysticism-checkbox")).checked;
            const armourCB = (<HTMLInputElement>document.getElementById("armour-checkbox")).checked;
            const guildCB = (<HTMLInputElement>document.getElementById("guild-checkbox")).checked;
            const weaponCB = (<HTMLInputElement>document.getElementById("weapon-checkbox")).checked;
            const marathonCB = (<HTMLInputElement>document.getElementById("marathon-checkbox")).checked;
            const lootrunCB = (<HTMLInputElement>document.getElementById("lootrun-checkbox")).checked;

            if (expertiseCB && mysticismCB && armourCB && guildCB && weaponCB && marathonCB && lootrunCB) {
                foundItems.push(...tomeData);
            } else {
                if (expertiseCB) foundItems.push(...expertiseTomeData);
                if (mysticismCB) foundItems.push(...mysticismTomeData);
                if (armourCB) foundItems.push(...armourTomeData);
                if (guildCB) foundItems.push(...guildTomeData);
                if (weaponCB) foundItems.push(...weaponTomeData);
                if (marathonCB) foundItems.push(...marathonTomeData);
                if (lootrunCB) foundItems.push(...lootrunTomeData);
            }
        }

        if (charmCB) foundItems.push(...charmData);
        if (toolCB) foundItems.push(...toolData);
        if (materialCB) foundItems.push(...materialData);
    }

    filter(typeOthers, othersManualDrop);
}


function filterFromId(idNums: (number | undefined)[], filterMin: string, filterMax: string, howToObtain: JSONValueEx, itemType: string): void {
    if (getIdNameFromType(getId(idNums[0]), itemType).length > 0 || getIdNameFromType(getId(idNums[1]), itemType).length > 0 || getIdNameFromType(getId(idNums[2]), itemType).length > 0 || getIdNameFromType(getId(idNums[3]), itemType).length > 0) {
        const minInt = parseInt(filterMin);
        const maxInt = parseInt(filterMax);

        if (minInt === 0 || maxInt === 0) {
            return;
        }
        
        for (let i = foundItems.length - 1; i >= 0; --i) {
            const item = foundItems[i];

            let remove = true;
            for (let num = 0; 4 > num; ++num) {
                const idNum = idNums[num];
                if (typeof idNum === "number" && item.haveId(idNum, howToObtain, filterMin, filterMax)) {
                    remove = false;
                    break;
                }
            }
            if (remove) {
                foundItems.splice(i, 1);
            }
        }
    }
}

function filterFromRarity(): void {
    const rarity = (<HTMLSelectElement>document.getElementById("rarity-type-select")).value;

    if (rarity !== rAny) {
        for (let i = foundItems.length - 1; i >= 0; --i) {
            const s = foundItems[i].getIdString(rarityId);

            if (rarity === rNoNormal) {
                if (s === rNormal) {
                    foundItems.splice(i, 1);
                }
            } else {
                if (s !== rarity) {
                    foundItems.splice(i, 1);
                }
            }
        }
    }
}

function filterFromName(findName: string): void {
    if (findName.length > 0) {
        for (let i = foundItems.length - 1; i >= 0; --i) {
            const name = foundItems[i].getName();

            if (!name.toLowerCase().includes(findName.toLowerCase())) {
                foundItems.splice(i, 1);
            }
        }
    }
}

function filterFromIdRange(pos: number, filterMin: string, filterMax: string) {
    let minInt = parseInt(filterMin);
    let maxInt = parseInt(filterMax);

    if (!Number.isNaN(minInt) || !Number.isNaN(maxInt)) {
        if (Number.isNaN(minInt)) minInt = Number.MIN_SAFE_INTEGER;
        if (Number.isNaN(maxInt)) maxInt = Number.MAX_SAFE_INTEGER;

        for (let i = foundItems.length - 1; i >= 0; --i) {
            const item = foundItems[i];
            if (!(item.filterMaxValues[pos] > minInt && maxInt > item.filterMinValues[pos])) {
                foundItems.splice(i, 1);
            }
        }
    }
}


function filter(itemType: string, howToObtain: JSONValueEx): void {
    autoSetLevelId();

    const idBoxes1 = [idList.get((<HTMLInputElement>document.getElementById("id-box-11")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-12")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-13")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-14")).value)];
    const idBoxes2 = [idList.get((<HTMLInputElement>document.getElementById("id-box-21")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-22")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-23")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-24")).value)];
    const idBoxes3 = [idList.get((<HTMLInputElement>document.getElementById("id-box-31")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-32")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-33")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-34")).value)];
    const idBoxes4 = [idList.get((<HTMLInputElement>document.getElementById("id-box-41")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-42")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-43")).value), idList.get((<HTMLInputElement>document.getElementById("id-box-44")).value)];

    const filterMin1 = (<HTMLInputElement>document.getElementById("id-range-min-1")).value;
    const filterMin2 = (<HTMLInputElement>document.getElementById("id-range-min-2")).value;
    const filterMin3 = (<HTMLInputElement>document.getElementById("id-range-min-3")).value;
    const filterMin4 = (<HTMLInputElement>document.getElementById("id-range-min-4")).value;

    const filterMax1 = (<HTMLInputElement>document.getElementById("id-range-max-1")).value;
    const filterMax2 = (<HTMLInputElement>document.getElementById("id-range-max-2")).value;
    const filterMax3 = (<HTMLInputElement>document.getElementById("id-range-max-3")).value;
    const filterMax4 = (<HTMLInputElement>document.getElementById("id-range-max-4")).value;

    filterFromId(idBoxes1, filterMin1, filterMax1, howToObtain, itemType);
    filterFromId(idBoxes2, filterMin2, filterMax2, howToObtain, itemType);
    filterFromId(idBoxes3, filterMin3, filterMax3, howToObtain, itemType);
    filterFromId(idBoxes4, filterMin4, filterMax4, howToObtain, itemType);

    filterFromRarity();
    filterFromName((<HTMLInputElement>document.getElementById("name-filter-field")).value);

    resetFilterValue();
    setFilterValue(idBoxes1, 0, howToObtain, filterMin1, filterMax1, itemType);
    setFilterValue(idBoxes2, 1, howToObtain, filterMin2, filterMax2, itemType);
    setFilterValue(idBoxes3, 2, howToObtain, filterMin3, filterMax3, itemType);
    setFilterValue(idBoxes4, 3, howToObtain, filterMin4, filterMax4, itemType);

    filterFromIdRange(0, filterMin1, filterMax1);
    filterFromIdRange(1, filterMin2, filterMax2);
    filterFromIdRange(2, filterMin3, filterMax3);
    filterFromIdRange(3, filterMin4, filterMax4);
}

function setSortedDisplay(itemType: string): void {
    foundItems.sort(compareIdValue);

    for (const item of foundItems) {
        switch (itemType) {
            case typeEquip:
                displayedElems.push(new ItemUI(item));
                break;
            case typeIng:
                displayedElems.push(new IngUI(item));
                break;
            case typeOthers:
                displayedElems.push(new OthersUI(item));
                break;
        }
    }
}


function setFilterValue(idNums: (number | undefined)[], savePos: number, howToObtain: JSONValueEx, filterMin: string, filterMax: string, itemType: string) {
    if (getIdNameFromType(getId(idNums[0]), itemType).length > 0 || getIdNameFromType(getId(idNums[1]), itemType).length > 0 || getIdNameFromType(getId(idNums[2]), itemType).length > 0 || getIdNameFromType(getId(idNums[3]), itemType).length > 0) {
        for (const item of foundItems) {
            let totalMin = 0;
            let totalMax = 0;

            for (let i = 0; 4 > i; ++i) {
                const idNum = idNums[i];

                if (typeof idNum !== "undefined") {
                    const id = ids[idNum];

                    switch (id.idType) {
                        case typeInt:
                            totalMin += item.getIdValue(idNum, min);
                            totalMax += item.getIdValue(idNum, max);
                            break;
                        case typeString:
                            if (idNum == 43) { // Attack Speed
                                totalMin += item.getAttackSpeed();
                                totalMax += item.getAttackSpeed();
                            } else if (item.haveIdValue(idNum, howToObtain, filterMin, filterMax)) {
                                totalMin += 1;
                                totalMax += 1;
                            }
                            break;
                        case typeSum:
                            const sumInSum = sumIds[id.sumIds].sumIds;
                            if (sumInSum.length > 0 && idNum !== 195 && idNum !== 196) {
                                for (let n = 0; sumInSum.length > n; n++) {
                                    totalMin += item.getTotalSumFloat(sumInSum[n], min, filterMin, filterMax);
                                    totalMax += item.getTotalSumFloat(sumInSum[n], max, filterMin, filterMax);
                                }
                            } else {
                                totalMin += item.getTotalSumFloat(id.sumIds, min, filterMin, filterMax);
                                totalMax += item.getTotalSumFloat(id.sumIds, max, filterMin, filterMax);
                            }
                            break;
                    }
                }
            }

            item.filterMinValues[savePos] = totalMin;
            item.filterMaxValues[savePos] = totalMax; 
        }
    }
}

function resetFilterValue() {
    for (const item of foundItems) {
        for (let i = 0; 4 > i; ++i) {
            item.filterMinValues[i] = 0;
            item.filterMaxValues[i] = 0;
        }
    }
}

function autoSetLevelId() {
    const idBox0 = <HTMLInputElement>document.getElementById("id-box-11");
    const idBox1 = <HTMLInputElement>document.getElementById("id-box-12");
    const idBox2 = <HTMLInputElement>document.getElementById("id-box-13");
    const idBox3 = <HTMLInputElement>document.getElementById("id-box-14");
    if (idBox0.value.length === 0 && idBox1.value.length === 0 && idBox2.value.length === 0 && idBox3.value.length === 0) idBox0.value = "Level";
}

function getId(idNum: number | undefined): Identifications {
    if (typeof idNum === "number") {
        return ids[idNum];
    }

    return emptyId;
}

function getIdNameFromType(id: Identifications, itemType: string): string {
    if (itemType === typeIng) return id.ingName;

    return id.itemName;
}

function compareIdValue(a: AItem, b: AItem): number {
    if (a.filterMaxValues[0] > b.filterMaxValues[0]) {
        return -1;
    } else if (a.filterMaxValues[0] < b.filterMaxValues[0]) {
        return 1;
    }

    return 0;
}
