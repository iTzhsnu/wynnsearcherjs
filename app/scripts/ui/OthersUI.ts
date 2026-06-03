import { AItem } from "../data/AItem";
import { typeGuildTome, typeMarathonTome, typeExpertiseTome, typeLootrunTome, typeMysticismTome, typeWeaponTome, typeArmourTome, typeTome, typeTool, typeMaterial, typeCharm } from "../DataManager";
import { max, min, typeAxe, typePickaxe, typeRod, typeScythe } from "../utils/DataKeys";
import { AItemUI } from "./AItemUI";
import othersManualDrop from "../../json/manual_other_drop.json";
import { basePos, idPos, ids } from "../data/Identifications";


export class OthersUI extends AItemUI {
    protected displayData(item: AItem): void {
        // Apply Item Name
        this.applyDisplayData(item.getName());

        // Type and SubType
        const type = item.getType();
        let subType = "";
        switch (item.getSubType()) {
            case typeGuildTome: //x1 Slots
                subType = "Guild";
                break;
            case typeMarathonTome: //x2 Slots
                subType = "Marathon";
                break;
            case typeExpertiseTome: //x2 Slots
                subType = "Expertise";
                break;
            case typeLootrunTome: //x1 Slots
                subType = "Lootrun";
                break;
            case typeMysticismTome: //x2 Slots
                subType = "Mysticism";
                break;
            case typeWeaponTome: //x2 Slots
                subType = "Weapon";
                break;
            case typeArmourTome: //x4 Slots
                subType = "Armour";
                break;
            default:
                subType = item.getSubType();
                break;
        }
        switch (type) {
            case typeTome:
                this.applyDisplayData("Tome Type: " + subType);
                break;
            case typeTool:
                this.applyDisplayData("Tool Type: " + subType.charAt(0).toUpperCase() + subType.substring(1));
                break;
            case typeMaterial:
                this.applyDisplayData("Gather Type: " + subType.charAt(0).toUpperCase() + subType.substring(1));
                break;
        }

        // Lv. Min
        const lvMin = item.getIdValue(0, max);
        switch (type) {
            case typeTome:
            case typeCharm:
                this.applyDisplayData("Combat Lv. Min: " + lvMin);
                break;
            case typeTool:
                switch (item.getSubType()) {
                    case typePickaxe:
                        this.applyDisplayData("Mining Lv. Min: " + lvMin);
                        break;
                    case typeAxe:
                        this.applyDisplayData("Woodcutting Lv. Min: " + lvMin);
                        break;
                    case typeScythe:
                        this.applyDisplayData("Farming Lv. Min: " + lvMin);
                        break;
                    case typeRod:
                        this.applyDisplayData("Fishing Lv. Min: " + lvMin);
                        break;
                }
                break;
            case typeMaterial:
                this.applyDisplayData("Lv. Min: " + lvMin);
                break;
        }
        this.applyDisplayData("");

        // Gather Speed (Tools)
        if (item.haveId(197, null, "", "")) {
            const spd = item.getIdValue(197, max);
            if (spd >= 120) {
                this.applyDisplayData("Gathering Speed: " + spd + "(Very Fast)");
            } else if (spd >= 65) {
                this.applyDisplayData("Gathering Speed: " + spd + "(Fast)");
            } else if (spd == 45) {
                this.applyDisplayData("Gathering Speed: " + spd + "(Normal)");
            } else {
                this.applyDisplayData("Gathering Speed: " + spd + "(Slow)");
            }
        }

        // Leveled IDs (Charm)
        if (item.haveFieldPosBase(basePos)) {
            const lvMax = lvMin + 20;
            for (let i = 198; 200 >= i; ++i) {
                const id = ids[i];
                if (item.haveId(i, null, "", "")) this.applyDisplayData(AItemUI.setPlus(item.getIdValue(i, min)) + id.displaySp + " " + id.displayName + lvMin + "-" + lvMax + " contents " + AItemUI.setPlus(item.getIdValue(i, max)) + id.displaySp);
            }
        }

        // IDs (Tome and Charm)
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
                        this.applyDisplayData(id.displayName + " " + AItemUI.setPlus(maxValue) + id.displaySp);
                    } else {
                        this.applyDisplayData(AItemUI.setPlus(minValue) + id.displaySp + " " + id.displayName + " " + AItemUI.setPlus(maxValue) + id.displaySp);
                    }
                    addSpace = true;
                }
            }
        
            if (addSpace) this.applyDisplayData("");
        }

        // Rarity (Tome and Charm)
        const rarity = item.getRarity();
        if (rarity.length > 0) this.applyDisplayData("Rarity: " + rarity.charAt(0).toUpperCase() + rarity.substring(1));

        // Restriction
        if (item.haveId(7, null, "", "")) {
            const restrict = item.getIdStringFromIdNum(7);
            if (restrict !== "none") this.applyDisplayData("Restriction: " + restrict);
        }

        // How to obtain
        item.setHowToObtainTooltip(this.base, othersManualDrop);

        // Sort Value
        this.applyDisplayData("Sort Value: " + item.filterMaxValues[0]);
    }
}