import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

const Wishlist = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="100%" height="100%" class="icon icon--wishlist">
  <path class="icon__heart" d="M21.5,3.4c-2.8,0-5.3,1.6-6.5,4.1C13.8,5,11.2,3.4,8.5,3.4c-4,0-7.3,3.3-7.3,7.3c0,1.9,0.7,3.7,2.1,5.1
		C4.5,17,14.6,27.3,14.7,27.4c0.1,0.1,0.2,0.1,0.3,0.1h0c0.1,0,0.2,0,0.3-0.1c0.4-0.4,10.3-10.4,11.5-11.7c1.3-1.4,2-3.1,2-5
		C28.8,6.7,25.6,3.4,21.5,3.4z" />
</svg>`;

const Chevron = `<svg viewBox="0 0 100 60" height="10" width="16" xmlns="http://www.w3.org/2000/svg" class="icon icon--chevron">
  <g class="icon__group">
    <line class="icon__fg icon__line icon__line--left" x1="50" y1="50" x2="10" y2="10" stroke-width="7" stroke-linecap="round" />
    <line class="icon__fg icon__line icon__line--right" x1="50" y1="50" x2="90" y2="10" stroke-width="7" stroke-linecap="round" />
  </g>
</svg>
`;

import Svg from './Svg';

const stories = storiesOf('Svg', module);

stories.add('Inline SVG', () => <Svg height={'30px'} width={'30px'} >{Wishlist}</Svg>);

stories.add('Re-use SVG', () => <ReuseDemo />);

stories.add('Re-use SVG with different styles', () => <ReuseDemo2 />);

class ReuseDemo extends React.Component {
  getChildContext() {
    return { svgCache: { } };
  }

  render() {
    return (
      <div>
        <Svg cacheId={'wish-list'} height={'30px'} width={'30px'} >{Wishlist}</Svg>
        <Svg cacheId={'wish-list'} height={'60px'} width={'60px'} style={{ fill: 'green', stroke: 'red' }} >{Wishlist}</Svg>
      </div>
    );
  }
}

ReuseDemo.childContextTypes = {
  svgCache: PropTypes.object
};

class ReuseDemo2 extends React.Component {
  getChildContext() {
    return { svgCache: { } };
  }

  render() {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{ __html: `
  .colors-1 .icon__line--left {
    stroke:blue;
  }
  .colors-1 .icon__line--right {
    stroke:red;
  }
  .colors-2 .icon__line--left {
    stroke:brown;
  }
  .colors-2 .icon__line--right {
    stroke:green;
  }
        ` }} />
        <Svg cacheId={'chevron-1'} height={'30px'} width={'30px'} className={'colors-1'} >{Chevron}</Svg>
        <Svg cacheId={'chevron-2'} height={'60px'} width={'60px'} className={'colors-2'} >{Chevron}</Svg>
        <Svg cacheId={'chevron-2'} height={'90px'} width={'90px'} className={'another-class'} >{Chevron}</Svg>
      </div>
    );
  }
}

ReuseDemo2.childContextTypes = {
  svgCache: PropTypes.object
};

