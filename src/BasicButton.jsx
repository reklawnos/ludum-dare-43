import React from 'react';

export default function BasicButton({
  children,
  onClick,
  onMouseOver,
  onMouseOut,
}) {
  return (
    <button
      style={{
        margin: 5,
        padding: 8,
        borderRadius: 3,
        border: '1px solid rgb(158, 158, 158)',
        background: 'linear-gradient(rgb(253, 253, 253) 0%, rgb(245, 245, 245) 85%, rgb(252, 253, 255) 100%)',
        color: 'black',
      }}
      className="clicky-button"
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
}
