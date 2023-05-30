import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './user/Register';
import Login from './user/Login';
import Kucing from './kucing/Kucing';

function App() {
  return (
    <Routes>
      <Route path="/kucing" element={<Kucing />} />
      <Route path='/' element={<Register />}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  );
}

export default App;
