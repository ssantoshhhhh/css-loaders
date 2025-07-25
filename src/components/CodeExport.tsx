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
}`
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
      'gradient-ring': '<div class="spinner"></div>'
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