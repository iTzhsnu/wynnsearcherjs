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
