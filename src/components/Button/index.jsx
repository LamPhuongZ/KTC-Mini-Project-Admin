import PropTypes from "prop-types";

ButtonUI.propTypes = {
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  mb: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

function ButtonUI({
  title,
  bgColor = "transparent",
  color = "rgb(5, 122, 206)",
  borderColor = "rgb(5, 122, 206)",
  mb = 0,
  width = 100,
  onClick,
}) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: color,
        borderColor: borderColor,
        marginBottom: mb,
        width: width,
      }}
      className="px-2 py-1 border rounded font-bold cursor-pointer"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ButtonUI;
