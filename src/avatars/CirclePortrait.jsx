import React from 'react';
import { TemplateFace } from './templates';

export default function CirclePortrait({
  size,
  face,
}) {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      width: size * 0.8,
      height: size * 0.8,
      paddingTop: size * 0.2,
      paddingLeft: size * 0.1,
      paddingRight: size * 0.1,
      borderRadius: size * 0.5,
      overflow: 'hidden',
    }}>
      <TemplateFace {...face} />
    </div>
  );
}
