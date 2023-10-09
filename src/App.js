import React, { useState } from 'react';
import Weather from './components/Weather';
import PackingList from './components/PackingList';
import Forecast from './components/Forecast';
import CreateList from './components/createList';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList(!showList);
  };

  return (
<>
  <div className="flex justify-center">
    <h1 className='flex text-lg font-bold'>CliMate Change</h1>
  </div>

  <div className='flex flex-row justify-around'>

  <div className='flex'>
    {/* <button onClick={toggleList}>{showList ? 'Hide Packing List Suggestions' : 'Show Packing List Suggestions'}</button> */}
        { <PackingList list={list} />}
  </div>

  <div className='flex flex-col'>
    <div className='flex justify-center h-96'>
      <Weather />
    </div>
  <br/>
    <div className='flex justify-center h-48'>
      <Forecast />
    </div>
  </div>

  <div className='flex'>
    <CreateList />
  </div>

    </div>
</>
  );
};

export default App;