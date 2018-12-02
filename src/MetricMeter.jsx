import React from 'react';
import ImpactMeter from './ImpactMeter';

export default function MetricMeter({
  prefix,
  value,
  postfix,
  sizeOfEffect,
  minForFlashing,
}) {
  return (
    <div
      style={{ display: 'flex' }}
      className={value < minForFlashing ? 'pulsing-animation' : null }
    >
      <div
       style={{ flexGrow: 1 }}
      >
        {prefix}{value.toFixed(2)}{postfix}
      </div>
      <div style={{ flex: '0 0 16px', alignSelf: 'center' }}>
        <ImpactMeter sizeOfEffect={sizeOfEffect} />
      </div>
    </div>
  );
}
