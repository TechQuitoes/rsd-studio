import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Studio from './pages/Studio';
import Journal from './pages/Journal';
import Contact from './pages/Contact';
import Project from './pages/Project';

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}