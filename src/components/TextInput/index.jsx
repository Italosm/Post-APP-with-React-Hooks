import './styles.css';
import P from 'prop-types';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      placeholder="Type your search"
      value={searchValue}
      type="search"
      onChange={handleChange}
    />
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
