import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
            <div className="filter-area">
                <input className={styles.search_input} type="text" id="name-filter-field" placeholder="Name Filter"/>
                <button className={styles.search_button} id="search-button">Search</button>
                
                <div className={styles.inline_block}>
                    <div>
                        <select className={styles.item_type} id="item-type-select">
                            <option value="equipmets">Type: Equipmets</option>
                            <option value="ingredients">Type: Ingredients</option>
                            <option value="others">Type: Others</option>
                            <option value="aspects">Type: Aspects</option>
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
                    <label><input className={styles.type_checkbox} type="checkbox" id="bow-checkbox" />Bow</label>
                    <label><input className={styles.type_checkbox} type="checkbox" id="spear-checkbox" />Spear</label>
                    <label><input className={styles.type_checkbox} type="checkbox" id="wand-checkbox" />Wand</label>
                    <label><input className={styles.type_checkbox} type="checkbox" id="dagger-checkbox" />Dagger</label>
                    <label><input className={styles.type_checkbox} type="checkbox" id="relik-checkbox" />Relik</label>
                    
                    <label><input className={styles.type_checkbox} type="checkbox" id="ring-checkbox" />Ring</label>
                    <label><input className={styles.type_checkbox} type="checkbox" id="bracelet-checkbox" />Bracelet</label>

                    <div>
                        <label><input className={styles.type_checkbox} type="checkbox" id="helmet-checkbox" />Helmet</label>
                        <label><input className={styles.type_checkbox} type="checkbox" id="chestplate-checkbox" />Chestplate</label>
                        <label><input className={styles.type_checkbox} type="checkbox" id="leggings-checkbox" />Leggings</label>
                        <label><input className={styles.type_checkbox} type="checkbox" id="boots-checkbox" />Boots</label>
                        <label><input className={styles.type_checkbox} type="checkbox" id="necklace-checkbox" />Necklace</label>
                    </div>
                </div>

                <div>
                    Sort:  
                    <input id="id-box-11" list="ids" className={styles.ids_box} />
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
                    <option value="Level" id="Level"></option>
                    <option value="Strength Req" id="Strength Req"></option>
                </datalist>

            </div>
        </div>
  );
}
