import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportMissing from './pages/ReportMissing';
import Cases from './pages/Cases';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cases />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/report-missing" element={<ReportMissing />} />
      </Routes>
    </Router>
  );
}

export default App;