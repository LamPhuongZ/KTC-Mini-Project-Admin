import instance from "../../config/index";

export const getMovieAllAPI = async () => {
  try {
    const response = await instance.get(`/api/movies`);

    console.log(response.data);

    // return {
    //   items: response.data.data,
    //   // totalCount: response.data.data.totalCount,
    // };

    return response.data;
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
      if (movie[key] !== null && key !== "imageUrl") {
        formData.append(key, movie[key]);
      }
    }

    if (movie.imageUrl && movie.imageUrl instanceof File) {
      formData.append("imageUrl", movie.imageUrl);
    }

    const response = await instance.post(`/api/movies`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(formData);

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
export const updateMovieAPI = async (movie) => {
  try {
    const formData = new FormData();

    for (let key in movie) {
      if (movie[key] !== null && key !== "imageUrl") {
        formData.append(key, movie[key]);
      }
    }

    if (movie.imageUrl && movie.imageUrl instanceof File) {
      formData.append("imageUrl", movie.imageUrl);
    }

    const response = await instance.post(`/api/movies`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};
