import "tailwindcss/tailwind.css";
import eye from "../../../assets/icons/eye.svg";
import eyeClose from "../../../assets/icons/eyeClose.svg";
import ButtonUI from "../../../components/button";
import { Input } from "antd";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { userValidationSchema } from "../../../utils/validations";
import { getAccountAPI, updateAccountAPI } from "../../../redux/services/accountAPI";
import { yupResolver } from '@hookform/resolvers/yup';

function EditUserManagement() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: ""
    }
  });

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccountAPI(account);
        reset({
          name: data.name,
          password: data.password,
          email: data.email,
          phoneNumber: data.phoneNumber
        });
      } catch (error) {
        toast.error("Information not accessible");
        throw error;
      }
    };
    fetchAccount();
  }, [account, reset]);

  const onSubmit = async (values) => {
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
  };

  return (
    <div className="p-8">
      <div className="text-center">
        <i className="fa fa-user-edit text-white bg-orange-600 rounded-full w-11 h-11 leading-11 text-xl mb-4 pt-2"></i>
      </div>
      <h4 className="text-center text-xl font-semibold mb-4">
        Update account information
      </h4>

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
              disabled
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

        <div className="text-center mt-3">
          <ButtonUI type="submit" title="Update Account" disabled={isLoading} />
        </div>
      </form>
    </div>
  );
}

export default EditUserManagement;
