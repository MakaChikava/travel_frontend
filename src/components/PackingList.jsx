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

  const deleteItem = (id) => {
    axios.delete(`https://climate-change.onrender.com/location/${id}`).then(()=> {
      axios.get('https://climate-change.onrender.com/location').then((response) => {
        setLists(response.data);
      });
    });
  };

  useEffect(()=> {
    allPackingItems();
  },[]);

  return (
    <div className="flex flex-col max-w-xl p-6 bg-blue border border-darkBlue rounded-xl">
    <h2>Packing List</h2>
      {lists.map((list) => {
        return (
          <div>
            <h3>{list.category}</h3>
            <p>{list.top}</p>
            <p>{list.bottoms}</p>
            <p>{list.shoes}</p>
            <p>{list.headgear}</p>
            <p>{list.accessories}</p>
          </div>
        )
      })}
        </div>
  );

};

export default PackingList;