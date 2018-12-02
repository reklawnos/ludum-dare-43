import React from 'react';
export default function CircleLongHairTop({ light, lighter, dark}) {
  return (
<><path d="M27.6 14.098s-7.325-3.334-11.037-5.014c-3.713-1.68-5.831-4.377-5.831-4.377S16.434.098 22.47 4.002c5.362 3.467 5.13 10.096 5.13 10.096z" fill={lighter || light}/><path d="M6.488 13.622s7.677-2.175 11.39-3.855c3.712-1.68 5.537-5.08 5.537-5.08S17.713.076 11.676 3.98c-5.362 3.467-5.188 9.641-5.188 9.641z" fill={light || dark}/></>); }
