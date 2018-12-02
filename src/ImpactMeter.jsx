import React from 'react';

export default function ImpactMeter({
  sizeOfEffect,
}) {
  if (!sizeOfEffect || Math.abs(sizeOfEffect) <= 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'inline-block',
        marginLeft: 5,
        verticalAlign: 'bottom',
      }}
      className="fly-in-animation"
    >
      <div
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          transformOrigin: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transform: `scale(${Math.min(1, Math.max(0.2, Math.abs(sizeOfEffect || 0))) * 2})`
        }}
      />
    </div>
  );
}
