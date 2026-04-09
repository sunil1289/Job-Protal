

import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { deleteNotification } from "../services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const CertiCard = (props: any) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width: 475px)");
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let certis = [...profile.certifications];
    certis.splice(props.idx, 1);
    dispatch(changeProfile({ ...profile, certifications: certis }));
    deleteNotification("Success", "Certificate deleted successfully");
  };

  return (
    <div>
      <div className="flex justify-between mb-2 flex-wrap">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-md shrink-0">
            <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold xs-mx:text-sm text-mine-shaft-900 dark:text-mine-shaft-100">
              {props.name}
            </div>
            <div className="text-sm xs-mx:text-xs text-mine-shaft-500 dark:text-mine-shaft-300">
              {props.issuer}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end sm-mx:flex-row sm-mx:gap-2">
            <div className="text-sm xs-mx:text-xs text-mine-shaft-500 dark:text-mine-shaft-300">
              {formatDate(props.issueDate)}
              <div>ID: {props.certificateId}</div>
            </div>
          </div>
          {props.edit && (
            <ActionIcon
              onClick={handleDelete}
              size={matches ? "md" : "lg"}
              color="red.8"
              variant="subtle"
            >
              <IconTrash className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertiCard;