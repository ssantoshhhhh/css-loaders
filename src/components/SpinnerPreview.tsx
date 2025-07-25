import React from 'react';

interface SpinnerPreviewProps {
  type: string;
  size: number;
  speed: number;
  primaryColor: string;
  secondaryColor: string;
  strokeWidth?: number;
}

const SpinnerPreview: React.FC<SpinnerPreviewProps> = ({
  type,
  size,
  speed,
  primaryColor,
  secondaryColor,
  strokeWidth = 4
}) => {
  const animationDuration = `${speed}s`;
  
  const renderSpinner = () => {
    const commonStyle = {
      width: `${size}px`,
      height: `${size}px`,
      animationDuration
    };

    switch (type) {
      case 'rotating-circle':
        return (
          <div
            className="spinner-rotate border-4 rounded-full"
            style={{
              ...commonStyle,
              borderTopColor: primaryColor,
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              borderWidth: `${strokeWidth}px`
            }}
          />
        );

      case 'pulsing-dots':
        return (
          <div className="flex space-x-2" style={{ width: `${size}px`, height: `${size}px` }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="spinner-pulse rounded-full flex-1"
                style={{
                  backgroundColor: primaryColor,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration
                }}
              />
            ))}
          </div>
        );

      case 'spinning-square':
        return (
          <div
            className="spinner-rotate"
            style={{
              ...commonStyle,
              backgroundColor: primaryColor,
              borderRadius: '8px'
            }}
          />
        );

      case 'bouncing-bars':
        return (
          <div className="flex items-end justify-center space-x-1" style={{ width: `${size}px`, height: `${size}px` }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="spinner-bars"
                style={{
                  width: `${size / 6}px`,
                  height: `${size}px`,
                  backgroundColor: primaryColor,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration,
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>
        );

      case 'multi-ring':
        return (
          <div className="relative" style={commonStyle}>
            <div
              className="absolute inset-0 spinner-rotate border-4 rounded-full"
              style={{
                borderTopColor: primaryColor,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                borderWidth: `${strokeWidth}px`,
                animationDuration
              }}
            />
            <div
              className="absolute inset-2 spinner-rotate border-4 rounded-full"
              style={{
                borderTopColor: secondaryColor,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                borderWidth: `${strokeWidth - 1}px`,
                animationDuration: `${speed * 1.5}s`,
                animationDirection: 'reverse'
              }}
            />
          </div>
        );

      case 'gradient-ring':
        return (
          <div
            className="spinner-rotate rounded-full"
            style={{
              ...commonStyle,
              background: `conic-gradient(from 0deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
              mask: `radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), white calc(100% - ${strokeWidth}px))`,
              WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), white calc(100% - ${strokeWidth}px))`
            }}
          />
        );

      default:
        return (
          <div
            className="spinner-rotate border-4 rounded-full"
            style={{
              ...commonStyle,
              borderTopColor: primaryColor,
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              borderWidth: `${strokeWidth}px`
            }}
          />
        );
    }
  };

  return (
    <div className="preview-container rounded-xl p-8 flex items-center justify-center min-h-[300px]">
      {renderSpinner()}
    </div>
  );
};

export default SpinnerPreview;