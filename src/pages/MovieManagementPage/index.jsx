// MovieManagementPage.jsx
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteMovieAPI,
  getMovieAllAPI,
  getMovieByNameAPI,
} from "../../redux/services/movieAPI";
import ButtonUI from "../../components/button";
import SearchForm from "../../components/SearchForm";

function MovieManagementPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const columns = [
    { field: "id", headerName: "#", width: 120, headerClassName: "font-bold" },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.imageUrl}
          alt={params.row.name}
          className="w-24 h-24 object-cover"
        />
      ),
      headerClassName: "font-bold",
    },
    {
      field: "name",
      headerName: "Movie Name",
      width: 200,
      headerClassName: "font-bold",
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span>
          {params.row.description.length > 100
            ? `${params.row.description.slice(0, 100)}...`
            : params.row.description}
        </span>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
      headerClassName: "font-bold",
    },
    {
      field: "releaseDate",
      headerName: "Release Date",
      width: 200,
      headerClassName: "font-bold",
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <div className="flex items-center">
          <button
            onClick={() => onNavigateToEditMovie(params.row.id)}
            className="text-green-500 text-2xl mr-4 hover:opacity-80 transition"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => onDeleteMovie(params.row.id)}
            className="text-red-500 text-2xl hover:opacity-80 transition"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const fetchMovies = async () => {
    try {
      const response = await getMovieAllAPI();
      setMovies(response.data);
      // setTotalRows(response.totalCount);
    } catch (error) {
      toast.error("Failed to fetch movies");
      console.error(error);
    }
  };

  const fetchSearchMovie = async (movieName) => {
    try {
      if (movieName.trim()) {
        const response = await getMovieByNameAPI(movieName);
        setMovies(response.data);
        // setTotalRows(response.data.length);
      } else {
        fetchMovies();
      }
    } catch (error) {
      toast.error("Movie search failed");
      console.error(error);
    }
  };

  const onNavigateToAddMovie = () => {
    navigate("/movie-management/create");
  };

  const onDeleteMovie = async (movieId) => {
    try {
      await deleteMovieAPI(movieId);
      toast.success("Movie deleted successfully!");
      fetchMovies();
    } catch (error) {
      toast.error("Movie deletion failed");
      console.error(error);
    }
  };

  const onNavigateToEditMovie = (movieId) => {
    navigate(`/movie-management/edit/${movieId}`);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchText) {
      fetchSearchMovie(searchText);
    } else {
      fetchMovies();
    }
  }, [searchText]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  const onChangeInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Movie Management</h2>
        <ButtonUI
          title="Add Movie"
          width={"20%"}
          onClick={onNavigateToAddMovie}
        />
        <SearchForm
          placeholder="Search movie name...."
          className="ml-4"
          onChange={onChangeInput}
          onClick={() => fetchSearchMovie(searchText)}
        />
      </div>

      <div className="w-full h-[630px]">
        <DataGrid
          className="custom-row-height"
          rows={movies}
          getRowId={(row) => row.id}
          columns={columns}
          pagination
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          page={page}
          pageSize={pageSize}
          rowCount={totalRows}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </div>
    </div>
  );
}

export default MovieManagementPage;
