import { AItem } from "../data/AItem";
import { consumeOnlyIdsPos, idPos, ids, ingModifierPos, itemOnlyIdsPos } from "../data/Identifications";
import { max, min, r1Star, r2Star, r3Star } from "../utils/DataKeys";
import { AItemUI } from "./AItemUI";
import ingManualDrop from "../../json/manual_ingredient_drop.json";
import { Ingredient } from "../data/Ingredient";


export class IngUI extends AItemUI {
    protected displayData(item: AItem): void {
        // Apply Item Name
        let itemName = item.getDisplayName();
        if (itemName.length === 0) itemName = item.getName();
        this.applyDisplayData(itemName);

        // Apply Rarity
        let star = 0;
        switch (item.getRarity()) {
            case r1Star:
                star = 1;
                break;
            case r2Star:
                star = 2;
                break;
            case r3Star:
                star = 3;
                break;
        }
        this.applyDisplayData("Star: " + star);

        // Apply Lv. Min
        this.applyDisplayData("Lv Min: " + item.getIdValue(0, max));

        this.applyDisplayData("");
        
        // Item only ids
        if (item.haveFieldPosBase(itemOnlyIdsPos)) {
            let addSpace = false;
            if (item.haveId(119, null, "", "")) {
                this.applyDisplayData("Durability: " + AItemUI.setPlus(item.getIdValue(119, max) / 1000));
                addSpace = true;
            }

            for (let i = 1; 5 >= i; ++i) {
                if (item.haveId(i, null, "", "")) {
                    this.applyDisplayData(ids[i].displayName + ": " + AItemUI.setPlus(item.getIdValue(i, max)));
                    addSpace = true;
                }
            }
            if (addSpace) this.applyDisplayData("");
        }

        // Consumable only ids
        if (item.haveFieldPosBase(consumeOnlyIdsPos)) {
            let addSpace = false;
            for (let i = 120; 121 >= i; ++i) {
                if (item.haveId(i, null, "", "")) {
                    this.applyDisplayData(ids[i].displayName + ": " + AItemUI.setPlus(item.getIdValue(i, max)));
                    addSpace = true;
                }
            }
            if (addSpace) this.applyDisplayData("");
        }

        // Ingredient effectiveness
        if (item.haveFieldPosBase(ingModifierPos)) {
            let addSpace = false;
            for (let i = 123; 128 >= i; ++i) {
                if (item.haveId(i, null, "", "")) {
                    const id = ids[i];
                    this.applyDisplayData(id.displayName + ": " + AItemUI.setPlus(item.getIdValue(i, max)) + id.displaySp);
                    addSpace = true;
                }
            }
            if (addSpace) this.applyDisplayData("");
        }

        // IDs
        if (item.haveFieldPosBase(idPos)) {
            let addSpace = false;
            for (let i = 9; 118 >= i; ++i) {
                if (i === 65 || i === 64 || i === 43 
                    || (35 >= i && i >= 29) 
                    || (22 >= i && i >= 18)) continue;
        
                const minValue = item.getIdValue(i, min);
                const maxValue = item.getIdValue(i, max);
                const id = ids[i];
                        
                if (minValue !== 0 || maxValue !== 0) {
                    if (minValue === maxValue) {
                        this.applyDisplayData(id.displayName + " " + maxValue + id.displaySp);
                    } else {
                        this.applyDisplayData(AItemUI.setPlus(minValue) + id.displaySp + " " + id.displayName + " " + AItemUI.setPlus(maxValue) + id.displaySp);
                    }
                    addSpace = true;
                }
            }
            if (addSpace) this.applyDisplayData("");
        }

        // Skills
        this.applyDisplayData("Can Use:");
        for (const s of (<Ingredient>item).getSkills()) {
            this.applyDisplayData(s.charAt(0).toUpperCase() + s.substring(1));
        }

        // How to obtain
        item.setHowToObtainTooltip(this.base, ingManualDrop);

        // Sort Value
        this.applyDisplayData("Sort Value: " + item.filterMaxValues[0]);
    }
}