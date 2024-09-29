import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [showArrow, setShowArrow] = useState(true);
  const [showStickyElements, setShowStickyElements] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const scrollThreshold = windowHeight / 2;

      // Show sticky elements after the first section
      setShowStickyElements(currentPosition > windowHeight / 2);

      // Hide arrow after scrolling down a bit
      setShowArrow(currentPosition <= 100);

      // Determine active section
      let newActiveSection = 0;
      sectionRefs.current.forEach((section, index) => {
        if (section && currentPosition >= section.offsetTop - scrollThreshold) {
          newActiveSection = index;
        }
      });

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 500);
      }

      // Apply blur effect
      setIsBlurred(true);
      setTimeout(() => setIsBlurred(false), 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`transition-all duration-300 ${isBlurred ? 'blurred' : ''}`}>
      {/* First Section */}
      <section ref={el => sectionRefs.current[0] = el} className={`flex flex-col items-center justify-center h-screen bg-black text-white relative ${activeSection === 0 ? 'active-section' : ''} ${isFlashing && activeSection === 0 ? 'flash' : ''}`}>
        <h1 className="text-6xl font-bold">Roman Slack</h1>
        <h2 className="text-2xl mt-4">Software Developer</h2>
        {showArrow && (
          <div className="absolute bottom-10 animate-bounce">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <line x1="0" y1="0" x2="20" y2="20" stroke="white" strokeWidth="2" />
              <line x1="40" y1="0" x2="20" y2="20" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        )}
      </section>

      {/* Second Section */}
      <section ref={el => sectionRefs.current[1] = el} className={`h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 relative transition duration-1000 ease-in-out ${activeSection === 1 ? 'active-section' : ''} ${isFlashing && activeSection === 1 ? 'flash' : ''}`}>
        <div className="flex items-center justify-center h-full">
          <p className="text-4xl font-bold text-white">Welcome to my Portfolio</p>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work" ref={el => sectionRefs.current[2] = el} className={`h-screen flex items-center justify-center transition-opacity duration-500 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 ${activeSection === 2 ? 'active-section' : ''} ${isFlashing && activeSection === 2 ? 'flash' : ''}`}>
        <h2 className="text-4xl font-bold">Work Experience</h2>
      </section>

      {/* Education Section */}
      <section id="education" ref={el => sectionRefs.current[3] = el} className={`h-screen flex items-center justify-center  transition-opacity duration-500 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 ${activeSection === 3 ? 'active-section' : ''} ${isFlashing && activeSection === 3 ? 'flash' : '' }`}>
        <h2 className="text-4xl font-bold">Education</h2>
      </section>

      {/* Project Experience Section */}
      <section id="projects" ref={el => sectionRefs.current[4] = el} className={`h-screen flex items-center transition-opacity duration-500 justify-center bg-blue-400 ${activeSection === 4 ? 'active-section' : ''} ${isFlashing && activeSection === 4 ? 'flash' : ''}`}>
        <h2 className="text-4xl font-bold">Project Experience</h2>
      </section>




      {/* Bubble Navigation and Contact Button */}
      {showStickyElements && (
        <>
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 transition-opacity duration-500 ease-in-out ${showStickyElements ? 'opacity-100' : 'opacity-0'}`}>
  <div className="w-20 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-300" onClick={() => scrollToSection('work')}>
    <span className="text-white text-sm hover:text-black">Work</span>
  </div>
  <div className="w-20 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-300" onClick={() => scrollToSection('education')}>
    <span className="text-white text-sm hover:text-black">Education</span>
  </div>
  <div className="w-20 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-300" onClick={() => scrollToSection('projects')}>
    <span className="text-white text-sm hover:text-black">Projects</span>
  </div>

  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
    Contact Me
  </button>
</div>

        </>
      )}
    </div>
  );
}

export default App;
