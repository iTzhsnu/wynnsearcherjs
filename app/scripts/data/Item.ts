import { max } from "../utils/DataKeys";
import { JSONValueEx } from "../utils/JSONValueEx";
import { AItem } from "./AItem";
import { ids, typeInt, typeString } from "./Identifications";

export class Item extends AItem {
    public getIdValue(idNum: number, sortType: string): number {
        const id = ids[idNum];
        return this.getIdValueBase(idNum, id.itemName, id.ingFieldPos, sortType);
    }

    public haveIdValue(idNum: number, howToObtain: JSONValueEx, filterMin: string, filterMax: string): boolean {
        const id = ids[idNum];
        if (id.itemName.length > 0) {
            if (id.idType === typeInt) {
                return this.getIdValue(idNum, max) !== 0;
            } else if (id.idType === typeString) {
                
            } else {
                console.log("Error: Can't check this ID");
            }
        }


        return false;
    }

    public getIdString(idNum: number): string {
        const id = ids[idNum];
        return this.getIdStringBase(idNum, id.itemName, id.itemFieldPos);
    }

    public haveFieldPos(idNum: number): boolean {
        return this.haveFieldPosBase(ids[idNum].itemFieldPos);
    }
}