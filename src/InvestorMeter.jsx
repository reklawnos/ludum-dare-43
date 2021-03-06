import React from 'react';
import CirclePortrait from './avatars/CirclePortrait';
import ImpactMeter from './ImpactMeter';
import { Spring } from 'react-spring';


const CIRCLE_LENGTH = 276;

export default function InvestorMeter({
  face,
  name,
  value,
  sizeOfEffect,
}) {
  const normValue = Math.max(Math.min(value, 1), 0);
  return (
    <Spring to={{ val: normValue }}>
      {({ val }) => {
        const dashOffset = (1 - val) * CIRCLE_LENGTH;
        const hue = val * 130;
        const color = `hsl(${hue}, 83%, 50%)`
        return (
          <div style={{ display: 'flex', margin: '10px 0' }}>
            <div style={{
              width: 40,
              height: 40,
              position: 'relative',
              overflow: 'visible',
              margin: 5,
              marginRight: 10,
              flex: '0 0 40px',
            }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <CirclePortrait size={40} face={face} />
              </div>
              {value < 0.2 &&
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 20,
                  }}
                  className="pulsing-animation"
                />
              }
              <div
                style={{
                  position: 'absolute',
                  top: -5,
                  left: -5,
                  right: -5,
                  bottom: -5,
                  overflow: 'visible'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
                  <circle transform="rotate(-90, 50, 50)" cx="50" cy="50" r="44" stroke={color} strokeWidth="8" strokeDasharray={CIRCLE_LENGTH} strokeDashoffset={dashOffset} fill="none" />
                </svg>
              </div>
            </div>
            <div style={{flexGrow: 1, alignSelf: 'center' }}>
              {name}
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
