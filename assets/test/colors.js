export const SOCIAL = {
  FACEBOOK: '#3B5998',
  TWITTER: '#5BC0DE',
  DRIBBBLE: '#EA4C89',
};

// const color3 = '#FFF59D';

export const THEME = {
  THEME: '#FFEB3B',
  PRIMARY: '#F57F17',
  INFO: '#1232FF',
  ERROR: '#FE2472',
  WARNING: '#FF9C09',
  SUCCESS: '#45DF31',
};

export const COMPONENTS = {
  INPUT: '#808080',
  PLACEHOLDER: '#9FA5AA',
  NAVBAR: '#F9F9F9',
  BLOCK: '#808080',
  ICON: '#000000',
};

export const LIST = {
  LIST: '#FFEB3B',
  LIST_ITEM: '#F57F17'
};

const COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREY: '#898989',
  MUTED: '#9FA5AA',
  TRANSPARENT: 'transparent',
  NEUTRAL: 'rgba(255,255,255, 0.65)',
  ...COMPONENTS,
  ...THEME,
  ...SOCIAL,
  ...LIST,
};

export default COLORS;