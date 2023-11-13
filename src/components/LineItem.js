import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'

const LineItem = ({item,handleCheck,handleDelete}) => {
  return (
            <li className='item'> 
                <input type="checkbox" 

                    onChange={()=>handleCheck(item.id)}
                    checked={item.checked}
                
                />
                <label 

                    onDoubleClick={()=>handleCheck(item.id)}
                >{item.name}</label>
                <FaTrashAlt 
                    onClick={()=>handleDelete(item.id)}
                    role="button" 
                    aria-label={`Delete ${item.item}`}
                    
                />
            </li>
  )
}

export default LineItem