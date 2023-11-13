import React from 'react';
import './App.css';
import Header from './components/header';
import Body from './components/Body';
import Footer from './components/Foot';
import { useState, useEffect } from 'react'
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';
import ItemList from './components/ItemList';

function App() {
  const API_URL = 'http://localhost:3500/item'
  const [newItem,setNewItem]=useState('');
  const [search,setSearch]=useState('');
  const [items,setItem] = useState([]);
  const [fetchError,setFetchError]=useState(null)
 
  
  
useEffect(() => {
  const fetchItems = async ()=>{
    try{
        const response = await fetch(API_URL)
        if(!response.ok) throw Error("Did not receive expected data")
        const listItems = await response.json()
        setItem(listItems)
        set
    }catch(err){
        console.log(err.message)
    }
  }

  (async () => await fetchItems())();
},[])



  const handleCheck = (id)=>{
          const listItems = items.map((item)=>item.id===id ?{ ...item, checked: !item.checked} : item);

          setItem(listItems);      
  }

  const handleDelete = (id)=>{
      const listItems = items.filter((item)=> item.id !== id)
      setItem(listItems)

  }

  const addItem = (item)=>{
    const id=items.length ? items[items.length-1].id+1 : 1;
    const myNewItem = {
      id,
      checked:false,
      name:newItem
    }
    const newList=[...items,myNewItem]
    setItem(newList)

  }

  const handleSubmit = (e)=>{
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem)
        setNewItem('')
        
  }

  return (
    <div className="App">
        
        
        <Header title="List of items" />
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem
          search={search}
          setSearch={setSearch}
        />
        <Body 
          items={items.filter(item =>((item.name).toLowerCase()).includes(search.toLowerCase()))}
          setItem={setItem}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        <Footer/>
    </div>
  );
  
}

export default App;
