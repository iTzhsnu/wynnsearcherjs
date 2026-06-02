import { AItem } from "../data/AItem";
import { basePos, idPos, ids, rarityId, reqPos } from "../data/Identifications";
import { max, min, sFast, sSlow, vFast, vSlow } from "../utils/DataKeys";
import { AItemUI } from "./AItemUI";

import equipManualDrop from "../../json/manual_item_drop.json"


export class ItemUI extends AItemUI {
    protected displayData(item: AItem): void {
        // Add Item Name
        this.applyDisplayData(item.getName());

        // Add Type (Sub Type)
        const subType = item.getSubType();
        this.applyDisplayData("Type: " + subType.charAt(0).toUpperCase() + subType.substring(1));

        // Add Attack Speed
        if (item.getIdStringFromIdNum(43).length > 0) {
            const s = item.getIdStringFromIdNum(43);

            if (s === sFast || s === sSlow) {
                this.applyDisplayData("Attack Speed: " + s.charAt(0).toUpperCase() + s.substring(1, 5) + " " + s.substring(5));
            } else if (s === vFast || vSlow) {
                this.applyDisplayData("Attack Speed: " + s.charAt(0).toUpperCase() + s.substring(1, 4) + " " + s.substring(4));
            } else {
                this.applyDisplayData("Attack Speed: " + s.charAt(0).toUpperCase() + s.substring(1));
            }
        }

        this.applyDisplayData("");

        // Base
        if (item.haveFieldPosBase(basePos)) {
            if (item.haveId(8, null, "", "")) this.applyDisplayData("Health: " + AItemUI.setPlus(item.getIdValue(8, max))); // Health

            for (let i = 18; 22 >= i; ++i) { // Defenses
                if (item.haveId(i, null, "", "")) this.applyDisplayData(ids[i].displayName + ": " + AItemUI.setPlus(item.getIdValue(i, max)));
            }

            for (let i = 29; 34 >= i; ++i) {
                if (item.haveId(i, null, "", "")) this.applyDisplayData(ids[i].displayName + ": " + item.getIdValue(i, min) + "-" + item.getIdValue(i, max));
            }

            this.applyDisplayData("");
        }

        // Req
        if (item.haveFieldPosBase(reqPos)) {
            if (item.haveId(0, null, "", "")) this.applyDisplayData("Combat Lv. Min: " + item.getIdValue(0, max));

            for (let i = 1; 5 >= i; ++i) {
                if (item.haveId(i, null, "", "")) this.applyDisplayData(ids[i].displayName + ": " + item.getIdValue(i, max));
            }

            if (item.haveId(6, null, "", "")) this.applyDisplayData(ids[6].displayName + ": " + item.getIdString(ids[6]));

            this.applyDisplayData("");
        }

        // IDs
        if (item.haveFieldPosBase(idPos)) {
            for (let i = 9; 118 >= i; ++i) {
                if (i === 65 || i === 64 || i === 43 
                    || (35 >= i && i >= 29) 
                    || (22 >= i && i >= 18)) continue;

                const minValue = item.getIdValue(i, min);
                const maxValue = item.getIdValue(i, max);
                const id = ids[i];

                if (minValue === maxValue) {
                    this.applyDisplayData(id.displayName + " " + maxValue + id.displaySp);
                } else {
                    this.applyDisplayData(AItemUI.setPlus(minValue) + id.displaySp + " " + id.displayName + " " + AItemUI.setPlus(maxValue) + id.displaySp);
                }
            }

            this.applyDisplayData("");
        }

        // Powder Slots
        if (item.haveId(64, null, "", "")) {
            const slot = item.getIdValue(64, max);
            if (slot > 0) this.applyDisplayData("Powder Slots: " + slot);
        }

        // Major Ids
        if (item.haveId(65, null, "", "")) {
            item.setMajorIdTooltip(this.base);
        }

        // Rarity
        const rarity = item.getIdString(rarityId);
        this.applyDisplayData("Rarity: " + rarity.charAt(0).toUpperCase() + rarity.substring(1));

        // Restriction (ex. Untradable)
        if (item.haveId(7, null, "", "")) {
            const restrict = item.getIdStringFromIdNum(7);
            if (restrict !== "none") this.applyDisplayData("Restriction: " + restrict);
        }
        

        // Set Bonuses
        if (item.haveId(149, null, "", "")) {
            item.setSetEffectTooltip(this.base);
        }


        // How to obtain
        item.setHowToObtainTooltip(this.base, equipManualDrop);

        // Sort Value
        this.applyDisplayData("Sort Value: " + item.filterMaxValues[0]);
    }
}