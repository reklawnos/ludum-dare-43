import React from 'react';
import CirclePortrait from './avatars/CirclePortrait';

export default function BasicMessage({
  face,
  name,
  message,
  isHighlighted,
  isNewMessage,
}) {
  return (
    <div style={{ display: 'flex', padding: 10, backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.06)' : null }} className={isNewMessage ? "new-message": ""}>
      <div style={{ marginRight: 10 }}>
        <CirclePortrait face={face} size={60} />
      </div>
      <div>
        <div style={{ fontWeight: 900 }}>
          {name}
        </div>
        <div>
          {message}
        </div>
      </div>
    </div>
  );
}
