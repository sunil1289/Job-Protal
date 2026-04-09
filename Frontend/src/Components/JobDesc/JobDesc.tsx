
import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { card } from "../../Data/JobDescData";
import DOMPurify from "dompurify";
import { timeAgo } from "../services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../services/JobService";
import {
  errorNotification,
  successNotification,
} from "../services/NotificationService";

const JobDesc = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [applied, setApplied] = useState(false);

  const data = DOMPurify.sanitize(props.description);

  const handleSaveJob = () => {
    let savedJobs: any = [...profile.savedJobs];
    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    dispatch(changeProfile({ ...profile, savedJobs }));
  };

  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) => applicant.applicantId == user.id
      ).length > 0
    ) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [props]);

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then(() => successNotification("Closed", "Job closed successfully"))
      .catch((err) =>
        errorNotification("Error", err.response.data.errorMessage)
      );
  };

  return (
    <div className="w-2/3 p-4 bs-mx:w-full">

      {/* Header */}
      <div className="flex justify-between flex-wrap mb-2">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-xl flex shrink-0">
            <img
              className="h-14 xs-mx:h-10 xs-mx:w-10"
              src={`/Icons/${props.company}.png`}
              alt={props.company}
            />
          </div>
          <div>
            <div className="font-semibold text-2xl xs-mx:text-xl text-mine-shaft-900 dark:text-mine-shaft-100">
              {props.jobTitle}
            </div>
            <div className="text-lg text-mine-shaft-500 dark:text-mine-shaft-300 flex flex-wrap xs-mx:text-base">
              <span>{props.company} &bull; </span>
              <span>{timeAgo(props.postTime)} &bull; </span>
              <span>
                {props.applicants ? props.applicants.length : 0} Applicants
              </span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 items-center sm-mx:my-5 sm-mx:w-full sm-mx:[&>button]:w-1/2">
          {(props.edit || !applied) && (props.edit || !applied) && (
            <Link to={props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`}>
              <Button variant="light" size="sm" color="brightSun.4">
                {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}

          {!props.edit && applied && (
            <Button color="green.8" size="sm" variant="light">
              Applied
            </Button>
          )}

          {props.edit && !props.closed ? (
            <Button color="red.4" size="sm" variant="outline" onClick={handleClose}>
              Close
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              className="text-bright-sun-400 cursor-pointer"
              stroke={1.5}
              onClick={handleSaveJob}
            />
          ) : (
            <IconBookmark
              className="text-mine-shaft-400 dark:text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer transition-colors duration-200"
              stroke={1.5}
              onClick={handleSaveJob}
            />
          )}
        </div>
      </div>

      <Divider my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

      {/* Job Details Cards */}
      <div className="flex justify-between gap-4 sm-mx:flex-wrap">
        {card.map((item: any, index: number) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              color="brightSun.4"
              className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8"
              variant="light"
              radius="xl"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-500 dark:text-mine-shaft-300 xs-mx:text-sm">
              {item.name}
            </div>
            <div className="text-base font-semibold xs-mx:text-sm text-mine-shaft-900 dark:text-mine-shaft-100">
              {props ? props[item.id] : "NA"}
              {item.id == "packageOffered" && <> LPA</>}
            </div>
          </div>
        ))}
      </div>

      <Divider my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

      {/* Required Skills */}
      <div>
        <div className="text-xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
          Required Skills
        </div>
        <div className="flex flex-wrap gap-2">
          {props?.skillsRequired?.map((skill: any, index: number) => (
            <ActionIcon
              key={index}
              color="brightSun.4"
              className="!h-fit !w-fit font-medium !text-sm xs-mx:!text-xs"
              variant="light"
              radius="xl"
              p="xs"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>

      <Divider my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

      {/* About Job */}
      <div className="font-semibold text-xl mb-2 text-mine-shaft-900 dark:text-mine-shaft-100">
        About Job
      </div>
      <div
        className="[&_h4]:text-xl [&_*]:text-mine-shaft-600 dark:[&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-700 dark:[&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_p]:text-sm [&_li]:text-xsm"
        dangerouslySetInnerHTML={{ __html: data }}
      />

      <Divider my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

      {/* About Company */}
      <div>
        <div className="text-xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
          About Company
        </div>
        <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-xl">
              <img
                className="h-8"
                src={`/Icons/${props.company}.png`}
                alt={props.company}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg text-mine-shaft-900 dark:text-mine-shaft-100">
                {props.company}
              </div>
              <div className="text-mine-shaft-500 dark:text-mine-shaft-300">
                10K+ Employees
              </div>
            </div>
          </div>
          <Link to={`/company/${props.company}`}>
            <Button color="brightSun.4" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-600 dark:text-mine-shaft-300 text-justify xs-mx:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsum
          numquam incidunt vero non corrupti. Deserunt iste reiciendis
          voluptatibus ullam itaque excepturi soluta possimus.
        </div>
      </div>
    </div>
  );
};

export default JobDesc;