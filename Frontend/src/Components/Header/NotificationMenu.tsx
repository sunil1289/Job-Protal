


import { Indicator, Menu, Notification } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNotifications, readNotifications } from "../services/NotiService";
import { useNavigate } from "react-router";

const NotificationMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    if (!user?.id) return;
    getNotifications(user.id)
      .then((res) => {
        console.log("NOTIFICATIONS:", res);
        setNotifications(res?.data || res || []);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const unread = (index: any) => {
    let notis = [...notifications];
    notis = notis.filter((_: any, i: any) => i != index);
    setNotifications(notis);
    readNotifications(notifications[index].id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Menu shadow="md" width={260}>
      <Menu.Target>
        <div className="bg-mine-shaft-100 dark:bg-mine-shaft-800 p-1.5 rounded-full cursor-pointer transition-colors duration-200">
          <Indicator
            disabled={notifications.length <= 0}
            color="brightSun.4"
            size={6}
            offset={4}
            processing
          >
            <IconBell
              stroke={1.5}
              className="text-mine-shaft-600 dark:text-mine-shaft-300"
            />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown
        className="!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-200 dark:!border-mine-shaft-700 p-2"
      >
        <div className="flex flex-col gap-1">
          {notifications.map((noti: any, idx: any) => (
            <Notification
              key={idx}
              onClick={() => {
                navigate(noti.route);
                unread(idx);
                setOpened(false);
              }}
              onClose={() => unread(idx)}
              icon={<IconCheck size={14} />}
              color="teal"
              title={
                <span className="text-xs font-medium text-mine-shaft-800 dark:text-mine-shaft-100">
                  {noti.action}
                </span>
              }
              classNames={{
                root: "p-2 !bg-mine-shaft-50 dark:!bg-mine-shaft-800 hover:!bg-mine-shaft-100 dark:hover:!bg-mine-shaft-700 cursor-pointer !border-mine-shaft-200 dark:!border-mine-shaft-700 transition-colors duration-200",
                description: "!text-xs !text-mine-shaft-600 dark:!text-mine-shaft-300",
                closeButton:
                  "!text-mine-shaft-500 dark:!text-mine-shaft-400 hover:!bg-mine-shaft-200 dark:hover:!bg-mine-shaft-600",
              }}
            >
              <span className="text-xs text-mine-shaft-600 dark:text-mine-shaft-300">
                {noti.message}
              </span>
            </Notification>
          ))}

          {notifications.length === 0 && (
            <div className="text-center text-xs py-2 text-mine-shaft-500 dark:text-mine-shaft-400">
              No notifications
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;