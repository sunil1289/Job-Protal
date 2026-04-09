
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text, Tooltip } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";

import { getProfile } from "../services/ProfileService";
import { changeAppStatus } from "../services/JobService";
import {
  errorNotification,
  successNotification,
} from "../services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../services/Utilities";

const TalentCard = (props: any) => {
  const { id } = useParams();
  const ref = useRef<HTMLInputElement>(null);

  const [opened, { open, close }] = useDisclosure(false);
  const [appOpen, { open: openApp, close: closeApp }] = useDisclosure(false);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => setProfile(res))
        .catch((err) => console.log(err));
    } else {
      setProfile(props);
    }
  }, [props]);

  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };

    if (status === "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      const combinedDate = new Date(date!);
      combinedDate.setHours(hours, minutes);
      interview = { ...interview, interviewTime: combinedDate.toISOString() };
    }

    changeAppStatus(interview)
      .then(() => {
        if (status === "INTERVIEWING")
          successNotification("Interview Scheduled", "Interview scheduled successfully");
        else if (status === "OFFERED")
          successNotification("Offered", "Offer sent successfully");
        else
          successNotification("Rejected", "Application Rejected");
        window.location.reload();
      })
      .catch((err) => {
        errorNotification("Error", err.response.data.errorMessage);
      });
  };

  return (
    <>
      <div className="bg-white dark:bg-mine-shaft-800 border border-mine-shaft-200 dark:border-transparent p-4 w-96 bs-mx:w-[48%] md-mx:w-full rounded-xl shadow-md flex flex-col gap-3 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-500 transition-colors duration-300">

        {/* Header */}
        <div className="flex justify-between mb-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-full">
              <Avatar
                size="lg"
                src={
                  profile?.picture
                    ? `data:image/jpeg;base64,${profile?.picture}`
                    : `/${props.image}.png`
                }
              />
            </div>
            <div>
              <div className="font-semibold text-lg text-mine-shaft-900 dark:text-mine-shaft-100">
                {props.name}
              </div>
              <div className="text-sm text-mine-shaft-500 dark:text-mine-shaft-300">
                {profile?.jobTitle || props.role} •{" "}
                {profile?.company || props.company}
              </div>
            </div>
          </div>
          <IconHeart className="text-mine-shaft-400 dark:text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400 transition-colors duration-200" />
        </div>

        {/* Skills */}
        <div className="flex gap-2 flex-wrap">
          {(profile?.skills || props.topSkills)?.map(
            (skill: any, index: number) =>
              index < 4 && (
                <div
                  key={index}
                  className="p-2 py-1 bg-mine-shaft-100 dark:bg-mine-shaft-700 text-bright-sun-500 dark:text-bright-sun-400 rounded-lg text-xs"
                >
                  {skill}
                </div>
              )
          )}
        </div>

        {/* About */}
        <Text
          className="text-xs text-justify !text-mine-shaft-600 dark:!text-mine-shaft-300"
          lineClamp={3}
        >
          {profile?.about || props.about}
        </Text>

        <Divider size="xs" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

        {/* Info */}
        {props.invited ? (
          <div className="flex gap-1 text-xs text-mine-shaft-500 dark:text-mine-shaft-400 items-center">
            <IconCalendarMonth className="w-5 h-5" />
            Interview: {formatInterviewTime(props.interviewTime)}
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="font-semibold text-mine-shaft-800 dark:text-mine-shaft-200 text-sm">
              Experience: {props.totalExp ? props.totalExp : 1}{" "}
              {props.totalExp > 1 ? "Years" : "Year"}
            </div>
            <div className="flex gap-1 text-xs text-mine-shaft-500 dark:text-mine-shaft-400 items-center">
              <IconMapPin className="h-4 w-4" />
              {profile?.location || props.location}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-2 w-full">
          {!props.invited ? (
            <>
              <Link to={`/talent-profile/${profile?.id}`} className="flex-1 min-w-0">
                <Button
                  size="md"
                  className="!w-full !h-11"
                  color="brightSun.4"
                  variant="outline"
                >
                  Profile
                </Button>
              </Link>
              {props.posted ? (
                <Tooltip label="Schedule Interview" className="flex-1">
                  <Button
                    size="md"
                    className="!w-full !h-11"
                    onClick={open}
                    color="brightSun.4"
                    variant="light"
                    rightSection={<IconCalendarMonth size={18} />}
                  >
                    Schedule
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  size="md"
                  className="flex-1 !h-11"
                  color="brightSun.4"
                  variant="light"
                >
                  Message
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                size="sm"
                className="flex-1 h-10"
                onClick={() => handleOffer("OFFERED")}
                color="brightSun.4"
                variant="outline"
              >
                Accept
              </Button>
              <Button
                size="sm"
                className="flex-1 h-10"
                onClick={() => handleOffer("REJECTED")}
                color="brightSun.4"
                variant="light"
              >
                Reject
              </Button>
            </>
          )}
        </div>

        {(props.invited || props.posted) && (
          <Button
            onClick={openApp}
            color="brightSun.4"
            variant="filled"
            fullWidth
          >
            View Application
          </Button>
        )}
      </div>

      {/* Schedule Modal */}
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            minDate={new Date()}
            valueFormat="DD/MM/YYYY"
            onChange={(value) => setDate(value ? new Date(value) : null)}
            label="Date"
            placeholder="Enter date"
          />
          <TimeInput
            label="Time"
            value={time}
            onChange={(e) => setTime(e.currentTarget.value)}
            ref={ref}
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="brightSun.4"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>

      {/* Application Modal */}
      <Modal opened={appOpen} onClose={closeApp} title="Application" centered>
        <div className="flex flex-col gap-4 text-mine-shaft-800 dark:text-mine-shaft-200">
          <div>
            Email:{" "}
            
              className="hover:underline cursor-pointer text-bright-sun-400"
              href={`mailto:${props.email}`}
            <a>
              {props.email}
            </a>
          </div>
          <div>
            Website:{" "}
            
              target="_blank"
              className="hover:underline cursor-pointer text-bright-sun-400"
              href={props.website}
            <a>
              {props.website}
            </a>
          </div>
          <div>
            Resume:{" "}
            <span
              className="hover:underline cursor-pointer text-bright-sun-400"
              onClick={() => openBase64PDF(props.resume)}
            >
              {props.name}
            </span>
          </div>
          <div>
            Cover Letter:
            <div className="mt-1 text-mine-shaft-600 dark:text-mine-shaft-400">
              {props.coverLetter}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TalentCard;