import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Notices from './pages/Notices';
import Contact from './pages/Contact';
import Enquiry from './pages/Enquiry';
import TeacherLogin from './pages/TeacherLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="academics" element={<Academics />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="notices" element={<Notices />} />
            <Route path="contact" element={<Contact />} />
            <Route path="enquiry" element={<Enquiry />} />
          </Route>
        </Routes>
        <Toaster position="top-right" richColors />
      </Router>
    </AuthProvider>
  );
}

export default App;