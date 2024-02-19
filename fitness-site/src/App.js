import logo from './logo.svg';
import './App.css';
import Camera from './page/camera/camera'
import Result from './page/result/result'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Camera></Camera>
        <Result></Result>
      </header>
    </div>
  );
}

export default App;
