import React from 'react';
import CircleBaseballCap from './circle_baseball_cap';
import CircleFedora from './circle_fedora';
import CircleHairFlower from './circle_hair_flower';
import CircleGlasses from './circle_glasses';
import CircleLongHairTop from './circle_long_hair_top';
import CircleLongHairBottom from './circle_long_hair_bottom';
import CircleHandlebarMustache from './circle_handlebar_mustache';
import CircleBeard from './circle_beard';
import CircleSpikyHair from './circle_spiky_hair';
import CircleCrewCut from './circle_crew_cut';
import CircleSuitJacket from './circle_suit_jacket';
import CircleSuitShirtTie from './circle_suit_tie';
import CircleTshirt from './circle_tshirt';
import CircleFace from './circle_face';

const ITEM_ORDER = [
  CircleBaseballCap,
  CircleFedora,
  CircleHairFlower,
  CircleGlasses,
  CircleLongHairTop,
  CircleHandlebarMustache,
  CircleSpikyHair,
  CircleCrewCut,
  CircleBeard,
  CircleSuitJacket,
  CircleSuitShirtTie,
  CircleFace,
  CircleTshirt,
  CircleLongHairBottom,
].reverse();

const TOP_OPTIONS = [
  [CircleBaseballCap],
  [CircleBaseballCap, CircleSpikyHair],
  [CircleBaseballCap, CircleLongHairBottom, CircleLongHairTop],
  [CircleBaseballCap, CircleCrewCut],
  [CircleCrewCut],
  [CircleFedora],
  [CircleFedora, CircleLongHairBottom, CircleLongHairTop],
  [CircleBaseballCap, CircleLongHairBottom, CircleLongHairTop],
  [CircleHairFlower, CircleLongHairBottom, CircleLongHairTop],
  [CircleHairFlower, CircleSpikyHair],
  [CircleHairFlower, CircleCrewCut],
  [CircleSpikyHair],
  [CircleLongHairBottom, CircleLongHairTop],
];

const TOP_OPTIONS_FORMAL = [4, 5, 6, 8, 9, 10, 11, 12];

const BOTTOM_OPTIONS = [
  [CircleSuitJacket, CircleSuitShirtTie],
  [CircleSuitJacket, CircleTshirt],
  [CircleTshirt],
];

const BOTTOM_OPTIONS_FORMAL = [0];

const FACE_OPTIONS = [
  [CircleHandlebarMustache],
  [CircleBeard],
  [CircleGlasses, CircleHandlebarMustache],
  [CircleGlasses, CircleBeard],
  [CircleGlasses],
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
  [CircleSuitJacket, [
    { baseColor: '#2C5AA0', lapelColor: '#214478' },
    { baseColor: '#901919', lapelColor: '#5E0A0A' },
    { baseColor: '#c8beb7', lapelColor: '#ac9393' },
    { baseColor: '#9dac93', lapelColor: '#7c916f' },
    { baseColor: '#666666', lapelColor: '#333333' },
  ]],
  [CircleTshirt, [
    { baseColor: '#00aad4', collarColor: '#0083a4' },
    { baseColor: '#8787de', collarColor: '#5f5fd3' },
    { baseColor: '#ffcc00', collarColor: '#d4aa00' },
    { baseColor: '#71c837', collarColor: '#5aa02c' },
    { baseColor: '#4d4d4d', collarColor: '#1a1a1a' },
  ]],
  [CircleFace, [
    { skinTone: '#deaa87' },
    { skinTone: '#d38d5f' },
    { skinTone: '#916f6f' },
  ]],
]);

const HAIR_COMPONENTS = new Set([
  CircleCrewCut,
  CircleLongHairBottom,
  CircleLongHairTop,
  CircleSpikyHair,
  CircleCrewCut,
  CircleHandlebarMustache,
  CircleBeard,
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

export function getRandomCircleFace() {
  return {
    topIndex: getRandomIndex(TOP_OPTIONS),
    bottomIndex: getRandomIndex(BOTTOM_OPTIONS),
    faceIndex: getRandomIndex(FACE_OPTIONS),
    hairColorIndex: getRandomIndex(HAIR_COLORS),
    itemColorsMap: randomItemColors(),
  };
}

export function getRandomFormalCircleFace() {
  var randomFace = getRandomCircleFace();
  randomFace.topIndex = TOP_OPTIONS_FORMAL[getRandomIndex(TOP_OPTIONS_FORMAL)];
  randomFace.bottomIndex = BOTTOM_OPTIONS_FORMAL[getRandomIndex(BOTTOM_OPTIONS_FORMAL)];
  return randomFace;
}

export default function CircleAvatar({
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
    CircleFace,
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
