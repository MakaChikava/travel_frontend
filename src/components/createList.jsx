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
    <div className="flex flex-col max-w-xl p-6 bg-blue border border-darkBlue rounded-xl">
    <div className='flex w-full justify-center'>
        <h1 className='font-bold'>Create List</h1>
    </div>
    
    
<div className='flex'>
    <div className='flex flex-row items-center'>
        <input 
        type="text" 
        onChange={handleNewList}
        className='flex rounded-xl px-4 h-8'
        placeholder="add a new task"
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

    <div className='flex flex-col justify-center'>
    <ul>
    {list.map((list)=>{
        return (
        <li>
            <span>
                {(list.complete) ?
                <input type="checkbox" 
                        checked 
                        onClick={()=>{
                            handleToggleComplete(list)
                        }}/>
                    : <input className='rounded'
                        type="checkbox" 
                        onClick={()=>{
                            handleToggleComplete(list)
                        }}/>}

                {(list.complete) ? 
                <strike>{list.description}</strike> 
                    : list.description}
                    <button onClick={()=> {
                        handleDelete(list)
                    }}>delete</button>
            </span>
        </li>
    )})}
    </ul>
    </div>
    
    </div>
    )
}
export default CreateList;