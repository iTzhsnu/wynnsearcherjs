import { rAny, rNoNormal, rMythic, rFabled, rLegendary, rRare, rUnique, rNormal, r0Star, r1Star, r2Star, r3Star } from "../utils/DataKeys";


export const typeEquip = "equipments";
export const typeIng = "ingredients";
export const typeOthers = "others";

export function changeItemType(type: string) {
    changeRarityType(type);
    changeItemCheckBox(type);
}

export function changeTomeType(b: boolean) {
    const tomeCBParent1 = document.getElementById("tome-cb-parent1") as HTMLElement;
    const tomeCBParent2 = document.getElementById("tome-cb-parent2") as HTMLElement;

    if (b) {
        tomeCBParent1.style.display = "inline-block";
        tomeCBParent2.style.display = "block";
    } else {
        tomeCBParent1.style.display = "none";
        tomeCBParent2.style.display = "none";
    }
}

function changeRarityType(type: string) {
    const comboBox = <HTMLSelectElement>document.getElementById("rarity-type-select");
    comboBox.options.length = 0;

    switch (type) {
        case typeEquip:
        case typeOthers:
            comboBox.options.add(new Option("Rarity: Any", rAny));
            comboBox.options.add(new Option("Rarity: No Normal", rNoNormal));
            comboBox.options.add(new Option("Rarity: Mythic", rMythic));
            comboBox.options.add(new Option("Rarity: Fabled", rFabled));
            comboBox.options.add(new Option("Rarity: Legendary", rLegendary));
            comboBox.options.add(new Option("Rarity: Rare", rRare));
            comboBox.options.add(new Option("Rarity: Unique", rUnique));
            comboBox.options.add(new Option("Rarity: Normal", rNormal));
            break;
        case typeIng:
            comboBox.options.add(new Option("Rarity: Any", rAny));
            comboBox.options.add(new Option("Rarity: 0 Star", r0Star));
            comboBox.options.add(new Option("Rarity: 1 Star", r1Star));
            comboBox.options.add(new Option("Rarity: 2 Star", r2Star));
            comboBox.options.add(new Option("Rarity: 3 Star", r3Star));
            break;
    }
}

function changeItemCheckBox(type: string): void {
    const equipCBParent = document.getElementById("equip-cb-parent") as HTMLElement;
    const ingCBParent = document.getElementById("ing-cb-parent") as HTMLElement;
    const otherCBParent = document.getElementById("other-cb-parent") as HTMLElement;

    equipCBParent.style.display = "none";
    ingCBParent.style.display = "none";
    otherCBParent.style.display = "none";

    switch (type) {
        case typeEquip:
            equipCBParent.style.display = "inline-block";
            break;
        case typeIng:
            ingCBParent.style.display = "inline-block";
            break;
        case typeOthers:
            otherCBParent.style.display = "inline-block";
            break;
    }
}

export function resetFilter() {
    const inputs = [<HTMLInputElement>document.getElementById("id-box-11"), <HTMLInputElement>document.getElementById("id-box-12"), <HTMLInputElement>document.getElementById("id-box-13"), <HTMLInputElement>document.getElementById("id-box-14"), 
        <HTMLInputElement>document.getElementById("id-box-21"), <HTMLInputElement>document.getElementById("id-box-22"), <HTMLInputElement>document.getElementById("id-box-23"), <HTMLInputElement>document.getElementById("id-box-24"),
        <HTMLInputElement>document.getElementById("id-box-31"), <HTMLInputElement>document.getElementById("id-box-32"), <HTMLInputElement>document.getElementById("id-box-33"), <HTMLInputElement>document.getElementById("id-box-34"),
        <HTMLInputElement>document.getElementById("id-box-41"), <HTMLInputElement>document.getElementById("id-box-42"), <HTMLInputElement>document.getElementById("id-box-43"), <HTMLInputElement>document.getElementById("id-box-44"),
        <HTMLInputElement>document.getElementById("id-range-min-1"), <HTMLInputElement>document.getElementById("id-range-min-2"), <HTMLInputElement>document.getElementById("id-range-min-3"), <HTMLInputElement>document.getElementById("id-range-min-4"),
        <HTMLInputElement>document.getElementById("id-range-max-1"), <HTMLInputElement>document.getElementById("id-range-max-2"), <HTMLInputElement>document.getElementById("id-range-max-3"), <HTMLInputElement>document.getElementById("id-range-max-4")];

        for (const elem of inputs) {
            elem.value = "";
        }
}

export function allTypeToggle() {
    const inputs = [<HTMLInputElement>document.getElementById("bow-checkbox"), 
        <HTMLInputElement>document.getElementById("spear-checkbox"), 
        <HTMLInputElement>document.getElementById("wand-checkbox"),
        <HTMLInputElement>document.getElementById("dagger-checkbox"),
        <HTMLInputElement>document.getElementById("relik-checkbox"),
        <HTMLInputElement>document.getElementById("helmet-checkbox"),
        <HTMLInputElement>document.getElementById("chestplate-checkbox"),
        <HTMLInputElement>document.getElementById("leggings-checkbox"),
        <HTMLInputElement>document.getElementById("boots-checkbox"),
        <HTMLInputElement>document.getElementById("ring-checkbox"),
        <HTMLInputElement>document.getElementById("bracelet-checkbox"),
        <HTMLInputElement>document.getElementById("necklace-checkbox"),
        
        <HTMLInputElement>document.getElementById("armouring-checkbox"),
        <HTMLInputElement>document.getElementById("tailoring-checkbox"),
        <HTMLInputElement>document.getElementById("weaponsmithing-checkbox"),
        <HTMLInputElement>document.getElementById("woodworking-checkbox"),
        <HTMLInputElement>document.getElementById("jeweling-checkbox"),
        <HTMLInputElement>document.getElementById("scribing-checkbox"),
        <HTMLInputElement>document.getElementById("cooking-checkbox"),
        <HTMLInputElement>document.getElementById("alchemism-checkbox"),
        
        <HTMLInputElement>document.getElementById("tome-checkbox"),
        <HTMLInputElement>document.getElementById("charm-checkbox"),
        <HTMLInputElement>document.getElementById("tool-checkbox"),
        <HTMLInputElement>document.getElementById("material-checkbox")];

        let checked = false;
        for (const input of inputs) {
            if (input.checked) {
                checked = true;
                break;
            }
        }
        for (const input of inputs) {
            input.checked = !checked;
        }
}
