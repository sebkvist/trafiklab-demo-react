import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello.js';
import TrafikLab from './components/TrafikLab';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello />
        <TrafikLab />
      </header>
    </div>
  );
}

export default App;
