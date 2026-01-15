
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import AnniversaryView from './components/AnniversaryView';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import DatePlanner from './components/DatePlanner';
import MemoryVault from './components/MemoryVault';
import RelationshipCoach from './components/RelationshipCoach';
import LoveLetterGenerator from './components/LoveLetterGenerator';
import { AppSection } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<'login' | 'anniversary' | 'dashboard'>('login');
  const [activeSection, setActiveSection] = useState<AppSection>('home');

  const handleLogin = () => {
    setStep('anniversary');
  };

  const handleContinue = () => {
    setStep('dashboard');
  };

  if (step === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (step === 'anniversary') {
    return <AnniversaryView onContinue={handleContinue} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <HomeView />;
      case 'dates': return <DatePlanner />;
      case 'memories': return <MemoryVault />;
      case 'chat': return <RelationshipCoach />;
      case 'letters': return <LoveLetterGenerator />;
      default: return <HomeView />;
    }
  };

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </Layout>
  );
};

export default App;
