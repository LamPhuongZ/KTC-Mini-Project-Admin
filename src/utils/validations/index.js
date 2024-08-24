import * as Yup from "yup";

// Regex mật khẩu
export const regexPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/;

// Xác thực cho trường họ tên
export const nameValidationSchema = Yup.string()
  .required("Full name is required");

// Xác thực cho số điện thoại
export const phoneNumberValidationSchema = Yup.string()
  .matches(/^\d{10}$/, "Phone number must have 10 digits")
  .required("Phone number is required");

// Xác thực cho email
export const emailValidationSchema = Yup.string()
  .email("Invalid email address")
  .required("Email is required");

// Xác thực cho mật khẩu
export const passwordValidationSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(
    regexPassword,
    "Password must contain one uppercase, one lowercase, one number, and one special character"
  )
  .required("Password is required");

// Xác thực cho xác nhận mật khẩu
export const confirmPasswordValidationSchema = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm password is required");

// Xác thực chung cho người dùng
export const userValidationSchema = Yup.object({
  name: nameValidationSchema,
  phoneNumber: phoneNumberValidationSchema,
  email: emailValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
});

export const loginValidationSchema = Yup.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});


// Xác thực cho trường tên phim
export const movieNameValidationSchema = Yup.string()
  .required("Movie Name is required");

// Xác thực cho trường mô tả phim
export const movieDescriptionValidationSchema = Yup.string()
  .required("Description is required");

// Xác thực cho trường ngày phát hành phim
export const releaseDateValidationSchema = Yup.date()
  .required("Release Date is required");

// Xác thực cho trường dàn diễn viên
export const castValidationSchema = Yup.string()
  .required("Cast is required");

// Xác thực cho trường trailer
export const trailerValidationSchema = Yup.string()
  .required("Trailer is required");

// Xác thực cho trường đánh giá phim
export const ratingValidationSchema = Yup.number()
  .required("Rating is required");

// Xác thực chung cho phim
export const movieValidationSchema = Yup.object({
  name: movieNameValidationSchema,
  description: movieDescriptionValidationSchema,
  releaseDate: releaseDateValidationSchema,
  cast: castValidationSchema,
  trailer: trailerValidationSchema,
  rating: ratingValidationSchema,
});
