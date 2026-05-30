export type SumIds = {
    baseIds: number[],
    addIds: number[],
    multiIds: number[],
    sumIds: number[],
    isDPS: boolean,
    isMeleeDPS: boolean,
    needAll: boolean,
    useAverage: boolean
}

// Check identifications.ts idList
export const sumIds: SumIds[] = [
    // Ingredient Effectiveness
    { baseIds: [123, 124, 125, 126, 127, 128], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    // Health, Health Regen, Defense, Skill Point
    // 1 to 8
    { baseIds: [8, 9], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [10], addIds: [], multiIds: [11], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [18, 19, 20, 21, 22], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [18, 19, 20, 21, 22], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },
    { baseIds: [23, 24, 25, 26, 27, 28], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [23, 24, 25, 26, 27], addIds: [28], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [13, 14, 15, 16, 17], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [13, 14, 15, 16, 17], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },
    
    // Average DPS
    // 9 to 15
    { baseIds: [29, 30, 31, 32, 33, 34], addIds: [], multiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [29], addIds: [], multiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [30], addIds: [], multiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [31], addIds: [], multiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [32], addIds: [], multiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [33], addIds: [], multiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [34], addIds: [], multiIds: [], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },

    // Base Damages
    // 16 to 17
    { baseIds: [29, 30, 31, 32, 33, 34], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [30, 31, 32, 33, 34], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },

    // Raw Damages, Raw Spell Damage, Raw Melee Damage
    // 18 to 20
    { baseIds: [74, 75, 76, 77, 78, 79, 80, 81], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [106, 107, 108, 109, 110, 111, 112, 113], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [90, 91, 92, 93, 94, 95, 96, 97], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },

    // Damages %
    // 21 to 22
    { baseIds: [35, 42], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [36, 37, 38, 39, 40, 41], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: true, useAverage: false },

    // Total Melee Damage, Total ** Melee Damage
    // 23 to 29
    { baseIds: [], addIds: [], multiIds: [], sumIds: [49, 50, 51, 52, 53, 54, 67, 68], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [29], addIds: [75, 91, 74, 90], multiIds: [36, 83, 35, 82], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [30], addIds: [76, 92, 74, 81, 90, 97], multiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [31], addIds: [77, 93, 74, 81, 90, 97], multiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [32], addIds: [78, 94, 74, 81, 90, 97], multiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [33], addIds: [79, 95, 74, 81, 90, 97], multiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [34], addIds: [80, 96, 74, 81, 90, 97], multiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },

    // Total xx Melee/Spell DPS
    // 30 to 43
    // 1. Melee, 2. Spell (1, 2, 1, 2...)
    { baseIds: [], addIds: [], multiIds: [], sumIds: [55, 56, 57, 58, 59, 60, 67, 68], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [], addIds: [], multiIds: [], sumIds: [61, 62, 63, 64, 65, 66, 69, 70], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [29], addIds: [75, 91, 74, 90], multiIds: [36, 83, 35, 82], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [29], addIds: [75, 107, 74, 106], multiIds: [36, 99, 35, 98], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [30], addIds: [76, 92, 74, 81, 90, 97], multiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [30], addIds: [76, 108, 74, 106, 81, 113], multiIds: [37, 100, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [31], addIds: [77, 93, 74, 81, 90, 97], multiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [31], addIds: [77, 109, 74, 106, 81, 113], multiIds: [38, 101, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [32], addIds: [78, 94, 74, 81, 90, 97], multiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [32], addIds: [78, 110, 74, 106, 81, 113], multiIds: [39, 102, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [33], addIds: [79, 95, 74, 81, 90, 97], multiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [33], addIds: [79, 111, 74, 106, 81, 113], multiIds: [40, 103, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [34], addIds: [80, 96, 74, 81, 90, 97], multiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [34], addIds: [80, 112, 74, 106, 81, 113], multiIds: [41, 104, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    
    // Spell Costs
    // 44 to 45
    { baseIds: [66, 67, 68, 69], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [70, 71, 72, 73], addIds: [], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    // Damage Appropriate
    // 46 to 48
    { baseIds: [], addIds: [], multiIds: [], sumIds: [49, 50, 51, 52, 53, 54, 67, 68], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [], addIds: [], multiIds: [], sumIds: [55, 56, 57, 58, 59, 60, 67, 68], isDPS: false, isMeleeDPS: true, needAll: false, useAverage: false },
    { baseIds: [], addIds: [], multiIds: [], sumIds: [61, 62, 63, 64, 65, 66, 69, 70], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: false },

    // Melee Damages (used in total melee damage and melee damage appropriate)
    // 49 to 54
    { baseIds: [29], addIds: [75, 91], multiIds: [36, 83, 35, 82], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [30], addIds: [76, 92], multiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [31], addIds: [77, 93], multiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [32], addIds: [78, 94], multiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [33], addIds: [79, 95], multiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [34], addIds: [80, 96], multiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    // Melee DPS (used in melee dps appropriate)
    // 55 to 60
    { baseIds: [29], addIds: [75, 91], multiIds: [36, 83, 35, 82], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [30], addIds: [76, 92], multiIds: [37, 84, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [31], addIds: [77, 93], multiIds: [38, 85, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [32], addIds: [78, 94], multiIds: [39, 86, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [33], addIds: [79, 95], multiIds: [40, 87, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    { baseIds: [34], addIds: [80, 96], multiIds: [41, 88, 35, 42, 82, 89], sumIds: [], isDPS: true, isMeleeDPS: true, needAll: false, useAverage: true },
    
    // Spell DPS (used in spell dps appropriate)
    // 61 to 66
    { baseIds: [29], addIds: [75, 107], multiIds: [36, 99, 35, 98], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [30], addIds: [76, 108], multiIds: [37, 100, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [31], addIds: [77, 109], multiIds: [38, 101, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [32], addIds: [78, 110], multiIds: [39, 102, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [33], addIds: [79, 111], multiIds: [40, 103, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },
    { baseIds: [34], addIds: [80, 112], multiIds: [41, 104, 35, 42, 98, 105], sumIds: [], isDPS: true, isMeleeDPS: false, needAll: false, useAverage: true },

    // Raw Damages for Melee (All, Elem), Raw Damages for Spell (All, Elem)
    // 67 to 70
    { baseIds: [], addIds: [74, 90], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [], addIds: [81, 97], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    
    { baseIds: [], addIds: [74, 106], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false },
    { baseIds: [], addIds: [81, 113], multiIds: [], sumIds: [], isDPS: false, isMeleeDPS: false, needAll: false, useAverage: false }
]