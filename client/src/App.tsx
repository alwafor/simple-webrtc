import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import NotFound404 from './pages/NotFound';
import Room from './pages/Room';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
