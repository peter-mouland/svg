import React from 'react';
import PropTypes from 'prop-types';

const createSymbol = (svgContents, { className = '', cacheId, id } = {}) => {
  // defs need to be moved outside the symbol for firefox
  const matchDefs = svgContents.match(/<defs>(.*?)<\/defs>/i) || [];
  const defs = matchDefs[0] || '';
  const svgWithoutDefs = svgContents.replace(/<defs>(.*?)<\/defs>/ig, () => '');
  const symbolClass = className ? `class="${className}"` : '';
  return `${defs}<symbol id="${cacheId || id}" ${symbolClass}>${svgWithoutDefs}</symbol>`;
};

const createUse = (svg, cacheId, { viewBox = '' }) => {
  const useVB = viewBox ? ` viewBox="${viewBox}"` : '';
  return `<use${useVB} xlink:href='#${cacheId}' />`; // use needs xlink for safari
};

const getSvgTag = (svg = '') => (svg.match(/(<svg[^>]*)>/) || [])[0];
const svgAttrs = (svgTag = '', attrs) =>
  (svgTag.match(/(\S+)\s*=\s*["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))?[^"']*)["']?/ig) || [])
    .reduce((prev, curr) => {
      const keyValuePair = curr.split('=');
      const svgKey = keyValuePair[0];
      const svgValue = keyValuePair[1].replace(/(^['"])|(['"]$)/g, '');
      const key = svgKey === 'class' ? 'className' : keyValuePair[0];
      const value = svgKey === 'class' ? `${attrs[key] || ''} ${svgValue}`.trim() : svgValue;
      prev[key] = attrs[key] ? attrs[key] : value; // eslint-disable-line no-param-reassign
      return prev;
    }, attrs);

const SVG = ({
  children, id, cacheId, ...props
}, { svgCache = {} } = {}) => {
  const isBase64 = typeof children === 'string' && children.indexOf('data') === 0;
  const svg = children || '';
  const svgTag = getSvgTag(svg);
  const attrs = svgAttrs(svgTag, { id, ...props });
  let svgContents = svg.replace(/(<svg[^>]*)>/, '').replace('</svg>', '');

  if (svgCache[cacheId]) {
    svgContents = svgCache[cacheId];
  } else if (cacheId) {
    const cache = createUse(svgContents, cacheId, attrs);
    svgContents = `${createSymbol(svgContents, { cacheId, ...attrs })}${cache}`;
    delete attrs.className;
    svgCache[cacheId] = cache; // eslint-disable-line no-param-reassign
  }

  return React.createElement(isBase64 ? 'img' : 'svg', { ...attrs, dangerouslySetInnerHTML: { __html: svgContents } });
};

SVG.contextTypes = {
  svgCache: PropTypes.object
};

export default SVG;
