import React, { useState, useEffect } from 'react';
import { BackgroundGlow } from './components/BackgroundGlow';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { DeveloperJourney } from './components/DeveloperJourney';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { GitHubActivity } from './components/GitHubActivity';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandCenter } from './components/CommandCenter';
import { RecruiterModal } from './components/RecruiterModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ReadmeGeneratorModal } from './components/ReadmeGeneratorModal';
import { ScrollReveal } from './components/ScrollReveal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { AnalyticsEvents } from './utils/firebaseAnalytics';
import { Sparkles } from 'lucide-react';

export function PortfolioContent() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [isRecruiterViewOpen, setIsRecruiterViewOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [readmeProjectId, setReadmeProjectId] = useState<string | null>(null);

  // Global keyboard shortcut for Command Center (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandCenterOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSelectProjectFromCommand = (projectId: string) => {
    setSelectedProjectId(projectId);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenReadme = (projectId?: string) => {
    setReadmeProjectId(projectId || null);
    setIsReadmeOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 relative selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-200 transition-colors duration-200">
      {/* Slim color-changing top scroll progress bar */}
      <ScrollProgressBar />

      {/* Ambient background gradients and technical mesh */}
      <BackgroundGlow />

      {/* Sticky top navigation bar with dark/light mode toggle */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandCenter={() => setIsCommandCenterOpen(true)}
        onOpenRecruiterView={() => setIsRecruiterViewOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      {/* Main content flow with scroll-reveal animations */}
      <main className="relative z-10">
        <ScrollReveal options={{ distance: 20, duration: 0.7, amount: 0.05 }}>
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenCommandCenter={() => setIsCommandCenterOpen(true)}
            onOpenRecruiterView={() => setIsRecruiterViewOpen(true)}
          />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <About />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <Skills />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <Experience />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <Projects
            externalSelectedProjectId={selectedProjectId}
            onClearExternalSelectedProject={() => setSelectedProjectId(null)}
            externalOpenArchitecture={isArchitectureOpen}
            onClearExternalOpenArchitecture={() => setIsArchitectureOpen(false)}
            onOpenReadmeGenerator={handleOpenReadme}
          />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <DeveloperJourney />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <Certifications />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <Education />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <GitHubActivity />
        </ScrollReveal>

        <ScrollReveal options={{ distance: 28, duration: 0.6, amount: 0.1 }}>
          <Contact />
        </ScrollReveal>
      </main>

      {/* Professional footer */}
      <Footer />

      {/* Floating Action Button for AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            AnalyticsEvents.trackAskAIAssistantClicked();
            setIsAIAssistantOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-xs shadow-xl shadow-indigo-950/60 border border-indigo-400/30 transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
          aria-label="Open AI Portfolio Assistant"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Ask AI Assistant</span>
        </button>
      </div>

      {/* Interactive Curriculum Vitae & Resume modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Developer Command Centre (Cmd+K / Search) */}
      <CommandCenter
        isOpen={isCommandCenterOpen}
        onClose={() => setIsCommandCenterOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenRecruiterView={() => setIsRecruiterViewOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        onOpenArchitectureExplorer={() => setIsArchitectureOpen(true)}
        onOpenReadmeGenerator={handleOpenReadme}
        onSelectProject={handleSelectProjectFromCommand}
      />

      {/* Professional README.md Generator Modal */}
      <ReadmeGeneratorModal
        isOpen={isReadmeOpen}
        onClose={() => {
          setIsReadmeOpen(false);
          setReadmeProjectId(null);
        }}
        initialProjectId={readmeProjectId}
      />

      {/* Recruiter Quick View Modal */}
      <RecruiterModal
        isOpen={isRecruiterViewOpen}
        onClose={() => setIsRecruiterViewOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* AI Portfolio Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onSelectProject={handleSelectProjectFromCommand}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PortfolioContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
