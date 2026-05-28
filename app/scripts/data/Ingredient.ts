import { JSONValue } from "next/dist/server/config-shared";
import { AItem } from "./AItem";

export class Ingredient extends AItem {
    public getIdValue(id: number, sortType: boolean): number {
        return 0;
    }
    public haveIdValue(id: number, howToObtain: JSONValue, min: string, max: string): boolean {
        return false;
    }
    public getIdString(id: number): string {
        return "";
    }
    public haveFieldPos(id: number): boolean {
        return false;
    }

}