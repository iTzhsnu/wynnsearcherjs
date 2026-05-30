import { JSONValue } from "next/dist/server/config-shared"

export type JSONValueEx = JSONValue | null | undefined | JSONValueEx[] | {
    [k: string]: JSONValueEx;
}