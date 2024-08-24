import ButtonUI from "../../../components/button";
import eye from "../../../assets/icons/eye.svg";
import eyeClose from "../../../assets/icons/eyeClose.svg";
import { Input } from "antd";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccountAPI } from "../../../redux/services/accountAPI";
import { userValidationSchema } from "../../../utils/validations";

function CreateUserManagement() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createAccountAPI(data);
      toast.success("Registration successful");
      navigate("/user-management");
    } catch (error) {
      toast.error("Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md">
      <div className="text-center">
        <i className="fa fa-lock text-white bg-orange-600 rounded-full w-11 h-11 leading-11 text-xl mb-4 pt-2"></i>
      </div>
      <h4 className="text-center mb-6 text-lg font-bold">Add Account</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="text-left">
          Full Name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="name"
              {...field}
              className="border rounded p-2 mb-3 bg-white"
              placeholder="Enter your name"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 mb-4">{errors.name.message}</p>
        )}

        <label htmlFor="phone" className="text-left">
          Phone
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="phone"
              {...field}
              className="border rounded p-2 mb-3 bg-white"
              placeholder="Enter your phone"
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 mb-4">{errors.phoneNumber.message}</p>
        )}

        <label htmlFor="email" className="text-left">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="email"
              {...field}
              className="border rounded p-2 mb-3 bg-white"
              placeholder="Enter your email"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 mb-4">{errors.email.message}</p>
        )}

        <label htmlFor="password" className="text-left">
          Password
        </label>
        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                {...field}
                className="w-full border rounded p-2 bg-white"
                placeholder="Enter your password"
              />
            )}
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

        <label htmlFor="confirmPassword" className="text-left">
          Confirm Password
        </label>
        <div className="relative">
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...field}
                className="w-full border rounded p-2 bg-white"
                placeholder="Confirm your password"
              />
            )}
          />
          <button
            className="absolute top-2.5 right-2"
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            <img src={showConfirmPassword ? eye : eyeClose} alt="icon-eye" />
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 mb-4">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="text-center mt-3">
          <ButtonUI type="submit" title="Create Account" disabled={isLoading} />
        </div>
      </form>
    </div>
  );
}

export default CreateUserManagement;
