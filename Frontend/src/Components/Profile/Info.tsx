
import { ActionIcon, NumberInput } from "@mantine/core";
import fields from "../../Data/Profile";
import { useState } from "react";
import {
  IconBriefcase,
  IconBuilding,
  IconCheck,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Info = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: profile?.jobTitle || "",
      company: profile?.company || "",
      location: profile?.location || "",
      totalExp: profile?.totalExp || 1,
    },
  });

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    dispatch(changeProfile({ ...profile, ...form.getValues() }));
    successNotification("Success", "Profile updated successfully");
  };

  const inputClass = {
    label: "!text-mine-shaft-700 dark:!text-mine-shaft-300 !font-medium",
    input:
      "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-500 focus:!border-bright-sun-400",
  };

  return (
    <>
      <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between items-center text-mine-shaft-900 dark:text-mine-shaft-100">
        {user.name}
        <div className="flex gap-2">
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
        <>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-5">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-5">
            <SelectInput form={form} name="location" {...select[2]} />
            <NumberInput
              withAsterisk
              hideControls
              clampBehavior="strict"
              min={1}
              max={50}
              label="Experience"
              {...form.getInputProps("totalExp")}
              classNames={inputClass}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1 text-lg xs-mx:text-base text-mine-shaft-700 dark:text-mine-shaft-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IconBriefcase size={20} className="text-bright-sun-400" />
              <span>{profile.jobTitle}</span>
            </div>
            <div className="flex items-center gap-2 xs-mx:text-base">
              <IconBuilding size={20} className="text-bright-sun-400" />
              <span>{profile.company}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 xs-mx:text-base">
            <IconMapPin size={20} className="text-bright-sun-400" />
            <span>{profile.location}</span>
          </div>
          <div className="flex gap-2 items-center xs-mx:text-base">
            <IconBriefcase size={20} className="text-bright-sun-400" />
            Experience: {profile.totalExp} Years
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
