import { JSONValue } from "next/dist/server/config-shared";

export abstract class AItem {
    protected j: JSONValue;

    public constructor(j: JSONValue) {
        this.j = j;
    }

    // sortType: true=max, false=min
    public abstract getIdValue(id: number, sortType: boolean): number;

    protected getIdValueBase(id: number, idName: string | undefined, fieldPos: string | undefined, sortType: boolean): number {
        return 0;
    }

    public haveId(id: number, howToObtain: JSONValue, min: string, max: string): boolean {
        return false;
    }

    public abstract haveIdValue(id: number, howToObtain: JSONValue, min: string, max: string): boolean;

    public getTotalSumFloat(id: number, sortType: boolean, min: string, max: string): number {
        return 0;
    }

    public haveDamageAppropriateSumId(id: number, weaponName: string, powder: string): boolean {
        return false;
    }

    public getDamAppropriateSumFloat(id: number, sortType: boolean, weaponName: string, powder: string) {

    }

    public getAttackSpeed(): number {
        return 0;
    }

    public getName(): string {
        return "";
    }

    public getSubType(): string {
        return "";
    }

    public getType(): string {
        return "";
    }

    public abstract getIdString(id: number): string;

    protected getIdStringBase(id: number, idName: string, fieldPos: string): string {
        return "";
    }

    public abstract haveFieldPos(id: number): boolean;

    public haveFieldPosBase(fieldPos: string): boolean {
        return false;
    }

    public static getBaseId(i: number) {
        return Math.round(i / 1.3);
    }

    public static isReversedId(id: number): boolean {
        return false;
    }
}