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
      className={value < minForFlashing ? 'pulsing-animation' : null }
    >
      {prefix}{value.toFixed(2)}{postfix}
      <ImpactMeter sizeOfEffect={sizeOfEffect} />
    </div>
  );
}
