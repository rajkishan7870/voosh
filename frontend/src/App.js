import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
