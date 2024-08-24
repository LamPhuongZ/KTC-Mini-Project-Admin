import PropTypes from "prop-types";

Pagination.propTypes = {
  totalPosts: PropTypes.number,
  postsPerPage: PropTypes.number,
  setCurrentPage: PropTypes.number,
  currentPage: PropTypes.number,
};

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  const pages = [];

  for (let index = 1; index <= Math.ceil(totalPosts / postsPerPage); index++) {
    pages.push(index);
  }

  return (
    <div className="flex flex-wrap justify-center mt-4">
      {pages.map((page, index) => (
        <button
          key={index}
          className={`w-10 h-10 mx-1 border border-gray-500 text-gray-500 
            ${page === currentPage ? "bg-orange-500 text-white rounded" : ""}
            hover:bg-orange-400 hover:border-red-500 hover:text-white`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
