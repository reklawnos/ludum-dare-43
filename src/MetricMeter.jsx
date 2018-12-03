import React from 'react';
import { Spring } from 'react-spring';
import ImpactMeter from './ImpactMeter';

export default function MetricMeter({
  prefix,
  value,
  postfix,
  sizeOfEffect,
  minForFlashing,
}) {
  return (
    <Spring to={{ val: value }}>
      {({ val }) => {
        // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        let valueStr = (val * 1000000).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      }}
    </Spring>
  );
}
