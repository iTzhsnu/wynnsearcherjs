export type SumIds = {
    sumBaseIds: number[],
    sumAddIds: number[],
    sumMultiIds: number[],
    sumIds: number[],
    isDPS: boolean,
    isMeleeDPS: boolean,
    needAll: boolean,
    useAverage: boolean
}

// Check identifications.ts idList
export const sumIds: SumIds[] = [
    // Ingredient Effectiveness
    { sumBaseIds: [123, 124, 125, 126, 127, 128], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    // Health, Health Regen, Defense, Skill Point
    // 1 to 8
    { sumBaseIds: [8, 9], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [10], sumAddIds: [], sumMultiIds: [11], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [18, 19, 20, 21, 22], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [18, 19, 20, 21, 22], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },
    { sumBaseIds: [23, 24, 25, 26, 27, 28], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [23, 24, 25, 26, 27], sumAddIds: [28], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [13, 14, 15, 16, 17], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [13, 14, 15, 16, 17], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },
    
    // Average DPS
    // 9 to 15
    { sumBaseIds: [29, 30, 31, 32, 33, 34], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [29], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [30], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [31], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [32], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [33], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [34], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },

    // Base Damages
    // 16 to 17
    { sumBaseIds: [29, 30, 31, 32, 33, 34], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [30, 31, 32, 33, 34], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },

    // Raw Damages, Raw Spell Damage, Raw Melee Damage
    // 18 to 20
    { sumBaseIds: [74, 75, 76, 77, 78, 79, 80, 81], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [106, 107, 108, 109, 110, 111, 112, 113], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [90, 91, 92, 93, 94, 95, 96, 97], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },

    // Damages %
    // 21 to 22
    { sumBaseIds: [35, 42], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [36, 37, 38, 39, 40, 41], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },

    // Total Melee Damage, Total ** Melee Damage
    // 23 to 29
    { sumBaseIds: [], sumAddIds: [], sumMultiIds: [], sumIds: [49, 50, 51, 52, 53, 54, 67, 68], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [29], sumAddIds: [75, 91, 74, 90], sumMultiIds: [36, 83, 35, 82], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [30], sumAddIds: [76, 92, 74, 81, 90, 97], sumMultiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [31], sumAddIds: [77, 93, 74, 81, 90, 97], sumMultiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [32], sumAddIds: [78, 94, 74, 81, 90, 97], sumMultiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [33], sumAddIds: [79, 95, 74, 81, 90, 97], sumMultiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [34], sumAddIds: [80, 96, 74, 81, 90, 97], sumMultiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },

    // Total xx Melee/Spell DPS
    // 30 to 43
    // 1. Melee, 2. Spell (1, 2, 1, 2...)
    { sumBaseIds: [], sumAddIds: [], sumMultiIds: [], sumIds: [55, 56, 57, 58, 59, 60, 67, 68], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [], sumAddIds: [], sumMultiIds: [], sumIds: [61, 62, 63, 64, 65, 66, 69, 70], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [29], sumAddIds: [75, 91, 74, 90], sumMultiIds: [36, 83, 35, 82], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [29], sumAddIds: [75, 107, 74, 106], sumMultiIds: [36, 99, 35, 98], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [30], sumAddIds: [76, 92, 74, 81, 90, 97], sumMultiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [30], sumAddIds: [76, 108, 74, 106, 81, 113], sumMultiIds: [37, 100, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [31], sumAddIds: [77, 93, 74, 81, 90, 97], sumMultiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [31], sumAddIds: [77, 109, 74, 106, 81, 113], sumMultiIds: [38, 101, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [32], sumAddIds: [78, 94, 74, 81, 90, 97], sumMultiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [32], sumAddIds: [78, 110, 74, 106, 81, 113], sumMultiIds: [39, 102, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [33], sumAddIds: [79, 95, 74, 81, 90, 97], sumMultiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [33], sumAddIds: [79, 111, 74, 106, 81, 113], sumMultiIds: [40, 103, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [34], sumAddIds: [80, 96, 74, 81, 90, 97], sumMultiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [34], sumAddIds: [80, 112, 74, 106, 81, 113], sumMultiIds: [41, 104, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    
    // Spell Costs
    // 44 to 45
    { sumBaseIds: [66, 67, 68, 69], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [70, 71, 72, 73], sumAddIds: [], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    // Damage Appropriate
    // 46 to 48
    { sumBaseIds: [], sumAddIds: [], sumMultiIds: [], sumIds: [49, 50, 51, 52, 53, 54, 67, 68], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [], sumAddIds: [], sumMultiIds: [], sumIds: [55, 56, 57, 58, 59, 60, 67, 68], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [], sumAddIds: [], sumMultiIds: [], sumIds: [61, 62, 63, 64, 65, 66, 69, 70], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },

    // Melee Damages (used in total melee damage and melee damage appropriate)
    // 49 to 54
    { sumBaseIds: [29], sumAddIds: [75, 91], sumMultiIds: [36, 83, 35, 82], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [30], sumAddIds: [76, 92], sumMultiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [31], sumAddIds: [77, 93], sumMultiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [32], sumAddIds: [78, 94], sumMultiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [33], sumAddIds: [79, 95], sumMultiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [34], sumAddIds: [80, 96], sumMultiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    // Melee DPS (used in melee dps appropriate)
    // 55 to 60
    { sumBaseIds: [29], sumAddIds: [75, 91], sumMultiIds: [36, 83, 35, 82], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [30], sumAddIds: [76, 92], sumMultiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [31], sumAddIds: [77, 93], sumMultiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [32], sumAddIds: [78, 94], sumMultiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [33], sumAddIds: [79, 95], sumMultiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { sumBaseIds: [34], sumAddIds: [80, 96], sumMultiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    
    // Spell DPS (used in spell dps appropriate)
    // 61 to 66
    { sumBaseIds: [29], sumAddIds: [75, 107], sumMultiIds: [36, 99, 35, 98], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [30], sumAddIds: [76, 108], sumMultiIds: [37, 100, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [31], sumAddIds: [77, 109], sumMultiIds: [38, 101, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [32], sumAddIds: [78, 110], sumMultiIds: [39, 102, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [33], sumAddIds: [79, 111], sumMultiIds: [40, 103, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { sumBaseIds: [34], sumAddIds: [80, 112], sumMultiIds: [41, 104, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },

    // Raw Damages for Melee (All, Elem), Raw Damages for Spell (All, Elem)
    // 67 to 70
    { sumBaseIds: [], sumAddIds: [74, 90], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [], sumAddIds: [81, 97], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    { sumBaseIds: [], sumAddIds: [74, 106], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { sumBaseIds: [], sumAddIds: [81, 113], sumMultiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false }
]