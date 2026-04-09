import { Menu, Avatar, Switch } from "@mantine/core";
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { setJwt } from "../Slices/JwtSlice";

const ProfileMenu = () => {
  const [checked, setChecked] = useState(false);
  const fullUrl = window.location.href;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [opened, setOpened] = useState(false);

  // ✅ Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setChecked(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ✅ Apply theme when switch changes
  useEffect(() => {
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [checked]);

  const handleLogout = () => {
    dispatch(removeUser());

    if (fullUrl === "http://localhost:5173/profile") {
      navigate("/");
    }
  };

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center cursor-pointer gap-2">
          <div className="xs-mx:hidden">{user.name}</div>
          <Avatar
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : null
            }
            color="blue"
            alt="profile img"
          />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>

        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>

        <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>

   

        <Menu.Divider />

        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
