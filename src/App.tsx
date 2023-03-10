import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import './generalStyle/GeneralStyle.scss';
import HomePage from './pages/HomePage/HomePage';
import SignIn from './pages/SignIn/SignIn';
import SignUpCafe from './pages/SignUpCafe/SignUpCafe';
import SignUpClient from './pages/SignUpClient/SignUpClient';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<HomePage />}/>
        <Route path='/client/sign-up' element={ <SignUpClient />}/>
        <Route path='/cafe/sign-up' element={ <SignUpCafe />}/>
        <Route path='/sign-in' element={ <SignIn />}/>
      </Routes>
    </div>
  );
}

export default App;
