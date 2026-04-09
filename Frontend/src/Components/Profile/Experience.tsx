

import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpInput from "./ExpInput";
import ExpCard from "./ExpCard";
import { useMediaQuery } from "@mantine/hooks";

const Experience = () => {
  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);
  const matches = useMediaQuery("(max-width: 475px)");
  const profile = useSelector((state: any) => state.profile);

  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between text-mine-shaft-900 dark:text-mine-shaft-100">
        Experience
        <div className="flex gap-2">
          <ActionIcon size={matches ? "md" : "lg"} color="brightSun.4" variant="subtle" onClick={() => setAddExp(true)}>
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>
          <ActionIcon
            size={matches ? "md" : "lg"}
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            onClick={() => setEdit((prev) => !prev)}
          >
            {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
          </ActionIcon>
        </div>
      </div>

      {profile?.experiences?.map((expItem: any, index: number) => (
        <ExpCard key={index} idx={index} {...expItem} edit={edit} />
      ))}
      {addExp && <ExpInput setEdit={setAddExp} add />}
    </div>
  );
};

export default Experience;