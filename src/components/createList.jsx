import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';


const CreateList = () => {

const [newDescription, setNewDescription] = useState('');
const [newComplete, setNewComplete] = useState(false)
const [list, setlist] = useState([]);
const [updateList, setUpdateList] = useState('')


const handleNewList = (event) => {
    setNewDescription(event.target.value);
    }

const handleNewComplete = (event) => {
    setNewComplete(event.target.checked);
}

//  ==================== CALL LIST DATA ===============  //

const callListData = () =>{
    axios
            .get('https://climate-change.onrender.com/list')
            .then((response)=>{
                setlist(response.data)
            })
}

// ============= SUBMITING INFO FROM INPUT FIELDS ============= //

const handleNewListFormComplete = (e)=>{
    e.preventDefault();
    axios.post(
        'https://climate-change.onrender.com/list',
        {
            description:newDescription,
            complete:newComplete
        }
    ).then(()=>{
        callListData()
        })
}

// ============== DELETE LIST ITEM ==============//

const handleDelete = (listData) => {
    axios
        .delete(`https://climate-change.onrender.com/list/${listData._id}`)
        .then(()=>{
            callListData()
    })
}
// ======================= STRIKE THROUGH ON CLICK OF ITEM ================== //
const handleToggleComplete = (listData) => {
    axios
        .put(`https://climate-change.onrender.com/list/${listData._id}`, 
        {
        description: listData.description,
        complete: !listData.complete
        }
    ).then(()=>{
    callListData()
    })
}
//  ========================== UPDATE LIST ITEM WITH INPUT FIELD ====================== //

const handleNewUpdate = (e) =>{
    setUpdateList(e.target.value);
    console.log(e.target.value)
}

const updateListItem = (listData) => {
axios
    .put(`https://climate-change.onrender.com/list/${listData._id}`,
    {
        description: updateList
    })
    .then(()=>{
        callListData()
    })
}

useEffect(()=>{
    callListData()
},[])


return(
    <div className="flex flex-col max-w-xl p-6 bg-blue border border-azul border-8 rounded-xl">
    <div className='flex w-full justify-center'>
        <h1 className='font-bold text-xl'> Suitcase</h1>
    </div>
    
    
<div className='flex'>
    <div className='flex flex-row items-center'>
        <input 
        type="text" 
        onChange={handleNewList}
        className='flex rounded-xl px-4 h-8'
        placeholder="add new item"
        />
    
    
        <button
        className='flex items-center w-full h-8 px-2 pb-2 mt-2 text-sm font-medium rounded'
        onClick={handleNewListFormComplete}
        >
            <svg 
            class="w-5 h-5 text-gray-400 fill-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            >
                <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
			</svg>
        </button>
    </div>
</div>

    

<br/>

    <div className='flex w-full h-full'>
    <ul className='flex flex-col w-full h-full'>
    {list.map((list)=>{
        return (
        <li>
            <span className='flex  w-full mb-4 items-center'>
                {(list.complete) ?
                <input className='flex h-8 w-6 ml-3 accent-green'
                        type="checkbox" 
                        checked='true' 
                        onClick={()=>{
                            handleToggleComplete(list)
                        }}/>
                    : <input className='flex h-8 w-6 ml-3 accent-green'
                        type="checkbox"
                        onClick={()=>{
                            handleToggleComplete(list)
                        }}/>}

                {(list.complete) ? 
                <strike className='flex ml-3'>{list.description}</strike> 
                    : <p className='flex ml-3'>{list.description}</p>}
                
                <div className='flex w-full justify-end mr-3'>
                    
                    <button
                    className='bg-black hover:text-red hover:bg-black-50 text-white text-xs font-bold py-1 px-3 rounded-full '
                    onClick={()=> {
                        handleDelete(list)
                    }}>Delete</button>
                </div>

            </span>
        </li>
        
    )})}
    </ul>
    </div>
    
    </div>
    )
}
export default CreateList;