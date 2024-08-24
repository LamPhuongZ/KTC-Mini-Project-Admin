import instance from "../../config/index";

export const getMovieAllAPI = async () => {
  try {
    const response = await instance.get(`/api/movies/all`);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

export const getMoviePaginationAPI = async (page, pageSize) => {
  try {
    const response = await instance.get(
      `/api/movies?page=${page}&size=${pageSize}`
    );
    return {
      items: response.data,
      totalCount: response.data.data.totalCount,
    };

    // return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// delete movie
export const deleteMovieAPI = async (movieId) => {
  try {
    const response = await instance.delete(`/api/movies/id?id=${movieId}`);
    // return true;
    return response;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// create movie
export const createMovieAPI = async (movie) => {
  try {
    const formData = new FormData();

    for (let key in movie) {
      if (movie[key] !== null && key !== "image") {
        formData.append(key, movie[key]);
      }
    }

    if (movie.image && movie.image instanceof File) {
      formData.append("image", movie.image);
    }

    const response = await instance.post(`/api/movies`, formData);

    // Debugging: Inspect FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    return response;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// get movie data by id
export const getMovieByIdAPI = async (movieId) => {
  try {
    const response = await instance.get(`/api/movies/id?id=${movieId}`);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// get movie data by name
export const getMovieByNameAPI = async (movieName) => {
  try {
    const response = await instance.get(`/api/movies/title?title=${movieName}`);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// update movie with pictures
export const updateMovieAPI = async (movieId, movie) => {
  try {
    const formData = new FormData();

    for (let key in movie) {
      if (movie[key] !== null && key !== "image") {
        formData.append(key, movie[key]);
      }
    }

    if (movie.image && movie.image instanceof File) {
      formData.append("image", movie.image);
    }

    const response = await instance.put(`/api/movies?id=${movieId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Debugging: Inspect FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log("Update API: ", response);

    return response;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};
