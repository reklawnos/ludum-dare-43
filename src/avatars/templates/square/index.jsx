import React from 'react';
import SquareBaseballCap from './top/square_baseball_cap';
import SquareFedora from './top/square_fedora';
import SquareHairFlower from './top/square_hair_flower';
import SquareGlasses from './square_glasses';
import SquareLongHairTop from './hair/square_long_hair_top';
import SquareLongHairBottom from './hair/square_long_hair_bottom';
import SquareHandlebarMustache from './facial_hair/square_handlebar_mustache';
import SquareBeard from './facial_hair/square_beard';
import SquareSpikyHair from './hair/square_spiky_hair';
import SquareCrewCut from './top/square_crew_cut';
import SquareSuitJacket from './clothes/square_suit_jacket';
import SquareSuitShirtTie from './clothes/square_suit_shirt_tie';
import SquareTshirt from './clothes/square_tshirt';
import SquareFace from './square_face';

const ITEM_ORDER = [
  SquareBaseballCap,
  SquareFedora,
  SquareHairFlower,
  SquareGlasses,
  SquareLongHairTop,
  SquareHandlebarMustache,
  SquareSpikyHair,
  SquareCrewCut,
  SquareBeard,
  SquareSuitJacket,
  SquareSuitShirtTie,
  SquareFace,
  SquareTshirt,
  SquareLongHairBottom,
].reverse();

const TOP_OPTIONS = [
  [SquareBaseballCap],
  [SquareBaseballCap, SquareSpikyHair],
  [SquareBaseballCap, SquareLongHairBottom, SquareLongHairTop],
  [SquareBaseballCap, SquareCrewCut],
  [SquareCrewCut],
  [SquareFedora],
  [SquareFedora, SquareLongHairBottom, SquareLongHairTop],
  [SquareBaseballCap, SquareLongHairBottom, SquareLongHairTop],
  [SquareHairFlower, SquareLongHairBottom, SquareLongHairTop],
  [SquareHairFlower, SquareSpikyHair],
  [SquareHairFlower, SquareCrewCut],
  [SquareSpikyHair],
  [SquareLongHairBottom, SquareLongHairTop],
];

const BOTTOM_OPTIONS = [
  [SquareSuitJacket, SquareSuitShirtTie],
  [SquareSuitJacket, SquareTshirt],
  [SquareTshirt],
];

const FACE_OPTIONS = [
  [SquareHandlebarMustache],
  [SquareBeard],
  [SquareGlasses, SquareHandlebarMustache],
  [SquareGlasses, SquareBeard],
  [SquareGlasses],
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
  [SquareSuitJacket, [
    { baseColor: '#2C5AA0', lapelColor: '#214478' },
    { baseColor: '#901919', lapelColor: '#5E0A0A' },
    { baseColor: '#c8beb7', lapelColor: '#ac9393' },
    { baseColor: '#9dac93', lapelColor: '#7c916f' },
    { baseColor: '#666666', lapelColor: '#333333' },
  ]],
  [SquareTshirt, [
    { baseColor: '#00aad4', collarColor: '#0083a4' },
    { baseColor: '#8787de', collarColor: '#5f5fd3' },
    { baseColor: '#ffcc00', collarColor: '#d4aa00' },
    { baseColor: '#71c837', collarColor: '#5aa02c' },
    { baseColor: '#4d4d4d', collarColor: '#1a1a1a' },
  ]],
  [SquareFace, [
    { skinTone: '#deaa87' },
    { skinTone: '#d38d5f' },
    { skinTone: '#916f6f' },
  ]],
]);

const HAIR_COMPONENTS = new Set([
  SquareCrewCut,
  SquareLongHairBottom,
  SquareLongHairTop,
  SquareSpikyHair,
  SquareCrewCut,
  SquareHandlebarMustache,
  SquareBeard,
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

export function getRandomSquareFace() {
  return {
    topIndex: getRandomIndex(TOP_OPTIONS),
    bottomIndex: getRandomIndex(BOTTOM_OPTIONS),
    faceIndex: getRandomIndex(FACE_OPTIONS),
    hairColorIndex: getRandomIndex(HAIR_COLORS),
    itemColorsMap: randomItemColors(),
  };
}

export default function SquareAvatar({
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
    SquareFace,
  ]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 33.867 33.867">
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
