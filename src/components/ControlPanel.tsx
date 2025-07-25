import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ControlPanelProps {
  spinnerType: string;
  setSpinnerType: (type: string) => void;
  size: number;
  setSize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
}

const spinnerTypes = [
  { value: 'rotating-circle', label: 'Rotating Circle' },
  { value: 'pulsing-dots', label: 'Pulsing Dots' },
  { value: 'spinning-square', label: 'Spinning Square' },
  { value: 'bouncing-bars', label: 'Bouncing Bars' },
  { value: 'multi-ring', label: 'Multi Ring' },
  { value: 'gradient-ring', label: 'Gradient Ring' },
  { value: 'dual-ring', label: 'Dual Ring' },
  { value: 'ellipsis', label: 'Ellipsis' },
  { value: 'ripple', label: 'Ripple' },
  { value: 'heart-beat', label: 'Heart Beat' },
  { value: 'hourglass', label: 'Hourglass' },
  { value: 'fading-circle', label: 'Fading Circle' }
];

const ControlPanel: React.FC<ControlPanelProps> = ({
  spinnerType,
  setSpinnerType,
  size,
  setSize,
  speed,
  setSpeed,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  strokeWidth,
  setStrokeWidth
}) => {
  return (
    <div className="control-panel p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gradient">Customize Your Spinner</h2>
      </div>

      {/* Spinner Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Spinner Type</Label>
        <Select value={spinnerType} onValueChange={setSpinnerType}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {spinnerTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Size</Label>
          <span className="text-sm text-muted-foreground">{size}px</span>
        </div>
        <Slider
          value={[size]}
          onValueChange={(value) => setSize(value[0])}
          max={120}
          min={20}
          step={5}
          className="w-full"
        />
      </div>

      {/* Speed Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Animation Speed</Label>
          <span className="text-sm text-muted-foreground">{speed}s</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
          max={5}
          min={0.2}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Stroke Width (for circle types) */}
      {(spinnerType === 'rotating-circle' || spinnerType === 'multi-ring' || spinnerType === 'gradient-ring') && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Stroke Width</Label>
            <span className="text-sm text-muted-foreground">{strokeWidth}px</span>
          </div>
          <Slider
            value={[strokeWidth]}
            onValueChange={(value) => setStrokeWidth(value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      )}

      {/* Primary Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Primary Color</Label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
            placeholder="#8B5CF6"
          />
        </div>
      </div>

      {/* Secondary Color (for multi-color spinners) */}
      {(spinnerType === 'multi-ring' || spinnerType === 'gradient-ring') && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Secondary Color</Label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="w-12 h-12 rounded-lg border border-border cursor-pointer"
            />
            <input
              type="text"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
              placeholder="#06B6D4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;