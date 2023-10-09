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
// ================== REFRESH PAGE ============= //
const refreshPage= ()=>{
    window.location.reload(false)
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
    <main>
    <h1>Create List</h1>
    <section>
        <form onSubmit={handleNewListFormComplete}>
            Item: <input type="text" onChange={handleNewList}/><br/>
            Packed?: <input type= "checkbox" onChange={handleNewComplete}/><br/>
            <input type="submit" value="Add To Suitcase"/>
        </form>
    </section>

    <section>
    <h2>Your Packing List </h2>
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

                        <button onClick={(event)=> {
                            handleDelete(list)
                        }}>delete</button>
                        </span>

                {/* Update if needed */}
                {/* <input type="text" onKeyUp={handleNewUpdate}/><br/> */}
                {/* <button onClick={(e)=>{
                    updateListItem(list)
                    }}>submit</button> */}
                </li>
                )
            })
        }
    </ul>
</section>



    </main>
</div>
    )
}
export default CreateList;