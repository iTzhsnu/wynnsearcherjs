"use client";

import styles from "./styles.module.css";
import { useEffect } from 'react';
import { InitializeData } from "./scripts/DataManager";

export default function Home() {
    useEffect(() => {
        InitializeData();
    });

    return (
    <div className={styles.main}>
            <div className="filter-area">
                <input className={styles.search_input} type="text" id="name-filter-field" placeholder="Name Filter"/>
                <button className={styles.search_button} id="search-button">Search</button>
                
                <div className={styles.inline_block}>
                    <div>
                        <select className={styles.item_type} id="item-type-select">
                            <option value="equipments">Type: Equipments</option>
                            <option value="ingredients">Type: Ingredients</option>
                            <option value="others">Type: Others</option>
                        </select>
                    </div>

                    <div>
                        <select className={styles.item_type} id="rarity-type-select">
                            <option value="any">Rarity: Any</option>
                            <option value="no-normal">Rarity: No Normal</option>
                            <option value="mythic">Rarity: Mythic</option>
                            <option value="fabled">Rarity: Fabled</option>
                            <option value="legendary">Rarity: Legendary</option>
                            <option value="rare">Rarity: Rare</option>
                            <option value="unique">Rarity: Unique</option>
                            <option value="normal">Rarity: Normal</option>
                        </select>
                    </div>
                </div>
                

                <div className={styles.inline_block}>
                    <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="bow-checkbox" />Bow</label>
                    <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="spear-checkbox" />Spear</label>
                    <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="wand-checkbox" />Wand</label>
                    <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="dagger-checkbox" />Dagger</label>
                    <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="relik-checkbox" />Relik</label>
                    
                    <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="ring-checkbox" />Ring</label>
                    <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="bracelet-checkbox" />Bracelet</label>

                    <div>
                        <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="helmet-checkbox" />Helmet</label>
                        <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="chestplate-checkbox" />Chestplate</label>
                        <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="leggings-checkbox" />Leggings</label>
                        <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="boots-checkbox" />Boots</label>
                        <label className={styles.type_label}><input className={styles.type_checkbox} type="checkbox" id="necklace-checkbox" />Necklace</label>
                    </div>
                </div>

                <div>
                    Sort:  
                    <input id="id-box-11" list="ids" className={styles.ids_box} defaultValue="Level" />
                    +
                    <input id="id-box-12" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-13" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-14" list="ids" className={styles.ids_box} />
                </div>
                <div>
                    <input id="id-range-min-1" className={styles.ids_range} />
                    to
                    <input id="id-range-max-1" className={styles.ids_range} />

                    <select className={styles.sort_type} id="sort_type">
                        <option value="min">Sort: Min</option>
                        <option value="max">Sort: Max</option>
                    </select>
                </div>

                <div>
                    Filter 1:
                    <input id="id-box-21" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-22" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-23" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-24" list="ids" className={styles.ids_box} />
                </div>
                <div>
                    <input id="id-range-min-2" className={styles.ids_range} />
                    to
                    <input id="id-range-max-2" className={styles.ids_range} />
                </div>

                <div>
                    Filter 2:
                    <input id="id-box-31" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-32" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-33" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-34" list="ids" className={styles.ids_box} />
                </div>
                <div>
                    <input id="id-range-min-3" className={styles.ids_range} />
                    to
                    <input id="id-range-max-3" className={styles.ids_range} />
                </div>

                <div>
                    Filter 3:
                    <input id="id-box-41" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-42" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-43" list="ids" className={styles.ids_box} />
                    +
                    <input id="id-box-44" list="ids" className={styles.ids_box} />
                </div>
                <div>
                    <input id="id-range-min-4" className={styles.ids_range} />
                    to
                    <input id="id-range-max-4" className={styles.ids_range} />
                </div>

                <datalist id="ids">
                    <option value="Level"></option>
                    <option value="Sum (Spell DPS appropriate)"></option>
                    <option value="Sum (Melee DPS appropriate)"></option>
                    <option value="Sum (Melee Damage appropriate)"></option>
                    <option value="Strength Req"></option>
                    <option value="Dexterity Req"></option>
                    <option value="Intelligence Req"></option>
                    <option value="Defense Req"></option>
                    <option value="Agility Req"></option>
                    <option value="Quest Req"></option>
                    <option value="Untradable"></option>
                    <option value="Health"></option>
                    <option value="Health Bonus"></option>
                    <option value="Raw Health Regen"></option>
                    <option value="Health Regen %"></option>
                    <option value="Life Steal"></option>
                    <option value="Strength"></option>
                    <option value="Dexterity"></option>
                    <option value="Intelligence"></option>
                    <option value="Defense"></option>
                    <option value="Agility"></option>
                    <option value="Earth Defense"></option>
                    <option value="Thunder Defense"></option>
                    <option value="Water Defense"></option>
                    <option value="Fire Defense"></option>
                    <option value="Air Defense"></option>
                    <option value="Earth Defense %"></option>
                    <option value="Thunder Defense %"></option>
                    <option value="Water Defense %"></option>
                    <option value="Fire Defense %"></option>
                    <option value="Air Defense %"></option>
                    <option value="Elemental Defense %"></option>
                    <option value="Neutral Damage"></option>
                    <option value="Earth Damage"></option>
                    <option value="Thunder Damage"></option>
                    <option value="Water Damage"></option>
                    <option value="Fire Damage"></option>
                    <option value="Air Damage"></option>
                    <option value="Damage %"></option>
                    <option value="Neutral Damage %"></option>
                    <option value="Earth Damage %"></option>
                    <option value="Thunder Damage %"></option>
                    <option value="Water Damage %"></option>
                    <option value="Fire Damage %"></option>
                    <option value="Air Damage %"></option>
                    <option value="Elemental Damage %"></option>
                    <option value="Attack Speed"></option>
                    <option value="Attack Speed Bonus"></option>
                    <option value="Max Mana"></option>
                    <option value="Mana Regen"></option>
                    <option value="Mana Steal"></option>
                    <option value="Walk Speed"></option>
                    <option value="Sprint Bonus"></option>
                    <option value="Sprint Regen"></option>
                    <option value="Jump Height"></option>
                    <option value="Poison"></option>
                    <option value="Thorns"></option>
                    <option value="Reflection"></option>
                    <option value="Exploding"></option>
                    <option value="Critical Damage %"></option>
                    <option value="Stealing"></option>
                    <option value="Combat XP Bonus"></option>
                    <option value="Gathering XP Bonus"></option>
                    <option value="Gathering Speed Bonus"></option>
                    <option value="Loot Bonus"></option>
                    <option value="Loot Quality"></option>
                    <option value="Soul Point Regen"></option>
                    <option value="Powder Slots"></option>
                    <option value="Major ID"></option>
                    <option value="1st Spell Cost Raw"></option>
                    <option value="2nd Spell Cost Raw"></option>
                    <option value="3rd Spell Cost Raw"></option>
                    <option value="4th Spell Cost Raw"></option>
                    <option value="1st Spell Cost %"></option>
                    <option value="2nd Spell Cost %"></option>
                    <option value="3rd Spell Cost %"></option>
                    <option value="4th Spell Cost %"></option>
                    <option value="Raw Damage"></option>
                    <option value="Raw Neutral Damage"></option>
                    <option value="Raw Earth Damage"></option>
                    <option value="Raw Thunder Damage"></option>
                    <option value="Raw Water Damage"></option>
                    <option value="Raw Fire Damage"></option>
                    <option value="Raw Air Damage"></option>
                    <option value="Raw Elemental Damage"></option>
                    <option value="Melee Damage %"></option>
                    <option value="Neutral Melee Damage %"></option>
                    <option value="Earth Melee Damage %"></option>
                    <option value="Thunder Melee Damage %"></option>
                    <option value="Water Melee Damage %"></option>
                    <option value="Fire Melee Damage %"></option>
                    <option value="Air Melee Damage %"></option>
                    <option value="Elemental Melee Damage %"></option>
                    <option value="Raw Melee Damage"></option>
                    <option value="Raw Neutral Melee Damage"></option>
                    <option value="Raw Earth Melee Damage"></option>
                    <option value="Raw Thunder Melee Damage"></option>
                    <option value="Raw Water Melee Damage"></option>
                    <option value="Raw Fire Melee Damage"></option>
                    <option value="Raw Air Melee Damage"></option>
                    <option value="Raw Elemental Melee Damage"></option>
                    <option value="Spell Damage %"></option>
                    <option value="Neutral Spell Damage %"></option>
                    <option value="Earth Spell Damage %"></option>
                    <option value="Thunder Spell Damage %"></option>
                    <option value="Water Spell Damage %"></option>
                    <option value="Fire Spell Damage %"></option>
                    <option value="Air Spell Damage %"></option>
                    <option value="Elemental Spell Damage %"></option>
                    <option value="Raw Spell Damage"></option>
                    <option value="Raw Neutral Spell Damage"></option>
                    <option value="Raw Earth Spell Damage"></option>
                    <option value="Raw Thunder Spell Damage"></option>
                    <option value="Raw Water Spell Damage"></option>
                    <option value="Raw Fire Spell Damage"></option>
                    <option value="Raw Air Spell Damage"></option>
                    <option value="Raw Elemental Spell Damage"></option>
                    <option value="Melee Range"></option>
                    <option value="Knockback"></option>
                    <option value="Healing Efficiency"></option>
                    <option value="Weaken Enemy"></option>
                    <option value="Slow Enemy"></option>
                    <option value="Drop Type: Normal"></option>
                    <option value="Drop Type: Loot Chests"></option>
                    <option value="Drop Type: Raid Rewards"></option>
                    <option value="Drop Type: Dungeon Drop"></option>
                    <option value="Drop Type: Dungeon Merchant"></option>
                    <option value="Drop Type: Boss Altar"></option>
                    <option value="Drop Type: Discontinued"></option>
                    <option value="Drop Type: Unknown"></option>
                    <option value="Drop Type: Merchant"></option>
                    <option value="Drop Type: Quest"></option>
                    <option value="Drop Type: Unobtainable"></option>
                    <option value="Drop Type: Specific Drop"></option>
                    <option value="Drop Type: Secret Discovery"></option>
                    <option value="Drop Type: The Qira Hive"></option>
                    <option value="Drop Type: Legendary Island"></option>
                    <option value="Drop Type: World Event"></option>
                    <option value="Drop Type: Lootrun"></option>
                    <option value="Drop Type: Mini Boss"></option>
                    <option value="Drop Type: Challenge"></option>
                    <option value="Drop Type: Other"></option>
                    <option value="Set"></option>
                    <option value="Durability"></option>
                    <option value="Duration"></option>
                    <option value="Charges"></option>
                    <option value="Ingredient Effectiveness"></option>
                    <option value="Ingredient Effectiveness (Above)"></option>
                    <option value="Ingredient Effectiveness (Under)"></option>
                    <option value="Ingredient Effectiveness (Right)"></option>
                    <option value="Ingredient Effectiveness (Left)"></option>
                    <option value="Ingredient Effectiveness (Touching)"></option>
                    <option value="Ingredient Effectiveness (Not Touching)"></option>
                    <option value="Sum (Total Health)"></option>
                    <option value="Sum (Total Health Regen)"></option>
                    <option value="Sum (Raw Defenses)"></option>
                    <option value="Sum (Raw Rainbow Defenses)"></option>
                    <option value="Sum (Defenses %)"></option>
                    <option value="Sum (Rainbow Defenses %)"></option>
                    <option value="Sum (Skill Point Bonus)"></option>
                    <option value="Sum (Rainbow Skill Point Bonus)"></option>
                    <option value="Sum (Base DPS)"></option>
                    <option value="Sum (Neutral DPS)"></option>
                    <option value="Sum (Earth DPS)"></option>
                    <option value="Sum (Thunder DPS)"></option>
                    <option value="Sum (Water DPS)"></option>
                    <option value="Sum (Fire DPS)"></option>
                    <option value="Sum (Air DPS)"></option>
                    <option value="Sum (Base Damages)"></option>
                    <option value="Sum (Base Rainbow Damages)"></option>
                    <option value="Sum (Raw Damages)"></option>
                    <option value="Sum (Raw Spell Damages)"></option>
                    <option value="Sum (Raw Melee Damages)"></option>
                    <option value="Sum (Damages %)"></option>
                    <option value="Sum (Rainbow Damages %)"></option>
                    <option value="Sum (Total Melee Damage)"></option>
                    <option value="Sum (Total Neutral Melee Damage)"></option>
                    <option value="Sum (Total Earth Melee Damage)"></option>
                    <option value="Sum (Total Thunder Melee Damage)"></option>
                    <option value="Sum (Total Water Melee Damage)"></option>
                    <option value="Sum (Total Fire Melee Damage)"></option>
                    <option value="Sum (Total Air Melee Damage)"></option>
                    <option value="Sum (Total Melee DPS)"></option>
                    <option value="Sum (Total Neutral Melee DPS)"></option>
                    <option value="Sum (Total Earth Melee DPS)"></option>
                    <option value="Sum (Total Thunder Melee DPS)"></option>
                    <option value="Sum (Total Water Melee DPS)"></option>
                    <option value="Sum (Total Fire Melee DPS)"></option>
                    <option value="Sum (Total Air Melee DPS)"></option>
                    <option value="Sum (Total Spell DPS)"></option>
                    <option value="Sum (Total Neutral Spell DPS)"></option>
                    <option value="Sum (Total Earth Spell DPS)"></option>
                    <option value="Sum (Total Thunder Spell DPS)"></option>
                    <option value="Sum (Total Water Spell DPS)"></option>
                    <option value="Sum (Total Fire Spell DPS)"></option>
                    <option value="Sum (Total Air Spell DPS)"></option>
                    <option value="Sum (Raw Spell Costs)"></option>
                    <option value="Sum (Spell Costs %)"></option>
                </datalist>

                <div className={styles.result_box}>

                </div>
            </div>
        </div>
    );
}
