import './CSS/Body.css'
import React from 'react';
import ItemList from './ItemList';

const Content=({items,setItems,handleCheck,handleDelete})=>{
    return(
        <div className="main" >
            {items.length ? (
               <ItemList
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
               />
            ):
            (
                <p>Empty</p>
            )
            }
            <button>Add Item</button>

        </div>
    );
}

export default Content