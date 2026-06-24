import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="flex items-center justify-center min-h-screen"><p className="text-slate-500">Loading To-Do App...</p></div>} />
      </Routes>
    </BrowserRouter>
  );
}
