


import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const About = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width: 475px)");
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile?.about);
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    dispatch(changeProfile({ ...profile, about }));
    successNotification("Success", "About updated Successfully");
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between text-mine-shaft-900 dark:text-mine-shaft-100">
        About
        <div>
          {edit && (
            <ActionIcon
              size={matches ? "md" : "lg"}
              variant="subtle"
              color="green.8"
              onClick={handleSave}
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            size={matches ? "md" : "lg"}
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            onClick={handleEdit}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>

      {edit ? (
        <Textarea
          label="Description"
          value={about}
          autosize
          minRows={3}
          withAsterisk
          placeholder="Description (Describe yourself)"
          onChange={(e) => setAbout(e.currentTarget.value)}
          classNames={{
            label:
              "!text-mine-shaft-700 dark:!text-mine-shaft-300 !font-medium",
            input:
              "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-500 focus:!border-bright-sun-400",
          }}
        />
      ) : (
        <div className="text-justify text-sm text-mine-shaft-600 dark:text-mine-shaft-300">
          {profile?.about}
        </div>
      )}
    </div>
  );
};

export default About;