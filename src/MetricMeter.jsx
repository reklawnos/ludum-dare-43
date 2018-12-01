import React from 'react';

export default function MetricMeter({
  prefix,
  value,
  postfix,
  sizeOfEffect,
}) {
  return (
    <div>
      {prefix}{value.toFixed(2)}{postfix}
      <div
        style={{
          display: 'inline-block',
          height: 16,
          width: 16,
          borderRadius: 8,
          transformOrigin: 'center',
          backgroundColor: 'blue',
          transform: `scale(${(sizeOfEffect || 0) * 2})`
        }}
      />
    </div>
  );
}
