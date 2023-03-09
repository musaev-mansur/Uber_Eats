import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import './generalStyle/GeneralStyle.scss';
import Authorization from './pages/Authorization/Authorization';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path='/auth' element={<Authorization />}/>
      </Routes>
    </div>
  );
}

export default App;
