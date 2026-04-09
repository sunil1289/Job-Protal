

import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Skills = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const matches = useMediaQuery("(max-width: 475px)");
  const profile = useSelector((state: any) => state.profile);
  const [skills, setSkills] = useState<string[]>([]);

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills);
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    dispatch(changeProfile({ ...profile, skills }));
    successNotification("Success", "Skills updated Successfully");
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between text-mine-shaft-900 dark:text-mine-shaft-100">
        Skills
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
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add skill"
          splitChars={[",", " ", "|"]}
          classNames={{
            label:
              "!text-mine-shaft-700 dark:!text-mine-shaft-300 !font-medium",
            input:
              "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-500 focus:!border-bright-sun-400",
            pill: "!bg-bright-sun-50 dark:!bg-mine-shaft-700 !text-bright-sun-600 dark:!text-bright-sun-400",
          }}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, id: any) => (
            <div
              key={id}
              className="bg-bright-sun-300 bg-opacity-15 text-sm font-medium rounded-3xl text-bright-sun-500 dark:text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;