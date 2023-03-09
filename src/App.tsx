import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import './generalStyle/GeneralStyle.scss';
import Registration from './pages/Authorization/Registration';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<HomePage />}/>
        <Route path='/sign-up' element={<Registration />}/>
      </Routes>
    </div>
  );
}

export default App;
