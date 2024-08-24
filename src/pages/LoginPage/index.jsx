import eye from "../../assets/icons/eye.svg";
import eyeClose from "../../assets/icons/eyeClose.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { loginValidationSchema } from "../../utils/validations";
import { loginRequestAction } from "../../redux/slices/userAdminSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();


  const { token } = useSelector((state) => {
    return state.userReducer;
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    email: "",
    password: "",
  });

  const onSubmit = async (values) => {
    dispatch(
      loginRequestAction({
        email: values.email,
        password: values.password,
      })
    );
  };

  if (token) {
    const url = searchParams.get("redirectUrl") || "/";
    return <Navigate to={url} />;
  }

  return (
    <section className="background flex flex-col justify-center items-center self-stretch gap-8 relative">
      <div className="w-1/3 h-2/4 flex flex-col justify-center items-center gap-2 rounded bg-white absolute">
        <h1 className="text-3xl font-bold">Login to your account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="formLogin"
          className="w-80 flex flex-col gap-2"
        >
          <label htmlFor="email" className="text-left">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className="border rounded p-2 mb-3"
            placeholder="Enter your email"
            required
          />
          {errors.email && (
            <p className="text-red-500 mb-4">{errors.email.message}</p>
          )}
          <label htmlFor="password" className="text-left">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className="w-full border rounded p-2"
              placeholder="Enter your password"
              required
            />
            <button
              className="absolute top-2.5 right-2"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              <img src={showPassword ? eye : eyeClose} alt="icon-eye" />
            </button>
            {errors.password && (
              <p className="text-red-500 mb-4">{errors.password.message}</p>
            )}
          </div>
          <button
            className="bg-pink-500 text-white rounded p-2"
            disabled={!isValid || !isDirty}
          >
            Login Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
