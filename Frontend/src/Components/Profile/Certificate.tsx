

import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CertificationCard from "./CertiCard";
import CertificationInput from "./CertiInput";
import { useMediaQuery } from "@mantine/hooks";

const Certificate = () => {
  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const matches = useMediaQuery("(max-width: 475px)");
  const profile = useSelector((state: any) => state.profile);

  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between text-mine-shaft-900 dark:text-mine-shaft-100">
        Certifications
        <div>
          <ActionIcon size={matches ? "md" : "lg"} variant="subtle" color="brightSun.4" onClick={() => setAddCerti(true)}>
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>
          <ActionIcon
            size={matches ? "md" : "lg"}
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            onClick={() => setEdit(!edit)}
          >
            {edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
          </ActionIcon>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {profile?.certifications?.map((certify: any, id: any) => (
          <CertificationCard key={id} idx={id} {...certify} edit={edit} />
        ))}
        {addCerti && <CertificationInput setEdit={setAddCerti} />}
      </div>
    </div>
  );
};

export default Certificate;