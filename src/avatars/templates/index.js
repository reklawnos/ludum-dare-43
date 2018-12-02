import React from 'react';
import SquareAvatar, { getRandomSquareFace } from './square';

const FACE_GENERATORS = [
  () => ({
    Component: SquareAvatar,
    props: getRandomSquareFace(),
  }),
];

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

export function getRandomFace() {
  return FACE_GENERATORS[getRandomIndex(FACE_GENERATORS)]();
}

export function TemplateFace(config) {
  const { Component, props } = config;
  console.log(props);
  return (
    <Component {...props} />
  );
}
