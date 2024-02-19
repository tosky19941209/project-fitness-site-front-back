import logo from './logo.svg';
import './App.css';
import './style/bootstrap/css/bootstrap.min.css'
import Test from './page/Test.js'
import Load from './component/Loading/Load.js'
import Camera from './page/camera/camera'
import Result from './page/result/result'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className='Title-style'>Fitness Exercise</p>
        <div className='App-dashboard'>
          <Camera></Camera>
          <Result></Result>
        </div>
      </header>
    </div>
  );
}

export default App;
