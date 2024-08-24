import SearchForm from "../../components/SearchForm";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { rows } from "./data/data";

function BookingManagementPage() {
  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 50,
      headerClassName: "font-bold",
    },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.showtime.movie.imageUrl}
          alt={params.row.showtime.movie.name}
          className="w-24 h-16 object-cover"
        />
      ),
      headerClassName: "font-bold",
    },
    {
      field: "movieName",
      headerName: "Movie Name",
      width: 200,
      renderCell: (params) => <span>{params.row.showtime.movie.name}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      headerClassName: "font-bold",
      renderCell: (params) => <span>{params.row.user.name}</span>,
    },
    {
      field: "priceBooking",
      headerName: "Price",
      width: 100,
      renderCell: (params) => <span>{params.row.price}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "statusBooking",
      headerName: "Status",
      width: 100,
      renderCell: (params) => <span>{params.row.status}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "bookingTime",
      headerName: "Booking Time",
      width: 200,
      renderCell: (params) => <span>{params.row.bookingTime}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "seatNumber",
      headerName: "Seat Number",
      width: 150,
      renderCell: (params) => <span>{params.row.seat.seatNumber}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "nameHall",
      headerName: "Hall",
      width: 100,
      renderCell: (params) => <span>{params.row.seat.hall.name}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "showtimeDate",
      headerName: "Showtime Date",
      width: 150,
      renderCell: (params) => <span>{params.row.showtime.showtimeDate}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 100,
      renderCell: (params) => <span>{params.row.showtime.startTime}</span>,
      headerClassName: "font-bold",
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
      renderCell: (params) => <span>{params.row.showtime.duration}</span>,
      headerClassName: "font-bold",
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      headerClassName: "font-bold",
      renderCell: () => (
        <div className="flex items-center">
          <button
            // onClick={() => onNavigateToEditMovie(params.row.id)}
            className="text-green-500 text-2xl mr-4 hover:opacity-80 transition"
          >
            <EditOutlined />
          </button>
          <button
            // onClick={() => onDeleteMovie(params.row.id)}
            className="text-red-500 text-2xl hover:opacity-80 transition"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
        <SearchForm
          placeholder="Search...."
          className="ml-4"
          // onClick={fetchSearchMovie}
        />
      </div>

      <div className="w-full h-[630px]">
        <DataGrid
          rows={rows}
          getRowId={(row) => row.id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      </div>
    </div>
  );
}

export default BookingManagementPage;
