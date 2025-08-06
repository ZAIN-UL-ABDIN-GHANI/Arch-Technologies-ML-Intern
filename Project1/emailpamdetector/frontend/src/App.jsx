// App.jsx
import React from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import SpamDetector from './pages/SpamDetector';
import Header from './components/Navbar'
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({ duration: 200 });
  }, []);

  return (
    <div className="bg-[#FFE0F7] text-gray-900">
      <Header/>
      <main>
      
           <SpamDetector/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
