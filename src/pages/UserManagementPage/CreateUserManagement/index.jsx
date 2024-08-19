import * as Yup from "yup";
import ButtonUI from "../../../components/Button";
import eye from "../../../assets/icons/eye.svg";
import eyeClose from "../../../assets/icons/eyeClose.svg";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { createAccountAPI } from "../../../redux/services/accountAPI";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { regexPassword } from "../../../utils";

function CreateUserManagement() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      phoneNumber: Yup.string()
        .max(10, "Phone number must have 10 digits")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          regexPassword,
          "Password must contain one uppercase, one lowercase, one number, and one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await createAccountAPI(values);
        toast.success("Registration successful");
        navigate("/user-management");
      } catch (error) {
        toast.error("Registration failed");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="p-8 bg-white rounded shadow-md">
      <div className="text-center">
        <i className="fa fa-lock text-white bg-orange-600 rounded-full w-11 h-11 leading-11 text-xl mb-4"></i>
      </div>
      <h4 className="text-center mb-6 text-lg font-bold">Add Account</h4>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className="text-left">
          Full Name
        </label>
        <Input
          type="text"
          id="name"
          {...formik.getFieldProps("name")}
          className="border rounded p-2 mb-3 bg-white"
          placeholder="Enter your name"
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="text-red-500 mb-4">Full name cannot be empty</p>
        ) : null}

        <label htmlFor="phone" className="text-left">
          Phone
        </label>
        <Input
          type="text"
          id="phone"
          {...formik.getFieldProps("phoneNumber")}
          className="border rounded p-2 mb-3 bg-white"
          placeholder="Enter your phone"
          required
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <p className="text-red-500 mb-4">Phone number must have 10 digits</p>
        ) : null}

        <label htmlFor="email" className="text-left">
          Email
        </label>
        <Input
          type="text"
          id="email"
          {...formik.getFieldProps("email")}
          className="border rounded p-2 mb-3 bg-white"
          placeholder="Enter your email"
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 mb-4">Email in correct format</p>
        ) : null}

        <label htmlFor="password" className="text-left">
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            {...formik.getFieldProps("password")}
            className="w-full border rounded p-2 bg-white"
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

          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 mb-4">
              Password must contain at least 1 uppercase letter, 1 lowercase
              letter, 1 special character, 1 number
            </p>
          ) : null}
        </div>
        <div className="relative mt-1">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
            className="w-full border rounded p-2 bg-white"
            placeholder="Confirm your password"
            required
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
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="text-red-500 mb-4">Passwords do not match</p>
        ) : null}

        <div className="text-center mt-3">
          <ButtonUI type="submit" width={'100%'} title="Create Account" disabled={isLoading} />
        </div>
      </form>
    </div>
  );
}

export default CreateUserManagement;
