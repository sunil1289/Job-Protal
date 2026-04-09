


import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { deleteNotification } from "../services/NotificationService";

const ExpCard = (props: any) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.idx, 1);
    dispatch(changeProfile({ ...profile, experiences: exp }));
    deleteNotification("Success", "Experience deleted successfully");
  };

  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between mb-2 gap-2 flex-wrap">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
              {props.title}
            </div>
            <div className="text-sm text-mine-shaft-500 dark:text-mine-shaft-300">
              {props.company} &bull; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm self-end text-mine-shaft-500 dark:text-mine-shaft-300">
          {formatDate(props.startDate)} –{" "}
          {props.working ? "Present" : formatDate(props.endDate)}
        </div>
      </div>
      <div className="text-sm xs-mx:text-xs text-mine-shaft-600 dark:text-mine-shaft-300 text-justify">
        {props.description}
      </div>
      <div className="flex gap-5">
        <Button onClick={() => setEdit(true)} color="brightSun.4" variant="outline">Edit</Button>
        <Button onClick={handleDelete} color="red.8" variant="outline">Delete</Button>
      </div>
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
};

export default ExpCard;