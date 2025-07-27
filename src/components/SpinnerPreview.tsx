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

      case 'dual-ring':
        return (
          <div
            className="spinner-dual-ring"
            style={{
              ...commonStyle,
              borderWidth: `${strokeWidth}px`,
              borderColor: `${primaryColor} transparent ${secondaryColor} transparent`,
            }}
          />
        );
      case 'ellipsis': {
        const dotSize = size / 6;
        return (
          <div className="spinner-ellipsis" style={{ width: `${size}px`, height: `${dotSize * 1.5}px` }}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  width: `${dotSize}px`,
                  height: `${dotSize}px`,
                  margin: `0 ${dotSize / 4}px`,
                  background: primaryColor,
                }}
              />
            ))}
          </div>
        );
      }
      case 'ripple': {
        const border = Math.max(2, strokeWidth);
        return (
          <div className="spinner-ripple" style={{ ...commonStyle }}>
            <div style={{ borderWidth: `${border}px`, borderColor: primaryColor, width: '100%', height: '100%' }} />
            <div style={{ borderWidth: `${border}px`, borderColor: secondaryColor, width: '100%', height: '100%' }} />
          </div>
        );
      }
      case 'heart-beat':
        return (
          <div className="spinner-heart-beat" style={{ ...commonStyle }}>
            <svg viewBox="0 0 32 29.6" width={size} height={size} style={{ display: 'block' }}>
              <path d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,6.1,5.5,11.1,13.8,18.3l2.2,2l2.2-2 C26.5,21.5,32,16.5,32,10.4C32,4.7,27.3,0,23.6,0z" fill={primaryColor} />
            </svg>
          </div>
        );
      case 'hourglass':
        return (
          <div
            className="spinner-hourglass"
            style={{
              width: `${size}px`,
              height: `${size * 1.4}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width={size}
              height={size * 1.4}
              viewBox="0 0 40 56"
              style={{ display: 'block' }}
            >
              {/* Hourglass outline */}
              <path
                d="M10,2 Q20,28 10,54 M30,2 Q20,28 30,54 M10,2 H30 M10,54 H30"
                fill="none"
                stroke={primaryColor}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
              {/* Animated sand dot */}
              <circle
                cx="20"
                r="2.5"
                fill={primaryColor}
              >
                <animate
                  attributeName="cy"
                  values="12;44;12"
                  keyTimes="0;0.5;1"
                  dur={`${speed}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        );
      case 'fading-circle': {
        const dotCount = 12;
        const dots = Array.from({ length: dotCount });
        const r = size / 2 - size / 10;
        const dotSize = size / 5;
        return (
          <div className="spinner-fading-circle" style={{ width: `${size}px`, height: `${size}px` }}>
            {dots.map((_, i) => {
              const angle = (i * 360) / dotCount;
              const rad = (angle * Math.PI) / 180;
              const x = r * Math.cos(rad) + size / 2 - dotSize / 2;
              const y = r * Math.sin(rad) + size / 2 - dotSize / 2;
              return (
                <div
                  key={i}
                  style={{
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    left: `${x}px`,
                    top: `${y}px`,
                    background: primaryColor,
                  }}
                />
              );
            })}
          </div>
        );
      }
      case 'loading-text':
        return (
          <div
            className="spinner-loading-text"
            style={{
              color: primaryColor,
              fontSize: `${size / 4}px`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-glitch':
        return (
          <div
            className="spinner-loading-text-glitch"
            style={{
              color: primaryColor,
              fontSize: `${size / 4}px`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-rainbow':
        return (
          <div
            className="spinner-loading-text-rainbow"
            style={{
              fontSize: `${size / 4}px`,
              '--primary-color': primaryColor,
            } as React.CSSProperties}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-bounce':
        return (
          <div
            className="spinner-loading-text-bounce"
            style={{
              color: primaryColor,
              fontSize: `${size / 4}px`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-typing':
        return (
          <div
            className="spinner-loading-text-typing"
            style={{
              color: primaryColor,
              fontSize: `${size / 4}px`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-matrix':
        return (
          <div
            className="spinner-loading-text-matrix"
            style={{
              fontSize: `${size / 4}px`,
              color: primaryColor,
              textShadow: `0 0 10px ${primaryColor}`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-neon':
        return (
          <div
            className="spinner-loading-text-neon"
            style={{
              color: primaryColor,
              fontSize: `${size / 4}px`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-shake':
        return (
          <div
            className="spinner-loading-text-shake"
            style={{
              color: primaryColor,
              fontSize: `${size / 4}px`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'loading-text-zoom':
        return (
          <div
            className="spinner-loading-text-zoom"
            style={{
              color: primaryColor,
              fontSize: `${size / 4}px`,
            }}
          >
            L O A D I N G
          </div>
        );
      case 'progress-bar':
        return (
          <div
            className="spinner-progress-bar"
            style={{
              width: `${size}px`,
              color: primaryColor,
            }}
          />
        );
      case 'progress-dots':
        return (
          <div className="spinner-progress-dots" style={{ color: primaryColor }}>
            <div />
            <div />
            <div />
          </div>
        );
      case 'progress-steps':
        return (
          <div className="spinner-progress-steps" style={{ color: primaryColor }}>
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        );
      case 'loading-dots':
        return (
          <div className="spinner-loading-dots" style={{ color: primaryColor }}>
            <div />
            <div />
            <div />
          </div>
        );
      case 'loading-bars':
        return (
          <div className="spinner-loading-bars" style={{ color: primaryColor, height: `${size}px` }}>
            <div style={{ height: `${size * 0.3}px` }} />
            <div style={{ height: `${size * 0.6}px` }} />
            <div style={{ height: `${size}px` }} />
            <div style={{ height: `${size * 0.6}px` }} />
            <div style={{ height: `${size * 0.3}px` }} />
          </div>
        );
      case 'loading-pulse':
        return (
          <div
            className="spinner-loading-pulse"
            style={{
              color: primaryColor,
              width: `${size / 3}px`,
              height: `${size / 3}px`,
            }}
          />
        );
      case 'loading-wave':
        return (
          <div className="spinner-loading-wave" style={{ color: primaryColor, height: `${size}px` }}>
            <div style={{ height: `${size * 0.3}px` }} />
            <div style={{ height: `${size * 0.6}px` }} />
            <div style={{ height: `${size}px` }} />
            <div style={{ height: `${size * 0.6}px` }} />
            <div style={{ height: `${size * 0.3}px` }} />
          </div>
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