import "tailwindcss/tailwind.css";
import * as Yup from "yup";
import eye from "../../../assets/icons/eye.svg";
import eyeClose from "../../../assets/icons/eyeClose.svg";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  getAccountAPI,
  updateAccountAPI,
} from "../../../redux/services/accountAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { regexPassword } from "../../../utils";
import { Input } from "antd";
import ButtonUI from "../../../components/Button";

function EditUserManagement() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { taiKhoan } = useParams();
  const navigate = useNavigate();

  // Fetch initial data and set form values
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccountAPI(taiKhoan);
        formik.setValues({
          name: data.name,
          password: data.password,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      } catch (error) {
        toast.error("Information not accessible");
        throw error;
      }
    };
    fetchAccount();
  }, [taiKhoan]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
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
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await updateAccountAPI(values);
        toast.success("Information updated successfully");
        navigate("/user-management");
      } catch (error) {
        toast.error("Update information failed");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="p-8">
      <div className="text-center">
        <i className="fa fa-user-edit bg-orange-500 text-white rounded-full w-11 h-11 flex items-center justify-center text-lg mb-3"></i>
      </div>
      <h4 className="text-center text-xl font-semibold mb-4">
        Update account information
      </h4>

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

        <div className="text-center mt-3">
          <ButtonUI type="submit" width={'100%'} title="Update Account" disabled={isLoading} />
        </div>
      </form>
    </div>
  );
}

export default EditUserManagement;
