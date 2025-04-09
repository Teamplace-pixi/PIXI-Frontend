import './App.css';
import MyPage from './components/MyPage';
import Wiki from './components/Wiki';
import WikiNewDocs from './components/WikiNewDocs';

function App() {
  return <div className="App">{WikiNewDocs()}</div>;
}

export default App;
