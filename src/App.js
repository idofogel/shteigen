import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Backgrnd from './backgrnd';
import MemHir from './change_hirarchy';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Backgrnd />} />
      <Route path="/change_hir" element={<MemHir />} />
    </Routes>
  );
}

export default App;
