import React from 'react';
import CirclePortrait from './avatars/CirclePortrait';
import BasicMessage from './BasicMessage';

export default function SenderMessage({
  card,
  companyName,
  productName,
}) {
  const message = typeof card.message === "function" ? card.message(companyName, productName) : card.message;
  return (
    <BasicMessage face={card.sender.face} name={card.sender.name} message={message} />
  );
}
