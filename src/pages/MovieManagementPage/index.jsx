import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Space, Table } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteMovieAPI,
  getMovieAllAPI,
  getMovieByNameAPI,
  // getMoviePaginationAPI,
} from "../../redux/services/movieAPI";
import ButtonUI from "../../components/button";
import SearchForm from "../../components/SearchForm";

function MovieManagementPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 100  
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="Movie Poster"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Movie Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400
    },
    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
      width: 100
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <div className="flex items-center">
            <button
              onClick={() => onNavigateToEditMovie(record.id)}
              className="text-green-500 text-2xl mr-4 hover:opacity-80 transition"
            >
              <EditOutlined />
            </button>
            <button
              onClick={() => onDeleteMovie(record.id)}
              className="text-red-500 text-2xl hover:opacity-80 transition"
            >
              <DeleteOutlined />
            </button>
          </div>
        </Space>
      ),
    },
  ];

  const fetchMovies = async () => {
    try {
      // const response = await getMoviePaginationAPI(page, pageSize);
      // setMovies(response.items.data.movies);
      // setTotalRows(response.totalCount);

      const response = await getMovieAllAPI();
      setMovies(response.data);
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
        setTotalRows(response.totalCount);
        setPage(1); // Reset trang về 1 khi thực hiện tìm kiếm
      } else {
        // fetchMovies(page, pageSize);
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
      // fetchMovies(page, pageSize);
      fetchMovies();
    } catch (error) {
      toast.error("Movie deletion failed");
      console.error(error);
    }
  };

  const onNavigateToEditMovie = (movieId) => {
    navigate(`/movie-management/edit/${movieId}`);
  };

  // useEffect(() => {
  //   fetchMovies(page, pageSize);
  // }, [page, pageSize]);

  useEffect(() => {
    fetchMovies();
  }, []);

  // useEffect(() => {
  //   if (searchText) {
  //     fetchSearchMovie(searchText);
  //   } else {
  //     fetchMovies(page, pageSize);
  //   }
  // }, [page, pageSize, searchText]);

  useEffect(() => {
    if (searchText) {
      fetchSearchMovie(searchText);
    } else {
      fetchMovies();
    }
  }, [searchText]);

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

      <div className="w-full h-[300px]">
        <Table
          columns={columns}
          dataSource={movies}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: totalRows,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            onChange: (newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            },
          }}
          rowKey="id"
          className="custom-table"
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
}

export default MovieManagementPage;
