import './styles.css';

import P from 'prop-types';

export const Button = ({ text, onClick, disabled }) => (
  <button disabled={disabled} className="btn" onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func,
  disabled: P.bool,
};

Button.defaultProps = {
  disabled: false,
};
