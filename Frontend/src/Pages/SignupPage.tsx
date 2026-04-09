

import { IconArrowNarrowLeft, IconBriefcaseFilled } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router";
import Signup from "../Components/SignupLogin/Signup";
import Login from "../Components/SignupLogin/Login";
import { Button } from "@mantine/core";

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden sm-mx:overflow-y-auto relative bg-white dark:bg-mine-shaft-950 transition-colors duration-300">
      <Button
        onClick={() => navigate("/")}
        className="!absolute left-4 top-3 z-10"
        leftSection={<IconArrowNarrowLeft />}
        variant="light"
        color="brightSun.4"
      >
        Home
      </Button>

      <div
        className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${
          location.pathname === "/signup"
            ? "-translate-x-1/2 sm-mx:-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <Login />

        <div
          className={`w-1/2 h-full sm-mx:hidden bg-mine-shaft-100 dark:bg-mine-shaft-900 border-y border-mine-shaft-200 dark:border-mine-shaft-800 transition-all ease-in-out duration-500 ${
            location.pathname === "/signup"
              ? "rounded-r-[200px]"
              : "rounded-l-[200px]"
          } flex flex-col items-center justify-center gap-5`}
        >
          <div className="flex gap-2 items-center text-bright-sun-500 dark:text-bright-sun-400">
            <IconBriefcaseFilled className="h-16 w-16" stroke={2} />
            <div className="text-5xl bs-mx:text-4xl md-mx:text-3xl font-semibold">
              <Link to="/">JobZel</Link>
            </div>
          </div>
          <div className="text-2xl md-mx:text-lg font-semibold text-mine-shaft-600 dark:text-mine-shaft-300">
            Discover your perfect job match
          </div>
        </div>

        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;