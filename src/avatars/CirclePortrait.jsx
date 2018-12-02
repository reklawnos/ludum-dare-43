import React from 'react';
import { TemplateFace } from './templates';

export default function CirclePortrait({
  size,
  face,
}) {
  var bgcolor = 'rgba(0, 0, 0, 0.1)';
  if ("bgcolor" in face) {
    bgcolor = face.bgcolor;
  }
  var paddingTop = 0.2;
  var paddingBottom = 0.0;
  if ("paddingTop" in face && "paddingBottom" in face) {
    paddingTop = face.paddingTop;
    paddingBottom = face.paddingBottom;
  }
  return (
    <div style={{
      background: bgcolor,
      width: size * 0.8,
      height: size * 0.8,
      paddingTop: size * paddingTop,
      paddingBottom: size * paddingBottom,
      paddingLeft: size * 0.1,
      paddingRight: size * 0.1,
      borderRadius: size * 0.5,
      overflow: 'hidden',
    }}>
      <TemplateFace {...face} />
    </div>
  );
}
