import React from 'react';

export default function MetricMeter({
  prefix,
  value,
  postfix,
  sizeOfEffect,
  minForFlashing,
}) {
  return (
    <div
      className={value < minForFlashing ? 'pulsing-animation' : null }
    >
      {prefix}{value.toFixed(2)}{postfix}
      <div
        style={{
          display: 'inline-block',
          marginLeft: 5,
          verticalAlign: 'bottom',
          height: 20,
          width: 20,
          borderRadius: 10,
          transformOrigin: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transform: `scale(${Math.min(1, Math.abs(sizeOfEffect || 0)) * 2})`
        }}
      />
    </div>
  );
}
