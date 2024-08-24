import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

SearchForm.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

function SearchForm({ placeholder, onClick, onChange }) {
  return (
    <div className="flex justify-center mt-4">
      <input
        onChange={onChange}
        className="text-base p-1.5 mb-4 w-80 h-8 border border-gray-300"
        type="text"
        placeholder={placeholder}
      />
      <button
        className="flex items-center p-1.5 text-lg border border-blue-500 bg-blue-500 text-white h-8 cursor-pointer"
        onClick={onClick}
      >
        <SearchOutlined />
      </button>
    </div>
  );
}

export default SearchForm;
