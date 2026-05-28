export const typeInt = "int";
export const typeString = "string";
export const typeSum = "sum";

export const requirementsPos = "requirements";


export type Identifications = {
    displayName: string,
    itemName: string,
    ingName: string,
    displaySp: string,
    idType: string,
    itemFieldPos: string,
    ingFieldPos: string,
    sumIds: number
}

export const ids: Identifications[] = [

    ]

    // 後でnumber割り当て直す
export const idList = new Map<string, number>([
    ["Level", 0],
    ["Strength Req", 1],
    ["Dexterity Req", 2],
    ["Intelligence Req", 3],
    ["Defense Req", 4],
    ["Agility Req", 5],
    ["Quest Req", 6],
    ["Untradable", 7],

    ["Health", 8],
    ["Health Bonus", 9],
    ["Raw Health Regen", 10],
    ["Health Regen %", 11],
    ["Life Steal", 12],

    ["Strength", 13],
    ["Dexterity", 14],
    ["Intelligence", 15],
    ["Defense", 16],
    ["Agility", 17],

    ["Earth Defense", 18],
    ["Thunder Defense", 19],
    ["Water Defense", 20],
    ["Fire Defense", 21],
    ["Air Defense", 22],

    ["Earth Defense %", 23],
    ["Thunder Defense %", 24],
    ["Water Defense %", 25],
    ["Fire Defense %", 26],
    ["Air Defense %", 27],
    ["Elemental Defense %", 28],

    ["Neutral Damage", 29],
    ["Earth Damage", 30],
    ["Thunder Damage", 31],
    ["Water Damage", 32],
    ["Fire Damage", 33],
    ["Air Damage", 34],

    ["Damage %", 35],
    ["Neutral Damage %", 36],
    ["Earth Damage %", 37],
    ["Thunder Damage %", 38],
    ["Water Damage %", 39],
    ["Fire Damage %", 40],
    ["Air Damage %", 41],
    ["Elemental Damage %", 42],

    ["Attack Speed", 43],
    ["Attack Speed Bonus", 44],
    ["Max Mana", 45],
    ["Mana Regen", 46],
    ["Mana Steal", 47],

    ["Walk Speed", 48],
    ["Sprint Bonus", 49],
    ["Sprint Regen", 50],
    ["Jump Height", 51],

    ["Poison", 52],
    ["Thorns", 53],
    ["Reflection", 54],
    ["Exploding", 55],
    ["Critical Damage %", 56],
    ["Stealing", 57],

    ["Combat XP Bonus", 58],
    ["Gathering XP Bonus", 59],
    ["Gathering Speed Bonus", 60],
    ["Loot Bonus", 61],
    ["Loot Quality", 62],
    ["Soul Point Regen", 63],

    ["Powder Slots", 64],
    ["Major ID", 65],

    ["1st Spell Cost Raw", 66],
    ["2nd Spell Cost Raw", 67],
    ["3rd Spell Cost Raw", 68],
    ["4th Spell Cost Raw", 69],

    ["1st Spell Cost %", 70],
    ["2nd Spell Cost %", 71],
    ["3rd Spell Cost %", 72],
    ["4th Spell Cost %", 73],

    ["Raw Damage", 74],
    ["Raw Neutral Damage", 75],
    ["Raw Earth Damage", 76],
    ["Raw Thunder Damage", 77],
    ["Raw Water Damage", 78],
    ["Raw Fire Damage", 79],
    ["Raw Air Damage", 80],
    ["Raw Elemental Damage", 81],

    ["Melee Damage %", 82],
    ["Neutral Melee Damage %", 83],
    ["Earth Melee Damage %", 84],
    ["Thunder Melee Damage %", 85],
    ["Water Melee Damage %", 86],
    ["Fire Melee Damage %", 87],
    ["Air Melee Damage %", 88],
    ["Elemental Melee Damage %", 89],

    ["Raw Melee Damage", 90],
    ["Raw Neutral Melee Damage", 91],
    ["Raw Earth Melee Damage", 92],
    ["Raw Thunder Melee Damage", 93],
    ["Raw Water Melee Damage", 94],
    ["Raw Fire Melee Damage", 95],
    ["Raw Air Melee Damage", 96],
    ["Raw Elemental Melee Damage", 97],

    ["Spell Damage %", 98],
    ["Neutral Spell Damage %", 99],
    ["Earth Spell Damage %", 100],
    ["Thunder Spell Damage %", 101],
    ["Water Spell Damage %", 102],
    ["Fire Spell Damage %", 103],
    ["Air Spell Damage %", 104],
    ["Elemental Spell Damage %", 105],

    ["Raw Spell Damage", 106],
    ["Raw Neutral Spell Damage", 107],
    ["Raw Earth Spell Damage", 108],
    ["Raw Thunder Spell Damage", 109],
    ["Raw Water Spell Damage", 110],
    ["Raw Fire Spell Damage", 111],
    ["Raw Air Spell Damage", 112],
    ["Raw Elemental Spell Damage", 113],

    ["Melee Range", 114],
    ["Knockback", 115],
    ["Healing Efficiency", 116],
    ["Weaken Enemy", 117],
    ["Slow Enemy", 118],

    ["Drop Type: Normal", 119],
    ["Drop Type: Loot Chests", 120],
    ["Drop Type: Raid Rewards", 121],
    ["Drop Type: Dungeon Drop", 122],
    ["Drop Type: Dungeon Merchant", 123],
    ["Drop Type: Boss Altar", 124],
    ["Drop Type: Discontinued", 125],
    ["Drop Type: Unknown", 126],
    ["Drop Type: Merchant", 127],
    ["Drop Type: Quest", 128],
    ["Drop Type: Unobtainable", 129],
    ["Drop Type: Specific Drop", 130],
    ["Drop Type: Secret Discovery", 131],
    ["Drop Type: The Qira Hive", 132],
    ["Drop Type: Legendary Island", 133],
    ["Drop Type: World Event", 134],
    ["Drop Type: Lootrun", 135],
    ["Drop Type: Mini Boss", 136],
    ["Drop Type: Challenge", 137],
    ["Drop Type: Other", 138],

    ["Set", 139],

    ["Durability", 140],
    ["Duration", 141],
    ["Charges", 142],

    ["Ingredient Effectiveness", 143],
    ["Ingredient Effectiveness (Above)", 144],
    ["Ingredient Effectiveness (Under)", 145],
    ["Ingredient Effectiveness (Right)", 146],
    ["Ingredient Effectiveness (Left)", 147],
    ["Ingredient Effectiveness (Touching)", 148],
    ["Ingredient Effectiveness (Not Touching)", 149],

    ["Sum (Total Health)", 150],
    ["Sum (Total Health Regen)", 151],
    ["Sum (Raw Defenses)", 152],
    ["Sum (Raw Rainbow Defenses)", 153],
    ["Sum (Defenses %)", 154],
    ["Sum (Rainbow Defenses %)", 155],

    ["Sum (Skill Point Bonus)", 156],
    ["Sum (Rainbow Skill Point Bonus)", 157],

    ["Sum (Base DPS)", 158],
    ["Sum (Neutral DPS)", 159],
    ["Sum (Earth DPS)", 160],
    ["Sum (Thunder DPS)", 161],
    ["Sum (Water DPS)", 162],
    ["Sum (Fire DPS)", 163],
    ["Sum (Air DPS)", 164],

    ["Sum (Base Damages)", 165],
    ["Sum (Base Rainbow Damages)", 166],
    ["Sum (Raw Damages)", 167],
    ["Sum (Raw Spell Damages)", 168],
    ["Sum (Raw Melee Damages)", 169],
    ["Sum (Damages %)", 170],
    ["Sum (Rainbow Damages %)", 171],

    ["Sum (Total Melee Damage)", 172],
    ["Sum (Total Neutral Melee Damage)", 173],
    ["Sum (Total Earth Melee Damage)", 174],
    ["Sum (Total Thunder Melee Damage)", 175],
    ["Sum (Total Water Melee Damage)", 176],
    ["Sum (Total Fire Melee Damage)", 177],
    ["Sum (Total Air Melee Damage)", 178],

    ["Sum (Total Melee DPS)", 179],
    ["Sum (Total Neutral Melee DPS)", 180],
    ["Sum (Total Earth Melee DPS)", 181],
    ["Sum (Total Thunder Melee DPS)", 182],
    ["Sum (Total Water Melee DPS)", 183],
    ["Sum (Total Fire Melee DPS)", 184],
    ["Sum (Total Air Melee DPS)", 185],

    ["Sum (Total Spell DPS)", 186],
    ["Sum (Total Neutral Spell DPS)", 187],
    ["Sum (Total Earth Spell DPS)", 188],
    ["Sum (Total Thunder Spell DPS)", 189],
    ["Sum (Total Water Spell DPS)", 190],
    ["Sum (Total Fire Spell DPS)", 191],
    ["Sum (Total Air Spell DPS)", 192],

    ["Sum (Raw Spell Costs)", 193],
    ["Sum (Spell Costs %)", 194],

    ["Sum (Spell Damages appropriate)", 195],
    ["Sum (Melee Damages appropriate)", 196]
]);