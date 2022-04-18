import logo from './logo.svg';
import './App.css';
import Table from './page/tables';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './page/Login';
import TimeKeep from './page/TimeKeep';
import Checkin from './page/Checkin';
import DetailTimeKeep from './page/DetailTImeKeep';
import Approve from './page/Approve';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/staffs" element={<Table />} />
          <Route path='/timekeep' element={<TimeKeep />} />
          <Route path='/checkin' element={<Checkin />} />
          <Route path='/detailTimeKeep' element={<DetailTimeKeep />} />
          <Route path='/approve' element={<Approve />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
