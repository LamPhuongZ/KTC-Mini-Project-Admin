import {
  API_DELETE_MOVIE,
  API_GET_MOVIE_BY_ID,
  API_GET_MOVIE_BY_NAME,
  API_GET_MOVIES_ALL,
  API_POST_MOVIE,
  API_PUT_MOVIE,
} from "../../utils/settings/apiKey";
import instance from "../../config/index";

export const getMovieAllAPI = async () => {
  try {
    const response = await instance.get(API_GET_MOVIES_ALL);

    return {
      items: response.data.data.movies,
      totalCount: response.data.totalCount,
    };
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// delete movie
export const deleteMovieAPI = async (movieId) => {
  try {
    const response = await instance.delete(`${API_DELETE_MOVIE}?id=${movieId}`);
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

    console.log("Movie API", movie);
    

    for (let key in movie) {
      if (
        movie[key] !== null &&
        (key !== "posterImage" || key !== "bannerImage")
      ) {
        formData.append(key, movie[key]);
      }
    }

    if (
      (movie.posterImage || movie.bannerImage) &&
      (movie.posterImage instanceof File || movie.bannerImage instanceof File)
    ) {
      formData.append("posterImage", movie.posterImage);
      formData.append("bannerImage", movie.bannerImage);
    }

    const response = await instance.post(API_POST_MOVIE, formData);

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
    const response = await instance.get(`${API_GET_MOVIE_BY_ID}?id=${movieId}`);
    return response.data;
  } catch (error) {
    console.log("API call failed", error);
    throw error;
  }
};

// get movie data by name
export const getMovieByNameAPI = async (movieName) => {
  try {
    const response = await instance.get(
      `${API_GET_MOVIE_BY_NAME}?title=${movieName}`
    );
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
      if (
        movie[key] !== null &&
        (key !== "posterImage" || key !== "bannerImage")
      ) {
        formData.append(key, movie[key]);
      }
    }

    if (
      (movie.posterImage || movie.bannerImage) &&
      (movie.posterImage instanceof File || movie.bannerImage instanceof File)
    ) {
      formData.append("posterImage", movie.posterImage);
      formData.append("bannerImage", movie.bannerImage);
    }

    const response = await instance.put(
      `${API_PUT_MOVIE}?id=${movieId}`,
      formData
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );

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
