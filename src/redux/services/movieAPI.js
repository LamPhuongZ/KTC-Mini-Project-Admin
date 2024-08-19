import instance from "../../config/index";

export const getMovieAllAPI = async (payload) => {
  try {
    let url = `/QuanLyPhim/LayDanhSachPhim`;
    if (payload?.tenPhim) {
      url += `&tenPhim=${payload.tenPhim}`;
    }

    const response = await instance.get(url);
    return response.data.content;
  } catch (error) {
    error.response.data.content;
  }
};

//API xoá phim
export const deleteMovieAPI = async (maPhim) => {
  try {
    const response = await instance.delete(
      `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
    );
    // return true;
    return response;
  } catch (error) {
    throw error.response.data.content;
  }
};

//API thêm phim
export const createMovieAPI = async (movie) => {
  try {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }

    await instance.post(`/QuanLyPhim/ThemPhimUploadHinh`, formData);
  } catch (error) {
    throw error.response.data.content;
  }
};

//API lấy thông tin phim từ server để hiện thị ra
export const getMovieInfoAPI = async (movieId) => {
  try {
    const response = await instance.get(
      `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
};

//API cập nhật phim, upload hình ảnh
export const updateMoiveAPI = async (movie) => {
  try {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }

    await instance.post(`/QuanLyPhim/CapNhatPhimUpload`, formData);
    return true;
  } catch (error) {
    throw error.response.data.content;
  }
};
