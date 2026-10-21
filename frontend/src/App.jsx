import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportMissing from './pages/ReportMissing';
import ReportFound from './pages/ReportFound';
import Cases from './pages/Cases';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Cases />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/report-missing" element={<ReportMissing />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
