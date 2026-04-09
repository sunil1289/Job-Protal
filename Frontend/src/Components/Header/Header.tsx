
import { Burger, Button, Drawer, Switch } from "@mantine/core";
import {
  IconBriefcaseFilled,
  IconMoonStars,
  IconSun,
  IconX,
} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeProfile } from "../Slices/ProfileSlice";
import { getProfile } from "../services/ProfileService";
import NotificationMenu from "./NotificationMenu";
import { jwtDecode } from "jwt-decode";
import { setUser, removeUser } from "../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { name: "Find Jobs", url: "find-jobs" },
  { name: "Find Talent", url: "find-talent" },
  { name: "Post Job", url: "post-job/0" },
  { name: "Posted jobs", url: "posted-jobs/0" },
  { name: "Job History", url: "job-history" },
  { name: "SignUp", url: "signup" },
];

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);

  const [opened, { open, close }] = useDisclosure(false);
  const [dark, setDark] = useState(false);

  // ✅ Apply saved theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = (value: boolean) => {
    setDark(value);

    if (value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        dispatch(setUser({ ...decoded, email: decoded.sub }));
      } catch (err) {
        dispatch(removeUser());
      }
    } else {
      dispatch(removeUser());
    }

    if (user?.profileId) {
      getProfile(user.profileId)
        .then((res) => dispatch(changeProfile(res)))
        .catch((err) => console.log(err));
    }
  }, [token]);

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="w-full bg-mine-shaft-100 dark:bg-mine-shaft-900 text-black dark:text-mine-shaft-200 px-6 h-20 flex justify-between items-center font-['poppins']">
      <div className="flex gap-2 items-center text-bright-sun-500">
        <IconBriefcaseFilled className="h-9 w-9" stroke={2} />
        <div className="text-2xl xs-mx:hidden font-semibold">JobZel</div>
      </div>

      {NavLinks()}

      <div className="flex gap-5 items-center">
        <Switch
          checked={dark}
          onChange={(event) => toggleDarkMode(event.currentTarget.checked)}
          size="md"
          color="dark.4"
          onLabel={<IconSun size={16} stroke={2.5} color="yellow" />}
          offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
        />

        {user && user.email ? (
          <ProfileMenu />
        ) : (
<Button
  variant="subtle"
  color="brightSun.5"
  onClick={() => navigate("/login")}
  className="
    border-2 border-mine-shaft-900 dark:border-transparent
    bg-transparent
    text-bright-sun-500
    rounded-md
    transition-all duration-200
  "
>
  Login
</Button>
        )}

        {user && <NotificationMenu />}

        <Burger
          className="bs:hidden"
          opened={opened}
          onClick={open}
          aria-label="Toggle navigation"
        />

        <Drawer
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          position="right"
          opened={opened}
          onClose={close}
          closeButtonProps={{
            icon: <IconX size={30} />,
          }}
        >
          <div className="flex flex-col gap-6 items-center">
            {links.map((link, index) => (
              <div key={index}>
                <Link
                  className="hover:text-bright-sun-400 text-xl"
                  to={`/${link.url}`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
