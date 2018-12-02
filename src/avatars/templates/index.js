import React from 'react';
import SquareAvatar, { getRandomSquareFace, getRandomFormalSquareFace } from './square';
import CircleAvatar, { getRandomCircleFace, getRandomFormalCircleFace } from './circle';
import TriangleAvatar, { getRandomTriangleFace, getRandomFormalTriangleFace } from './triangle';

const FACE_GENERATORS = [
  () => ({
    Component: SquareAvatar,
    props: getRandomSquareFace(),
  }),
  () => ({
    Component: CircleAvatar,
    props: getRandomCircleFace(),
  }),
  () => ({
    Component: TriangleAvatar,
    props: getRandomTriangleFace(),
  }),
];

const FORMAL_FACE_GENERATORS = [
  () => ({
    Component: SquareAvatar,
    props: getRandomFormalSquareFace(),
  }),
  () => ({
    Component: CircleAvatar,
    props: getRandomFormalCircleFace(),
  }),
  () => ({
    Component: TriangleAvatar,
    props: getRandomFormalTriangleFace(),
  }),
];

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

export function getRandomFace() {
  return FACE_GENERATORS[getRandomIndex(FACE_GENERATORS)]();
}

export function getRandomFormalFace() {
  return FORMAL_FACE_GENERATORS[getRandomIndex(FORMAL_FACE_GENERATORS)]();
}

export function TemplateFace(config) {
  const { Component, props } = config;
  console.log(props);
  return (
    <Component {...props} />
  );
}
