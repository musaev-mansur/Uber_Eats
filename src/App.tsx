import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import './generalStyle/GeneralStyle.scss';
import Authorization from './pages/Authorization/Authorization';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<HomePage />}/>
        <Route path='/auth' element={<Authorization />}/>
      </Routes>
    </div>
  );
}

export default App;
