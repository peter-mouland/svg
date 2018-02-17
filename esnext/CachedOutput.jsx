import React from 'react';
import PropTypes from 'prop-types';

class CachedOutput extends React.Component {
  componentWillMount() {
    this.context.svgCache.subscribe(() => this.forceUpdate());
  }
  render() {
    const { svgCache = {} } = this.context;
    return <span data-meta="svg-cache" dangerouslySetInnerHTML={{ __html: svgCache.symbols() }} />;
  }
}

CachedOutput.contextTypes = {
  svgCache: PropTypes.object
};

export default CachedOutput;
