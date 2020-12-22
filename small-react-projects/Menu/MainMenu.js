import React,{useState} from 'react'
import Categories from './Categories';
import items from './data'
import Menu from './Menu'
import './Menu.css'

const allCategories = ['all',...new Set(items.map((item)=> item.category))]
function MainMenu() {

    const [menuItems,setMenuItems] = useState(items)
    const [categories,setCategories] = useState(allCategories)

    const filterItems = (category) =>{
        if(category === 'all'){
            setMenuItems(items)
            return
        }
        const newItems = items.filter((item)=> item.category === category)
        setMenuItems(newItems)
    }
    return (
        <div>
            <section className="menu-section">
                <h3 className="demo-title">our menu</h3>
                <Categories categories={categories} filterItems={filterItems}/>
                <Menu items={menuItems}/>
            </section>
            
        </div>
    )
}

export default MainMenu
