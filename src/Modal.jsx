import React from 'react';

export default function BasicButton({
  children,
}) {
  return (
    <div style={{
      position: "fixed",
      left: 0,
      right: 0, top: 0, bottom: 0, width: "100%", height: "100%"}}>
      <div style={{
        position: "relative", 
        padding: "12px 12px 12px 12px", 
        left: "50%", top: "50%",
        backgroundColor: "#fff",
        width: "420px",
        transform: "translate(-50%, -50%)",
        borderRadius: 5,
        boxShadow: "0 2px 10px 0 rgba(0,0,0,.2)"
      }}>
      {children}
      </div>
   </div>
  );
}
