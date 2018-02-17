const nodeHook = require('node-hook');
const SvgLoader = require('svg-inline-loader');

module.exports = (svgLoaderOptions = { removeSVGTagAttrs: false }) => {
  nodeHook.hook('.svg', (source) => {
    const markup = SvgLoader.getExtractedSVG(source, svgLoaderOptions);
    return `module.exports =  ${JSON.stringify(markup)}`;
  });
};
