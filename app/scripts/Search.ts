import { typeEquip, typeIng, typeOthers } from "./ui/filterUIManager";


export function search(): void {
    switch ((<HTMLSelectElement>document.getElementById("item-type-select")).value) {
        case typeEquip:
            searchItems();
            break;
        case typeIng:
            searchIngs();
            break;
        case typeOthers:
            searchOthers();
            break;
    }
}

function searchItems(): void {

}

function searchIngs(): void {

}

function searchOthers(): void {

}

