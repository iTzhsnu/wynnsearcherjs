import { Ingredient } from "./data/Ingredient";
import { Item } from "./data/Item"

import equipmentsJson from "../json/equip_and_weapons.json"
import ingredientsJson from "../json/ingredients.json"
import othersJson from "../json/other_items.json"


// Main Data
export const wynnItems: Item[] = [];
export const wynnIngs: Ingredient[] = [];
export const wynnOthersItems: Item[] = [];

// Equipments each type
export const bowData: Item[] = [];
export const spearData: Item[] = [];
export const wandData: Item[] = [];
export const daggerData: Item[] = [];
export const relikData: Item[] = [];
export const helmetData: Item[] = [];
export const chestplateData: Item[] = [];
export const leggingsData: Item[] = [];
export const bootsData: Item[] = [];
export const ringData: Item[] = [];
export const braceletData: Item[] = [];
export const necklaceData: Item[] = [];

// Ingredients each type
export const armouringData: Ingredient[] = [];
export const tailoringData: Ingredient[] = [];
export const weaponsmithingData: Ingredient[] = [];
export const woodworkingData: Ingredient[] = [];
export const jewelingData: Ingredient[] = [];
export const scribingData: Ingredient[] = [];
export const cookingData: Ingredient[] = [];
export const alchemismData: Ingredient[] = [];

// Others each type
export const tomeData: Item[] = [];
export const charmData: Item[] = [];
export const toolData: Item[] = [];
export const materialData: Item[] = [];

// Tomes each type
export const armourTomeData: Item[] = [];
export const guildTomeData: Item[] = [];
export const weaponTomeData: Item[] = [];
export const marathonTomeData: Item[] = [];
export const lootrunTomeData: Item[] = [];
export const expertiseTomeData: Item[] = [];
export const mysticismTomeData: Item[] = [];

// Item Type string
export const typeBow = "bow";
export const typeSpear = "spear";
export const typeWand = "wand";
export const typeDagger = "dagger";
export const typeRelik = "relik";
export const typeHelmet = "helmet";
export const typeChestplate = "chestplate";
export const typeLeggings = "leggings";
export const typeBoots = "boots";
export const typeRing = "ring";
export const typeBracelet = "bracelet";
export const typeNecklace = "necklace";

// Ingredient Skill Type string
export const typeArmouring = "armouring";
export const typeTailoring = "tailoring";
export const typeWeaponsmithing = "weaponsmithing";
export const typeWoodworking = "woodworking";
export const typeJeweling = "jeweling";
export const typeScribing = "scribing";
export const typeCooking = "cooking";
export const typeAlchemism = "alchemism";

// Tomes
export const typeTome = "tome";
export const typeGuildTome = "guild_tome";
export const typeMarathonTome = "marathon_tome";
export const typeExpertiseTome = "expertise_tome";
export const typeLootrunTome = "lootrun_tome";
export const typeMysticismTome = "mysticism_tome";
export const typeWeaponTome = "weapon_tome";
export const typeArmourTome = "armour_tome";

// Others Item Type string
export const typeCharm = "charm";
export const typeTool = "tool";
export const typeMaterial = "material";


// Functions
export function InitializeData(): boolean {
    if (loadWynnItems()) {
        setItemData();
        setIngData();
        setOthersData();
        
        return true;
    }

    return false;
}

function loadWynnItems(): boolean {
    if (wynnItems.length > 0 || wynnIngs.length > 0 || wynnOthersItems.length > 0) return false;

    const equipJsons = equipmentsJson.items;
    const ingJsons = ingredientsJson.items;
    const othJsons = othersJson.items;

    if (Array.isArray(equipJsons)) {
        for (const json of equipJsons) {
            wynnItems.push(new Item(json));
        }
    }

    if (Array.isArray(ingJsons)) {
        for (const json of ingJsons) {
            wynnIngs.push(new Ingredient(json));
        }
    }

    if (Array.isArray(othJsons)) {
        for (const json of othJsons) {
            wynnOthersItems.push(new Item(json));
        }
    }

    return true;
}

function setItemData(): void {
    for (const item of wynnItems) {
        switch (item.getSubType()) {
            case typeBow:
                bowData.push(item);
                break;
            case typeSpear:
                spearData.push(item);
                break;
            case typeWand:
                wandData.push(item);
                break;
            case typeDagger:
                daggerData.push(item);
                break;
            case typeRelik:
                relikData.push(item);
                break;
            case typeHelmet:
                helmetData.push(item);
                break;
            case typeChestplate:
                chestplateData.push(item);
                break;
            case typeLeggings:
                leggingsData.push(item);
                break;
            case typeBoots:
                bootsData.push(item);
                break;
            case typeRing:
                ringData.push(item);
                break;
            case typeBracelet:
                braceletData.push(item);
                break;
            case typeNecklace:
                necklaceData.push(item);
                break;
        }
    }
}

function setIngData(): void {
    for (const ing of wynnIngs) {
        const skills = ing.getSkills();
        if (Array.isArray(skills)) {
            for (const skill of skills) {
                if (typeof skill === "string") {
                    switch (skill) {
                        case typeArmouring:
                            armouringData.push(ing);
                            break;
                    }
                }
            }
        }
    }
}

function setOthersData(): void {

}
