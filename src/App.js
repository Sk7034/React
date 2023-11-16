import React from 'react';
import './App.css';
import Header from './components/header';
import Content from './components/Content';
import Footer from './components/Foot';
import { useState, useEffect } from 'react'
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';
import ItemList from './components/ItemList';
import apiRequest from './components/apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [newItem,setNewItem]=useState('');
  const [search,setSearch]=useState('');
  const [items,setItems] = useState([]);
  const [fetchError,setFetchError]=useState(null)
  const [isLoading,setIsLoading] = useState(true)
 
  
  
useEffect(() => {
  const fetchItems = async ()=>{
    try{
        const response = await fetch(API_URL)
        
        if(!response.ok) throw Error("Did not receive expected data")
        const listItems = await response.json()
        
        setItems(listItems)
        setFetchError(null)
    }catch(err){
        setFetchError(err.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  
  (async () => await fetchItems())();
  
},[])



  const handleCheck = async (id)=>{
          const listItems = items.map((item)=>item.id===id ?{ ...item, checked: !item.checked} : item);
          setItems(listItems);   
          
          const myItem = listItems.filter((item)=> item.id === id)
          const updateOptions = {
            method:'PATCH',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({checked:myItem[0].checked })
          }
          const reqUrl = `${API_URL}/${id}`
          const result =await apiRequest(reqUrl,updateOptions)
          if (result) setFetchError(result)

  }

  const handleDelete = async (id)=>{
      const listItems = items.filter((item)=> item.id !== id)
      setItems(listItems)

      const deleteOptions = {
        method: 'DELETE',
      }

      const reqUrl = `${API_URL}/${id}`
      const result =await apiRequest(reqUrl,deleteOptions)
      if (result) setFetchError(result)

  }

  const addItem = async (item)=>{
    const id=items.length ? items[items.length-1].id+1 : 1;
    const myNewItem = {
      id,
      checked:false,
      name:newItem
    }
    const newList=[...items,myNewItem]
    setItems(newList)

    const postOptions = { 
      method:'Post',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)

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
        <main>
          {fetchError &&<p style={{color:"red"}}>{`Error: ${fetchError}`}</p>}
         { !fetchError &&  <Content 
            items={items.filter(item =>((item.name).toLowerCase()).includes(search.toLowerCase()))}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />}
        </main>
        <Footer/>
    </div>
  );
  
}

export default App;
