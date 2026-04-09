

import { Button, Input, LoadingOverlay, PasswordInput } from "@mantine/core";
import { IconAt, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginValidation } from "../services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import { setJwt } from "../Slices/JwtSlice";
import { jwtDecode } from "jwt-decode";
import { successNotification } from "../services/NotificationService";
import { loginUser } from "../services/AuthService";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = { email: "", password: "" };
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      newFormError[key] = LoginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);

    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          dispatch(setJwt(res.jwt));
          try {
            const decoded = jwtDecode(res.jwt);
            dispatch(setUser({ ...decoded, email: decoded.sub }));
          } catch (err) {
            console.log("Failed to decode token", err);
          }
          successNotification("Login Successful", "Redirecting to home page...");
          setTimeout(() => {
            navigate("/");
            setLoading(false);
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          const errorMessage =
            err.response?.data?.errorMessage || err.message || "Something went wrong";
          notifications.show({
            title: "Login failed!",
            message: errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-bright-sun-400",
          });
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />

      <div className="w-1/2 px-20 flex sm-mx:w-full bs-mx:px-10 md-mx:px-5 flex-col gap-3 justify-center bg-white dark:bg-mine-shaft-950 transition-colors duration-300">
        
        <div className="text-2xl font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
          Login
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-mine-shaft-300 dark:border-mine-shaft-700 bg-white dark:bg-mine-shaft-900 focus-within:border-bright-sun-400 transition-colors duration-200">
            <IconAt size={16} className="text-mine-shaft-500 dark:text-mine-shaft-400" />
            <input
              value={data.email}
              onChange={handleChange}
              name="email"
              placeholder="Your email"
              className="flex-1 bg-transparent outline-none text-sm text-mine-shaft-900 dark:text-mine-shaft-100 placeholder:text-mine-shaft-400 dark:placeholder:text-mine-shaft-600"
            />
          </div>
          {formError.email && (
            <span className="text-xs text-red-500">{formError.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300">
            Password <span className="text-red-500">*</span>
          </label>
          <PasswordInput
            value={data.password}
            onChange={handleChange}
            name="password"
            error={formError.password}
            leftSection={<IconLock size={18} stroke={1.5} />}
            placeholder="Strong password"
            classNames={{
              input:
                "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-600 focus:!border-bright-sun-400",
              section: "!text-mine-shaft-500 dark:!text-mine-shaft-400",
            }}
          />
        </div>

        <Button loading={loading} onClick={handleSubmit} variant="filled" color="brightSun.4">
          Login
        </Button>

        <div className="mx-auto capitalize sm-mx:text-sm xs-mx:text-xs text-mine-shaft-700 dark:text-mine-shaft-300">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </div>

        <div
          onClick={open}
          className="hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs text-bright-sun-400 text-center"
        >
          Forgot Password?
        </div>
      </div>

      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;