import { JSONValueEx } from "../utils/JSONValueEx";
import { AItem } from "./AItem";
import { ids, reqPos } from "./Identifications";

export const ingSkills = "skills";

export class Ingredient extends AItem {
    public getIdValue(idNum: number, sortType: string): number {
        const id = ids[idNum];
        return this.getIdValueBase(idNum, id.ingName, id.ingFieldPos, sortType);
    }

    public haveIdValue(idNum: number, howToObtain: JSONValueEx, filterMin: string, filterMax: string): boolean {

        return false;
    }

    public getIdString(idNum: number): string {
        const id = ids[idNum];
        return this.getIdStringBase(idNum, id.ingName, id.ingFieldPos);
    }
    
    public haveFieldPos(idNum: number): boolean {
        return this.haveFieldPosBase(ids[idNum].ingFieldPos);
    }

    // please use => if (Array.isArray(value))
    public getSkills(): JSONValueEx {
        if (typeof this.json === "object" && this.json !== null && !Array.isArray(this.json) 
            && typeof this.json[reqPos] === "object" && this.json[reqPos] !== null && !Array.isArray(this.json[reqPos])
        && typeof this.json[reqPos][ingSkills] === "object") {
            return this.json[reqPos][ingSkills];
        }

        return false;
    }
}