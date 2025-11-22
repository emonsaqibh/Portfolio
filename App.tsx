import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Approach } from './components/Approach';
import { SelectedWorks } from './components/SelectedWorks';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { ProjectDetails } from './components/ProjectDetails';
import { About } from './components/About';
import { Works } from './components/Works';
import { Project } from './types';

type ViewState = 'home' | 'about' | 'project' | 'works';
type Theme = 'dark' | 'light';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Sync class with state
  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = (e?: React.MouseEvent) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Helper to update state and storage
    const updateThemeState = () => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // If View Transitions API is not supported or no event provided, just toggle
    if (!(document as any).startViewTransition || !e) {
        updateThemeState();
        return;
    }

    // Get click coordinates for the ripple effect
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
        updateThemeState();
    });

    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        
        // Animate the new view growing from the click point
        document.documentElement.animate(
            {
                clipPath: clipPath,
            },
            {
                duration: 700,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView('project');
  };

  const handleNavigate = (targetView: 'home' | 'about') => {
    setView(targetView);
    if (targetView === 'home') {
      setSelectedProject(null);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[#fafafa] dark:bg-[#0a0a0a] text-[#111] dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {view === 'home' && (
        <Navigation 
          onNavigate={handleNavigate} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}

      <AnimatePresence mode="wait">
        {view === 'project' && selectedProject && (
          <ProjectDetails 
            key="project-details" 
            project={selectedProject} 
            onBack={() => setView('works')} 
          />
        )}

        {view === 'about' && (
          <About key="about-page" onBack={() => handleNavigate('home')} />
        )}

        {view === 'works' && (
          <Works 
            key="works-page" 
            onBack={() => handleNavigate('home')} 
            onProjectClick={handleProjectClick}
          />
        )}

        {view === 'home' && (
          <div key="home-content">
            <main>
              <Hero />
              <Philosophy />
              <Approach />
              <SelectedWorks 
                onProjectClick={handleProjectClick} 
                onViewAll={() => setView('works')}
              />
              <Services />
              <Contact />
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}