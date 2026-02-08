
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import IntroScreen from './components/IntroScreen';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('INTRO');
  const [showReplayIntro, setShowReplayIntro] = useState(false);

  useEffect(() => {
    if (appState === 'INTRO') {
      const timer = setTimeout(() => {
        setAppState('AUTH');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleLogin = () => {
    setShowReplayIntro(true);
    setTimeout(() => {
      setShowReplayIntro(false);
      setAppState('DASHBOARD');
    }, 2500);
  };

  if (appState === 'INTRO') {
    return <IntroScreen />;
  }

  if (appState === 'AUTH') {
    return (
      <>
        {showReplayIntro ? <IntroScreen isReplay /> : <AuthScreen onLogin={handleLogin} />}
      </>
    );
  }

  return <Dashboard />;
};

export default App;
