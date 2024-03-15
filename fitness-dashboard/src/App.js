import './App.css';
import SideBar from './component/sidebar';
import MainBox from './component/mainbox'
import React, {useState } from 'react';

function App() {
  const [mainContent, setMainContent] = useState({
    sideBar: 0,
    showSideBar:false
  })

  return (
    <div className="App">
      <header className="App-header">
        <div className='flex w-screen h-screen'>
          <SideBar mainContent={mainContent} setMainContent={setMainContent}/>
          <MainBox mainContent={mainContent} setMainContent={setMainContent}/>
        </div>
      </header>
    </div>
  );
}

export default App;
