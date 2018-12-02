import React from 'react';
import TriangleBaseballCap from './triangle_baseball_cap';
import TriangleFedora from './triangle_fedora';
import TriangleHairFlower from './triangle_hair_flower';
import TriangleGlasses from './triangle_glasses';
import TriangleLongHairTop from './triangle_long_hair_top';
import TriangleLongHairBottom from './triangle_long_hair_bottom';
import TriangleHandlebarMustache from './triangle_handlebar_mustache';
import TriangleBeard from './triangle_beard';
import TriangleSpikyHair from './triangle_spiky_hair';
import TriangleCrewCut from './triangle_crew_cut';
import TriangleSuitJacket from './triangle_suit_jacket';
import TriangleSuitShirtTie from './triangle_suit_shirt_tie';
import TriangleTshirt from './triangle_tshirt';
import TriangleFace from './triangle_face';

const ITEM_ORDER = [
  TriangleBaseballCap,
  TriangleFedora,
  TriangleHairFlower,
  TriangleGlasses,
  TriangleLongHairTop,
  TriangleHandlebarMustache,
  TriangleSpikyHair,
  TriangleCrewCut,
  TriangleBeard,
  TriangleSuitJacket,
  TriangleSuitShirtTie,
  TriangleFace,
  TriangleTshirt,
  TriangleLongHairBottom,
].reverse();

const TOP_OPTIONS = [
  [TriangleBaseballCap],
  [TriangleBaseballCap, TriangleLongHairBottom, TriangleLongHairTop],
  [TriangleBaseballCap, TriangleCrewCut],
  [TriangleCrewCut],
  [TriangleFedora],
  [TriangleFedora, TriangleLongHairBottom, TriangleLongHairTop],
  [TriangleBaseballCap, TriangleLongHairBottom, TriangleLongHairTop],
  [TriangleHairFlower, TriangleLongHairBottom, TriangleLongHairTop],
  [TriangleHairFlower, TriangleSpikyHair],
  [TriangleHairFlower, TriangleCrewCut],
  [TriangleSpikyHair],
  [TriangleLongHairBottom, TriangleLongHairTop],
];

const TOP_OPTIONS_FORMAL = [3, 4, 5, 7, 8, 9, 10, 11];

const BOTTOM_OPTIONS = [
  [TriangleSuitJacket, TriangleSuitShirtTie],
  [TriangleSuitJacket, TriangleTshirt],
  [TriangleTshirt],
];

const BOTTOM_OPTIONS_FORMAL = [0];

const FACE_OPTIONS = [
  [TriangleHandlebarMustache],
  [TriangleBeard],
  [TriangleGlasses, TriangleHandlebarMustache],
  [TriangleGlasses, TriangleBeard],
  [TriangleGlasses],
  [],
  [],
  [],
];

const HAIR_COLORS = [
  { light: '#999999', dark: '#999999' }, // gray
  { light: '#6c5353', dark: '#6c5353' }, // brown
  { light: '#483737', dark: '#3c2e2e' }, // dark brown
  { light: '#ffd42a', dark: '#f1c100' }, // blonde
  { light: '#d45500', dark: '#ac4500' }, // red
];

const ITEM_COLORS = new Map([
  [TriangleSuitJacket, [
    { baseColor: '#2C5AA0', lapelColor: '#214478' },
    { baseColor: '#901919', lapelColor: '#5E0A0A' },
    { baseColor: '#c8beb7', lapelColor: '#ac9393' },
    { baseColor: '#9dac93', lapelColor: '#7c916f' },
    { baseColor: '#666666', lapelColor: '#333333' },
  ]],
  [TriangleTshirt, [
    { baseColor: '#00aad4', collarColor: '#0083a4' },
    { baseColor: '#8787de', collarColor: '#5f5fd3' },
    { baseColor: '#ffcc00', collarColor: '#d4aa00' },
    { baseColor: '#71c837', collarColor: '#5aa02c' },
    { baseColor: '#4d4d4d', collarColor: '#1a1a1a' },
  ]],
  [TriangleFace, [
    { skinTone: '#deaa87', skinToneDark: '#c79979' },
    { skinTone: '#d38d5f', skinToneDark: '#ca7741' },
    { skinTone: '#916f6f', skinToneDark: '#6c5353' },
  ]],
]);

const HAIR_COMPONENTS = new Set([
  TriangleCrewCut,
  TriangleLongHairBottom,
  TriangleLongHairTop,
  TriangleSpikyHair,
  TriangleCrewCut,
  TriangleHandlebarMustache,
  TriangleBeard,
]);

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function randomItemColors() {
  return new Map(Array.from(ITEM_COLORS.entries()).map(([key, value]) => [
    key,
    value[getRandomIndex(value)],
  ]));
}

export function getRandomTriangleFace() {
  return {
    topIndex: getRandomIndex(TOP_OPTIONS),
    bottomIndex: getRandomIndex(BOTTOM_OPTIONS),
    faceIndex: getRandomIndex(FACE_OPTIONS),
    hairColorIndex: getRandomIndex(HAIR_COLORS),
    itemColorsMap: randomItemColors(),
  };
}

export function getRandomFormalTriangleFace() {
  var randomFace = getRandomTriangleFace();
  randomFace.topIndex = TOP_OPTIONS_FORMAL[getRandomIndex(TOP_OPTIONS_FORMAL)];
  randomFace.bottomIndex = BOTTOM_OPTIONS_FORMAL[getRandomIndex(BOTTOM_OPTIONS_FORMAL)];
  return randomFace;
}

export default function TriangleAvatar({
  topIndex,
  bottomIndex,
  faceIndex,
  hairColorIndex,
  itemColorsMap,
}) {
  const topOption = TOP_OPTIONS[topIndex];
  const bottomOption = BOTTOM_OPTIONS[bottomIndex];
  const faceOption = FACE_OPTIONS[faceIndex];
  const hairColor = HAIR_COLORS[hairColorIndex];
  const items = new Set([
    ...topOption,
    ...bottomOption,
    ...faceOption,
    TriangleFace,
  ]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.867 33.867">
      {ITEM_ORDER.filter(item => items.has(item)).map(Component => {
        let props;
        if (itemColorsMap.has(Component)) {
          props = itemColorsMap.get(Component);
        }
        if (HAIR_COMPONENTS.has(Component)) {
          props = hairColor;
        }
        return (
          <Component key={Component.name} {...props} />
        );
      })}
    </svg>
  );
}
