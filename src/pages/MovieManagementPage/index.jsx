import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteMovieAPI,
  getMovieAllAPI,
} from "../../redux/services/movieAPI";

function MovieManagementPage() {
  const navigate = useNavigate();
  const [listMovie, setListMovie] = useState([]);
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      field: "maPhim",
      headerName: "Mã Phim",
      width: 120,
      headerClassName: "font-bold",
    },
    {
      field: "hinhAnh",
      headerName: "Hình Ảnh",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.hinhAnh}
          alt={params.row.tenPhim}
          className="w-24 h-36 object-cover"
        />
      ),
      headerClassName: "font-bold",
    },
    {
      field: "tenPhim",
      headerName: "Tên Phim",
      width: 200,
      headerClassName: "font-bold",
    },
    {
      field: "moTa",
      headerName: "Mô Tả",
      width: 300,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <span>
          {params.row.moTa.length > 100
            ? `${params.row.moTa.slice(0, 100)}...`
            : params.row.moTa}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      headerClassName: "font-bold",
      renderCell: (params) => (
        <div className="flex items-center">
          <button
            onClick={() => onNavigateToEditMovie(params.row.maPhim)}
            className="text-green-500 text-2xl mr-4 hover:opacity-80 transition"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => onDeleteMovie(params.row.maPhim)}
            className="text-red-500 text-2xl hover:opacity-80 transition"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const fetchListMovie = async () => {
    try {
      const data = await getMovieAllAPI();
      setListMovie(data);
    } catch (error) {
      toast.error("Get list of failed movies");

      throw error;
    }
  };

  const onNavigateToAddMovie = () => {
    navigate("/movie-management/create");
  };

  const onDeleteMovie = async (maPhim) => {
    try {
      await deleteMovieAPI(maPhim);
      toast.success("Movie deleted successfully!");
      fetchListMovie();
    } catch (error) {
      toast.error("Movie deletion failed");
      throw error;
    }
  };

  const onNavigateToEditMovie = (maPhim) => {
    navigate(`/movie-management/edit/${maPhim}`);
  };

  const onChangeInput = (e) => {
    setSearchText(e.target.value);
  };

  const fetchSearchMovie = async () => {
    try {
      const data = await getMovieAllAPI({ tenPhim: searchText });
      setListMovie(data);
    } catch (error) {
      toast.error("Movie search failed");
      throw error;
    }
  };

  useEffect(() => {
    fetchListMovie();
  }, []);

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-4">Movie Management</h3>
      <button
        onClick={onNavigateToAddMovie}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Add Movie
      </button>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search Tên Phim"
          onChange={onChangeInput}
          className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchSearchMovie}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
      <div className="w-full h-[630px]">
        <DataGrid
          rows={listMovie}
          getRowId={(row) => row.maPhim}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      </div>
    </div>
  );
}

export default MovieManagementPage;
