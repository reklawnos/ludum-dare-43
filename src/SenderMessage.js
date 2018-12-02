import React from 'react';
import CirclePortrait from './avatars/CirclePortrait';

export default function SenderMessage({
  card,
  companyName,
}) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: 10 }}>
        <CirclePortrait face={card.sender.face} size={60} />
      </div>
      <div>
        <div style={{ fontWeight: 900 }}>
          {card.sender.name}
        </div>
        <div>
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
          {typeof card.message === "function" ? card.message(companyName) : card.message}
        </div>
      </div>
    </div>
  );
}
