import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeExportProps {
  spinnerType: string;
  size: number;
  speed: number;
  primaryColor: string;
  secondaryColor: string;
  strokeWidth: number;
}

const CodeExport: React.FC<CodeExportProps> = ({
  spinnerType,
  size,
  speed,
  primaryColor,
  secondaryColor,
  strokeWidth
}) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const { toast } = useToast();

  const generateCSS = () => {
    const animations = {
      'rotating-circle': `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: ${size}px;
  height: ${size}px;
  border: ${strokeWidth}px solid transparent;
  border-top-color: ${primaryColor};
  border-radius: 50%;
  animation: spin ${speed}s linear infinite;
}`,
      'pulsing-dots': `
@keyframes pulse {
  0%, 80%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  40% { 
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.spinner {
  display: flex;
  gap: 8px;
  width: ${size}px;
  height: ${size}px;
}

.spinner div {
  flex: 1;
  height: 100%;
  background-color: ${primaryColor};
  border-radius: 50%;
  animation: pulse ${speed}s ease-in-out infinite;
}

.spinner div:nth-child(2) { animation-delay: 0.15s; }
.spinner div:nth-child(3) { animation-delay: 0.3s; }`,
      'spinning-square': `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: ${size}px;
  height: ${size}px;
  background-color: ${primaryColor};
  border-radius: 8px;
  animation: spin ${speed}s linear infinite;
}`,
      'bouncing-bars': `
@keyframes bars {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
  }
  20% { 
    transform: scaleY(1.0);
  }
}

.spinner {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  width: ${size}px;
  height: ${size}px;
}

.spinner div {
  width: ${Math.floor(size / 6)}px;
  height: ${size}px;
  background-color: ${primaryColor};
  border-radius: 2px;
  animation: bars ${speed}s ease-in-out infinite;
}

.spinner div:nth-child(2) { animation-delay: 0.1s; }
.spinner div:nth-child(3) { animation-delay: 0.2s; }
.spinner div:nth-child(4) { animation-delay: 0.3s; }`,
      'multi-ring': `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  position: relative;
  width: ${size}px;
  height: ${size}px;
}

.spinner::before {
  content: '';
  position: absolute;
  inset: 0;
  border: ${strokeWidth}px solid transparent;
  border-top-color: ${primaryColor};
  border-radius: 50%;
  animation: spin ${speed}s linear infinite;
}

.spinner::after {
  content: '';
  position: absolute;
  inset: 8px;
  border: ${strokeWidth - 1}px solid transparent;
  border-top-color: ${secondaryColor};
  border-radius: 50%;
  animation: spin ${speed * 1.5}s linear infinite reverse;
}`,
      'gradient-ring': `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, ${primaryColor}, ${secondaryColor}, ${primaryColor});
  mask: radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), white calc(100% - ${strokeWidth}px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), white calc(100% - ${strokeWidth}px));
  animation: spin ${speed}s linear infinite;
}`,
      'dual-ring': `
@keyframes dual-ring {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.spinner {
  display: inline-block;
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  border: ${strokeWidth}px solid ${primaryColor};
  border-color: ${primaryColor} transparent ${secondaryColor} transparent;
  animation: dual-ring ${speed}s linear infinite;
}`,
      'ellipsis': `
@keyframes ellipsis {
  0%, 100% { transform: scale(0.7); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${Math.floor(size/4)}px;
}
.spinner div {
  display: inline-block;
  width: ${Math.floor(size/6)}px;
  height: ${Math.floor(size/6)}px;
  margin: 0 3px;
  border-radius: 50%;
  background: ${primaryColor};
  animation: ellipsis ${speed}s infinite;
}
.spinner div:nth-child(1) { animation-delay: 0s; }
.spinner div:nth-child(2) { animation-delay: 0.2s; }
.spinner div:nth-child(3) { animation-delay: 0.4s; }
.spinner div:nth-child(4) { animation-delay: 0.6s; }`,
      'ripple': `
@keyframes ripple {
  0% { top: ${Math.floor(size/2)}px; left: ${Math.floor(size/2)}px; width: 0; height: 0; opacity: 1; }
  100% { top: 0px; left: 0px; width: ${size-8}px; height: ${size-8}px; opacity: 0; }
}
.spinner {
  position: relative;
  width: ${size}px;
  height: ${size}px;
}
.spinner div {
  position: absolute;
  border: 4px solid ${primaryColor};
  opacity: 1;
  border-radius: 50%;
  animation: ripple ${speed}s cubic-bezier(0,0.2,0.8,1) infinite;
}
.spinner div:nth-child(2) {
  animation-delay: -${speed/2}s;
}`,
      'heart-beat': `
@keyframes heart-beat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: heart-beat ${speed}s infinite;
}
.spinner svg path {
  fill: ${primaryColor};
}`,
      'hourglass': `
@keyframes hourglass {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.spinner {
  display: inline-block;
  width: ${size}px;
  height: ${size}px;
  border: ${strokeWidth}px solid ${primaryColor};
  border-radius: 50%;
  border-top: ${strokeWidth}px solid transparent;
  border-bottom: ${strokeWidth}px solid transparent;
  animation: hourglass ${speed}s linear infinite;
}`,
      'fading-circle': `
@keyframes fading-circle {
  0%, 39%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}
.spinner {
  position: relative;
  width: ${size}px;
  height: ${size}px;
}
.spinner div {
  position: absolute;
  width: ${Math.floor(size/5)}px;
  height: ${Math.floor(size/5)}px;
  border-radius: 50%;
  background: ${primaryColor};
  animation: fading-circle ${speed}s linear infinite;
}
.spinner div:nth-child(1) { top: 0; left: ${Math.floor(size/2.5)}px; animation-delay: 0s; }
.spinner div:nth-child(2) { top: ${Math.floor(size*0.09)}px; left: ${Math.floor(size*0.7)}px; animation-delay: -0.1s; }
.spinner div:nth-child(3) { top: ${Math.floor(size*0.31)}px; left: ${Math.floor(size*0.9)}px; animation-delay: -0.2s; }
.spinner div:nth-child(4) { top: ${Math.floor(size*0.59)}px; left: ${Math.floor(size*0.8)}px; animation-delay: -0.3s; }
.spinner div:nth-child(5) { top: ${Math.floor(size*0.81)}px; left: ${Math.floor(size*0.59)}px; animation-delay: -0.4s; }
.spinner div:nth-child(6) { top: ${Math.floor(size*0.9)}px; left: ${Math.floor(size*0.31)}px; animation-delay: -0.5s; }
.spinner div:nth-child(7) { top: ${Math.floor(size*0.81)}px; left: ${Math.floor(size*0.09)}px; animation-delay: -0.6s; }
.spinner div:nth-child(8) { top: ${Math.floor(size*0.59)}px; left: 0; animation-delay: -0.7s; }
.spinner div:nth-child(9) { top: ${Math.floor(size*0.31)}px; left: 0; animation-delay: -0.8s; }
.spinner div:nth-child(10) { top: ${Math.floor(size*0.09)}px; left: ${Math.floor(size*0.09)}px; animation-delay: -0.9s; }
.spinner div:nth-child(11) { top: 0; left: ${Math.floor(size*0.31)}px; animation-delay: -1.0s; }
.spinner div:nth-child(12) { top: 0; left: ${Math.floor(size*0.59)}px; animation-delay: -1.1s; }`,
      'loading-text': `
@keyframes loading-text {
  0% { content: "L O A D I N G"; }
  25% { content: "L O A D I N G."; }
  50% { content: "L O A D I N G.."; }
  75% { content: "L O A D I N G..."; }
  100% { content: "L O A D I N G"; }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  animation: loading-text ${speed}s infinite;
}`,
      'loading-text-glitch': `
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}
@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(-2px, 2px); }
}
@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}
.spinner {
  position: relative;
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  animation: glitch ${speed}s infinite;
}
.spinner::before,
.spinner::after {
  content: "L O A D I N G";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.spinner::before {
  animation: glitch-1 0.5s infinite;
  color: #ff0000;
  z-index: -1;
}
.spinner::after {
  animation: glitch-2 0.5s infinite;
  color: #00ffff;
  z-index: -2;
}`,
      'loading-text-rainbow': `
@keyframes rainbow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  background: linear-gradient(45deg, ${primaryColor}, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rainbow ${speed}s ease-in-out infinite;
}`,
      'loading-text-bounce': `
@keyframes text-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  animation: text-bounce ${speed}s ease-in-out infinite;
}`,
      'loading-text-typing': `
@keyframes typing {
  0%, 90%, 100% { width: 0; }
  30%, 60% { width: 100%; }
}
@keyframes blink {
  0%, 50% { border-color: transparent; }
  51%, 100% { border-color: currentColor; }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  overflow: hidden;
  border-right: 2px solid;
  white-space: nowrap;
  animation: typing ${speed * 3}s steps(8) infinite, blink 1s infinite;
}`,
      'loading-text-matrix': `
@keyframes matrix {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  text-shadow: 0 0 10px ${primaryColor};
  animation: matrix ${speed}s infinite;
}`,
      'loading-text-neon': `
@keyframes neon {
  0% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor; }
  100% { text-shadow: 0 0 2px currentColor, 0 0 4px currentColor, 0 0 6px currentColor, 0 0 8px currentColor; }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
  animation: neon ${speed}s ease-in-out infinite alternate;
}`,
      'loading-text-shake': `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  animation: shake ${speed}s ease-in-out infinite;
}`,
      'loading-text-zoom': `
@keyframes text-zoom {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
.spinner {
  display: inline-block;
  font-family: monospace;
  font-weight: bold;
  font-size: ${Math.floor(size/4)}px;
  color: ${primaryColor};
  animation: text-zoom ${speed}s ease-in-out infinite;
}`,
      'progress-bar': `
@keyframes progress-bar {
  0% { left: -30%; }
  100% { left: 100%; }
}
.spinner {
  width: ${size}px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.spinner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background: ${primaryColor};
  border-radius: 4px;
  animation: progress-bar ${speed}s ease-in-out infinite;
}`,
      'progress-dots': `
@keyframes progress-dots {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
.spinner {
  display: flex;
  gap: 8px;
}
.spinner div {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${primaryColor};
  animation: progress-dots ${speed}s ease-in-out infinite both;
}
.spinner div:nth-child(1) { animation-delay: -0.32s; }
.spinner div:nth-child(2) { animation-delay: -0.16s; }
.spinner div:nth-child(3) { animation-delay: 0s; }`,
      'progress-steps': `
@keyframes progress-steps {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}
.spinner {
  display: flex;
  gap: 4px;
}
.spinner div {
  width: 8px;
  height: 20px;
  background: ${primaryColor};
  border-radius: 2px;
  animation: progress-steps ${speed}s ease-in-out infinite;
}
.spinner div:nth-child(1) { animation-delay: 0s; }
.spinner div:nth-child(2) { animation-delay: 0.1s; }
.spinner div:nth-child(3) { animation-delay: 0.2s; }
.spinner div:nth-child(4) { animation-delay: 0.3s; }
.spinner div:nth-child(5) { animation-delay: 0.4s; }`,
      'loading-dots': `
@keyframes loading-dots {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}
.spinner {
  display: flex;
  gap: 6px;
}
.spinner div {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${primaryColor};
  animation: loading-dots ${speed}s ease-in-out infinite both;
}
.spinner div:nth-child(1) { animation-delay: -0.32s; }
.spinner div:nth-child(2) { animation-delay: -0.16s; }
.spinner div:nth-child(3) { animation-delay: 0s; }`,
      'loading-bars': `
@keyframes loading-bars {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}
.spinner {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: ${size}px;
}
.spinner div {
  width: 4px;
  background: ${primaryColor};
  border-radius: 2px;
  animation: loading-bars ${speed}s ease-in-out infinite;
}
.spinner div:nth-child(1) { height: ${Math.floor(size*0.3)}px; animation-delay: 0s; }
.spinner div:nth-child(2) { height: ${Math.floor(size*0.6)}px; animation-delay: 0.1s; }
.spinner div:nth-child(3) { height: ${size}px; animation-delay: 0.2s; }
.spinner div:nth-child(4) { height: ${Math.floor(size*0.6)}px; animation-delay: 0.3s; }
.spinner div:nth-child(5) { height: ${Math.floor(size*0.3)}px; animation-delay: 0.4s; }`,
      'loading-pulse': `
@keyframes loading-pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}
.spinner {
  display: inline-block;
  width: ${Math.floor(size/3)}px;
  height: ${Math.floor(size/3)}px;
  border-radius: 50%;
  background: ${primaryColor};
  animation: loading-pulse ${speed}s ease-in-out infinite;
}`,
      'loading-wave': `
@keyframes loading-wave {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}
.spinner {
  display: flex;
  gap: 4px;
  height: ${size}px;
}
.spinner div {
  width: 4px;
  background: ${primaryColor};
  border-radius: 2px;
  animation: loading-wave ${speed}s ease-in-out infinite;
}
.spinner div:nth-child(1) { height: ${Math.floor(size*0.3)}px; animation-delay: 0s; }
.spinner div:nth-child(2) { height: ${Math.floor(size*0.6)}px; animation-delay: 0.1s; }
.spinner div:nth-child(3) { height: ${size}px; animation-delay: 0.2s; }
.spinner div:nth-child(4) { height: ${Math.floor(size*0.6)}px; animation-delay: 0.3s; }
.spinner div:nth-child(5) { height: ${Math.floor(size*0.3)}px; animation-delay: 0.4s; }`
    };

    return animations[spinnerType as keyof typeof animations] || animations['rotating-circle'];
  };

  const generateHTML = () => {
    const htmlStructures = {
      'rotating-circle': '<div class="spinner"></div>',
      'pulsing-dots': `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
</div>`,
      'spinning-square': '<div class="spinner"></div>',
      'bouncing-bars': `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`,
      'multi-ring': '<div class="spinner"></div>',
      'gradient-ring': '<div class="spinner"></div>',
      'dual-ring': '<div class="spinner"></div>',
      'ellipsis': `<div class="spinner"><div></div><div></div><div></div><div></div></div>`,
      'ripple': `<div class="spinner"><div></div><div></div></div>`,
      'heart-beat': `<div class="spinner"><svg viewBox="0 0 32 29.6"><path d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,6.1,5.5,11.1,13.8,18.3l2.2,2l2.2-2C26.5,21.5,32,16.5,32,10.4C32,4.7,27.3,0,23.6,0z"></path></svg></div>`,
      'hourglass': '<div class="spinner"></div>',
      'fading-circle': `<div class="spinner">${Array.from({length:12}).map(()=>'<div></div>').join('')}</div>`,
      'loading-text': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-glitch': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-rainbow': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-bounce': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-typing': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-matrix': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-neon': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-shake': `<div class="spinner">L O A D I N G</div>`,
      'loading-text-zoom': `<div class="spinner">L O A D I N G</div>`,
      'progress-bar': `<div class="spinner"><div></div></div>`,
      'progress-dots': `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
</div>`,
      'progress-steps': `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`,
      'loading-dots': `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
</div>`,
      'loading-bars': `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`,
      'loading-pulse': `<div class="spinner"></div>`,
      'loading-wave': `<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`
    };

    return htmlStructures[spinnerType as keyof typeof htmlStructures] || htmlStructures['rotating-circle'];
  };

  const copyToClipboard = async (text: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tab);
      toast({
        title: "Copied to clipboard!",
        description: `${tab.toUpperCase()} code has been copied.`,
      });
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Export Code</h3>
      </div>

      <Tabs defaultValue="html" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
        </TabsList>

        <TabsContent value="html" className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">HTML Structure</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(generateHTML(), 'html')}
              className="flex items-center gap-2"
            >
              {copiedTab === 'html' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copiedTab === 'html' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="code-block p-4 rounded-lg text-sm overflow-x-auto">
            <code>{generateHTML()}</code>
          </pre>
        </TabsContent>

        <TabsContent value="css" className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">CSS Styles</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(generateCSS(), 'css')}
              className="flex items-center gap-2"
            >
              {copiedTab === 'css' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copiedTab === 'css' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="code-block p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
            <code>{generateCSS()}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeExport;