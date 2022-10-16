/**
 * to use svg with typescript https://github.com/kristerkari/react-native-svg-transformer#using-typescript
 * for set up background color for svg icon should to use "fill" props and remove fill props inside svg file code path
 * for set up width and height use to "width" and "height" props like <AddIcon width={25} height={25} fill={'#454'} />
 */
 declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
