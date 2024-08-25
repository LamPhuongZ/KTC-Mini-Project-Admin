import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminTemplate from "./templates/AdminTemplate";
import HomePage from "./pages/HomePage";
import UserManagementPage from "./pages/UserManagementPage";
import CreateUserManagement from "./pages/UserManagementPage/CreateUserManagement";
import BookingManagementPage from "./pages/BookingManagementPage";
import MovieManagementPage from "./pages/MovieManagementPage";
import CreateMovieManagement from "./pages/MovieManagementPage/CreateMovieManagement";
import EditMovieManagement from "./pages/MovieManagementPage/EditMovieManagement";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route trang chủ */}
          <Route path="/" element={<AdminTemplate />}>
            {/* Route home */}
            <Route index element={<HomePage />} />

            {/* Danh sách người dùng - Tạo người dùng */}
            <Route path="user-management">
              <Route index element={<UserManagementPage />} />
              <Route path="create" element={<CreateUserManagement />} />
            </Route>

            {/* Danh sách phim - Tạo Phim - Edit Phim */}
            <Route path="movie-management">
              <Route index element={<MovieManagementPage />} />
              <Route path="create" element={<CreateMovieManagement />} />
              <Route path="edit/:movieId" element={<EditMovieManagement />} />
            </Route>

            {/* Tạo Lịch Chiếu */}
            <Route path="booking-management">
              <Route index element={<BookingManagementPage />} />
            </Route>
          </Route>

          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
