import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './domains/Layout/Layout';
import Home from './domains/Home/HomePage';
import Hotel from './domains/Hotel/HotelPage';
import RoomPage from './domains/Room/RoomPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/hotels" element={<Hotel />}></Route>
          <Route path="/rooms" element={<RoomPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
