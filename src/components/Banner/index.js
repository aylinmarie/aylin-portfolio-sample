import PropTypes from 'prop-types';
import React from 'react';

import * as stylesheet from './Banner.module.less';

const Banner = ({ children}) => {
  
  return (
    <section className={stylesheet.root} >
      {children}
    </section>
  );
};

Banner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Banner;
