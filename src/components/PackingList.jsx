import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PackingList = () => {
  const [lists, setLists] = useState([]);

  const allPackingItems = () => {
    axios.get('https://climate-change.onrender.com/location').then(response => {
      setLists(response.data);
      console.log(response.data);
    });
  };

  function shortCategory (category){
    let newString = ''
    let words = category.split(' ');
    newString = words[0]
    return <h2 className='text-md font-bold'>{newString}</h2>

  }

  useEffect(()=> {
    allPackingItems();
  },[]);

  return (
    <div className="flex flex-col max-w-xl p-6 bg-blue border border-darkBlue rounded-xl">

      <h1 className='text-xl font-bold'>Packing suggestions</h1>
<br/>
        {lists.map((list) => {
          return (
            <div>
              {shortCategory(list.category)}
              <ul>
                <li>{list.top}</li>
                <li>{list.bottoms}</li>
                <li>{list.shoes}</li>
                <li>{list.headgear}</li>
                <br/>
              </ul>
            </div>
        )
      })}
        </div>
  );

};

export default PackingList;