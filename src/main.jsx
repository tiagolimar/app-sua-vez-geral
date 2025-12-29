import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.jsx'
import Venda from './page/Venda.jsx';
import './main.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/venda" element={<Venda />} />
    </Routes>
  </BrowserRouter>
);
