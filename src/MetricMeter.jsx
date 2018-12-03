import React from 'react';
import ImpactMeter from './ImpactMeter';

export default function MetricMeter({
  prefix,
  value,
  postfix,
  sizeOfEffect,
  minForFlashing,
}) {
  let valueStr = (value * 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return (
    <div
      style={{ display: 'flex' }}
      className={value < minForFlashing ? 'pulsing-animation' : null }
    >
      <div
       style={{ flexGrow: 1 }}
      >
        {prefix}{valueStr}{postfix}
      </div>
      <div style={{ flex: '0 0 16px', alignSelf: 'center' }}>
        <ImpactMeter sizeOfEffect={sizeOfEffect} />
      </div>
    </div>
  );
}
