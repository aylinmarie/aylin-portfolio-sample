import PropTypes from 'prop-types';
import React from 'react';

import cx from 'classnames';
import * as stylesheet from './Button.module.less';

const Button = ({ children, href, onClick, type, ...rest }) => {
  const classList = cx(stylesheet.root, stylesheet[type]);
  const Element = href ? 'a' : 'button';
  const props = href ? { href: href, ...rest } : { onClick: onClick };

  if (Element === 'a' && props.target === '_blank') {
    props.rel = 'noreferrer noopener';
  }

  return (
    <Element className={classList} {...props}>
      {children}
    </Element>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
};

export default Button;
