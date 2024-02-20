import logo from './logo.svg';
import './App.css';
import './style/bootstrap/css/bootstrap.min.css'
// import Test from './page/Test.js'
import Load from './component/Loading/Load.js'
import Camera from './page/camera/camera'
import Result from './page/result/result'
import { useEffect, useState } from 'react';
function App() {
  const [stateResultData, setStateResultData] = useState({
    btnStateStart: false,
    kind_exercise: {
      category: '',
      exercise: ''
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <p className='Title-style'>Fitness Exercise</p>
        <div className='App-dashboard'>
          {/* <Test></Test> */}
          <Camera setStateResultData={setStateResultData} stateResultData={stateResultData} ></Camera>
          <Result setStateResultData={setStateResultData} stateResultData={stateResultData}></Result>
        </div>
      </header>
    </div>
  );
}

export default App;
