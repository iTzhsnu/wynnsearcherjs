import { JSONValue } from "next/dist/server/config-shared";
import { AItem } from "./AItem";
import { ids } from "./Identifications";

export class Item extends AItem {
    public getIdValue(idNum: number, sortType: string): number {
        const id = ids[idNum];
        return this.getIdValueBase(idNum, id.itemName, id.ingFieldPos, sortType);
    }

    public haveIdValue(idNum: number, howToObtain: JSONValue, min: string, max: string): boolean {
        
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