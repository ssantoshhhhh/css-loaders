import React, { useState } from 'react';
import { Settings, Code, Palette, Github } from 'lucide-react';
import SpinnerPreview from '@/components/SpinnerPreview';
import ControlPanel from '@/components/ControlPanel';
import CodeExport from '@/components/CodeExport';

const Index = () => {
  const [spinnerType, setSpinnerType] = useState('rotating-circle');
  const [size, setSize] = useState(60);
  const [speed, setSpeed] = useState(1);
  const [primaryColor, setPrimaryColor] = useState('#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState('#06B6D4');
  const [strokeWidth, setStrokeWidth] = useState(4);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/CSS1.png" alt="CSS Logo" className="h-10 w-10 object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-gradient">Spinner Generator</h1>
                <p className="text-sm text-muted-foreground">Create beautiful CSS loading spinners</p>
              </div>
            </div>
            
            {/* Center GitHub Icon */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <a
                href="https://github.com/ssantoshhhhh/css-loaders.git"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6 animate-spin group-hover:animate-none" />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Code className="h-4 w-4" />
              <span>Pure HTML 5 & CSS 3 • No JavaScript</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ControlPanel
                spinnerType={spinnerType}
                setSpinnerType={setSpinnerType}
                size={size}
                setSize={setSize}
                speed={speed}
                setSpeed={setSpeed}
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
                secondaryColor={secondaryColor}
                setSecondaryColor={setSecondaryColor}
                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
              />
            </div>
          </div>

          {/* Right Panel - Preview and Code */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preview Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Palette className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Live Preview</h2>
              </div>
              <SpinnerPreview
                type={spinnerType}
                size={size}
                speed={speed}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                strokeWidth={strokeWidth}
              />
            </div>

            {/* Code Export Section */}
            <div className="control-panel p-6">
              <CodeExport
                spinnerType={spinnerType}
                size={size}
                speed={speed}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                strokeWidth={strokeWidth}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <p>Build amazing loading experiences with pure CSS animations</p>
            <p className="mt-2">All spinners are framework-agnostic and work everywhere</p>
            <p className="mt-4">
              Made by{' '}
              <a
                href="https://santosh-galaxy-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                SANTOSH
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
