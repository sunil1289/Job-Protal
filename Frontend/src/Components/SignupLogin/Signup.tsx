

import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../services/UserService";
import { SignupValidation } from "../services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const Signup = () => {
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
    } else {
      let name = event.target.name,
        value = event.target.value;
      setData({ ...data, [name]: value });
      setFormError({ ...formError, [name]: SignupValidation(name, value) });
      if (name === "password" && data.confirmPassword !== "") {
        if (data.confirmPassword !== value)
          setFormError((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        else setFormError((prev) => ({ ...prev, confirmPassword: "" }));
      }
      if (name === "confirmPassword") {
        if (data.password !== value)
          setFormError({ ...formError, [name]: "Passwords do not match" });
        else setFormError({ ...formError, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFormError[key] = SignupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords do not match";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);

    if (valid) {
      setLoading(true);
      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Registered Successfully",
            message: "Redirecting to login page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            withBorder: true,
            className: "!border-bright-sun-300",
          });
          setTimeout(() => {
            navigate("/login");
            setLoading(false);
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          notifications.show({
            title: "Registration failed!",
            message: err.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-bright-sun-300",
          });
        });
    }
  };

  /* Shared classNames for all inputs */
  const inputClass = {
    input:
      "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-600 focus:!border-bright-sun-400",
    section: "!text-mine-shaft-500 dark:!text-mine-shaft-400",
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
        className="translate-x-1/2"
      />

      <div className="w-1/2 sm-mx:w-full sm-mx:py-20 px-20 bs-mx:px-10 md-mx:px-5 flex flex-col gap-3 justify-center bg-white dark:bg-mine-shaft-950 transition-colors duration-300">
        <div className="text-2xl font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
          Create Account
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            value={data.name}
            onChange={handleChange}
            name="name"
            placeholder="Your name"
            className="px-3 py-2 rounded-md border border-mine-shaft-300 dark:border-mine-shaft-700 bg-white dark:bg-mine-shaft-900 text-sm text-mine-shaft-900 dark:text-mine-shaft-100 placeholder:text-mine-shaft-400 dark:placeholder:text-mine-shaft-600 outline-none focus:border-bright-sun-400 transition-colors duration-200"
          />
          {formError.name && (
            <span className="text-xs text-red-500">{formError.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-mine-shaft-300 dark:border-mine-shaft-700 bg-white dark:bg-mine-shaft-900 focus-within:border-bright-sun-400 transition-colors duration-200">
            <IconAt
              size={16}
              className="text-mine-shaft-500 dark:text-mine-shaft-400"
            />
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
            classNames={inputClass}
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <PasswordInput
            value={data.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            error={formError.confirmPassword}
            leftSection={<IconLock size={18} stroke={1.5} />}
            placeholder="Retype password"
            classNames={inputClass}
          />
        </div>

        {/* Radio */}
        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label={
            <span className="text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300">
              You are? <span className="text-red-500">*</span>
            </span>
          }
        >
          <Group className="flex gap-6 xs-mx:gap-3" mt="xs">
            <Radio
              className="py-4 px-6 sm-mx:py-2 sm-mx:px-4 border has-[:checked]:border-bright-sun-400 border-mine-shaft-300 dark:border-mine-shaft-700 rounded-lg text-mine-shaft-800 dark:text-mine-shaft-200"
              autoContrast
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="py-4 px-6 sm-mx:py-2 sm-mx:px-4 border has-[:checked]:border-bright-sun-400 border-mine-shaft-300 dark:border-mine-shaft-700 rounded-lg text-mine-shaft-800 dark:text-mine-shaft-200"
              autoContrast
              value="EMPLOYER"
              label="Employer"
            />
          </Group>
        </Radio.Group>

        {/* Checkbox */}
        <Checkbox
          autoContrast
          defaultChecked
          classNames={{
            label: "!text-mine-shaft-700 dark:!text-mine-shaft-300",
          }}
          label={
            <>
              I Accept{" "}
              <Anchor className="!text-bright-sun-400 hover:!text-bright-sun-500">
                Terms and Conditions
              </Anchor>
            </>
          }
        />

        <Button
          onClick={handleSubmit}
          loading={loading}
          variant="filled"
          color="brightSun.4"
        >
          Create Account
        </Button>

        <div className="mx-auto sm-mx:text-sm xs-mx:text-xs capitalize text-mine-shaft-700 dark:text-mine-shaft-300">
          Have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
