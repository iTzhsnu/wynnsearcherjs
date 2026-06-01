import { AItem } from "../data/AItem";
import { rarityId } from "../data/Identifications";
import { r1Star, r2Star, r3Star, rFabled, rLegendary, rMythic, rRare, rUnique } from "../utils/DataKeys";

export abstract class AItemUI {
    protected readonly base: HTMLElement;

    public constructor(item: AItem) {
        const parent = document.getElementById("result-box") as HTMLElement;

        this.base = document.createElement("div");
        this.base.style.display = "inline-block";
        this.base.style.border = "1px solid";
        this.base.style.borderRadius = "5px"
        this.base.style.borderColor = "silver";
        this.base.style.display = "inline-block";
        this.base.style.fontSize = "12px";
        
        // Set Background Color by Rarity
        switch (item.getIdString(rarityId)) {
            case r1Star:
            case rUnique:
                this.base.style.background = "rgb(252, 242, 99)";
                break;
            case r2Star:
            case rRare:
                this.base.style.background = "rgb(255, 168, 211)";
                break;
            case r3Star:
            case rLegendary:
                this.base.style.background = "rgb(135, 206, 250)";
                break;
            case rFabled:
                this.base.style.background = "rgb(220, 107, 154)";
                break;
            case rMythic:
                this.base.style.background = "rgb(145, 93, 163)";
                break;
            default:
                this.base.style.background = "rgb(230, 230, 230)";
                break;
        }

        parent.appendChild(this.base);

        this.displayData(item);
    }

    protected abstract displayData(item: AItem): void;

    public dispose(): void {
        this.base.remove();
    }
}