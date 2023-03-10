import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import './generalStyle/GeneralStyle.scss';
import Registration from './pages/Authorization/Registration';
import HomePage from './pages/HomePage/HomePage';
import Delivery from './components/Delivery/Delivery';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<HomePage />}/>
        <Route path='/sign-up' element={<Registration />}/>
        <Route path='/delivery' element={<Delivery />}/>
      </Routes>
    </div>
  );
}

export default App;
