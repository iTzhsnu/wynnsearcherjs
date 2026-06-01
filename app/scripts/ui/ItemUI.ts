import { AItem } from "../data/AItem";
import { AItemUI } from "./AItemUI";


export class ItemUI extends AItemUI {
    protected displayData(item: AItem): void {
        // Add Name
        this.base.appendChild(document.createTextNode(item.getName()));

        // Add Type (Sub Type)
        const subType = document.createElement("div");
        subType.appendChild(document.createTextNode(item.getSubType()));
        this.base.appendChild(subType);

        // Add Attack Speed


    }
}