

import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const baseStyle = { maxWidth: "400px" };

const successNotification = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    withCloseButton: true,
    icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
    withBorder: true,
    style: baseStyle,
    className: "!border-bright-sun-400 !bg-white dark:!bg-mine-shaft-900",
    classNames: {
      title: "!text-mine-shaft-900 dark:!text-mine-shaft-100 !font-semibold",
      description: "!text-mine-shaft-600 dark:!text-mine-shaft-300",
      closeButton:
        "!text-mine-shaft-500 dark:!text-mine-shaft-400 hover:!bg-mine-shaft-100 dark:hover:!bg-mine-shaft-800",
    },
  });
};

const deleteNotification = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    withCloseButton: true,
    icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
    withBorder: true,
    color: "red",
    style: baseStyle,
    className: "!border-red-500 !bg-white dark:!bg-mine-shaft-900",
    classNames: {
      title: "!text-mine-shaft-900 dark:!text-mine-shaft-100 !font-semibold",
      description: "!text-mine-shaft-600 dark:!text-mine-shaft-300",
      closeButton:
        "!text-mine-shaft-500 dark:!text-mine-shaft-400 hover:!bg-mine-shaft-100 dark:hover:!bg-mine-shaft-800",
    },
  });
};

const errorNotification = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    withCloseButton: true,
    icon: <IconX style={{ width: "90%", height: "90%" }} />,
    color: "red",
    withBorder: true,
    style: baseStyle,
    className: "!border-red-500 !bg-white dark:!bg-mine-shaft-900",
    classNames: {
      title: "!text-mine-shaft-900 dark:!text-mine-shaft-100 !font-semibold",
      description: "!text-mine-shaft-600 dark:!text-mine-shaft-300",
      closeButton:
        "!text-mine-shaft-500 dark:!text-mine-shaft-400 hover:!bg-mine-shaft-100 dark:hover:!bg-mine-shaft-800",
    },
  });
};

export { successNotification, errorNotification, deleteNotification };
