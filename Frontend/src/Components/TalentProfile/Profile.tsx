


import { Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconBuilding, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Profile = () => {
  const { id } = useParams();
  const matches = useMediaQuery("(max-width: 475px)");
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      getProfile(id)
        .then((res) => setProfile(res))
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <div className="w-2/3 lg-mx:w-full">
      <div>
        {/* Banner & Avatar */}
        <div className="relative px-5">
          <img
            className="rounded-t-xl w-full xl-mx:h-40 h-60 object-cover xs-mx:h-30"
            src="/Profile/banner.jpg"
            alt="banner"
          />
          <div className="absolute left-6 top-full -translate-y-1/2 flex items-center justify-center md-mx:-bottom-5 sm-mx:-bottom-16">
            <Avatar
              className="!w-36 !h-36 md-mx:!w-32 md-mx:!h-32 border-mine-shaft-100 dark:border-mine-shaft-900 border-8 rounded-full sm-mx:!w-30 sm-mx:!h-30 xs-mx:!w-28 xs-mx:!h-28"
              src={
                profile?.picture
                  ? `data:image/jpeg;base64,${profile?.picture}`
                  : null
              }
              color="blue"
              alt="profile img"
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="px-3 mt-16">
          <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between text-mine-shaft-900 dark:text-mine-shaft-100">
            {profile?.name || "N/A"}
            <Button
              color="brightSun.4"
              size={matches ? "sm" : "md"}
              variant="light"
            >
              Message
            </Button>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 xs-mx:text-base text-mine-shaft-700 dark:text-mine-shaft-200">
                <IconBriefcase size={20} className="text-bright-sun-400" />
                <span>{profile?.jobTitle || "Role"}</span>
              </div>
              <div className="flex items-center gap-2 xs-mx:text-base text-mine-shaft-700 dark:text-mine-shaft-200">
                <IconBuilding size={20} className="text-bright-sun-400" />
                <span>{profile?.company || "Company"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 xs-mx:text-base text-mine-shaft-700 dark:text-mine-shaft-200">
              <IconMapPin size={20} className="text-bright-sun-400" />
              <span>{profile?.location || "Location"}</span>
            </div>

            <div className="flex items-center gap-2 xs-mx:text-base text-mine-shaft-700 dark:text-mine-shaft-200">
              <IconBriefcase size={20} className="text-bright-sun-400" />
              <span>
                Experience:{" "}
                {profile?.totalExp ? `${profile.totalExp} Years` : "0 Years"}
              </span>
            </div>
          </div>
        </div>

        <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

        {/* About */}
        <div className="px-3">
          <div className="text-2xl font-semibold mb-3 text-mine-shaft-900 dark:text-mine-shaft-100">
            About
          </div>
          <div className="text-sm text-mine-shaft-600 dark:text-mine-shaft-300 text-justify">
            {profile?.about || "No description available"}
          </div>
        </div>

        <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

        {/* Skills */}
        <div className="px-3">
          <div className="text-2xl font-semibold mb-3 text-mine-shaft-900 dark:text-mine-shaft-100">
            Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {profile?.skills?.length ? (
              profile.skills.map((skill: any, index: number) => (
                <div
                  key={index}
                  className="bg-bright-sun-300 bg-opacity-15 text-sm font-medium rounded-3xl text-bright-sun-500 dark:text-bright-sun-400 px-3 py-1"
                >
                  {skill}
                </div>
              ))
            ) : (
              <div className="text-mine-shaft-500 dark:text-mine-shaft-400 text-sm">
                No skills available
              </div>
            )}
          </div>
        </div>

        <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

        {/* Experience */}
        <div className="px-3">
          <div className="text-2xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
            Experience
          </div>
          <div className="flex flex-col gap-8">
            {profile?.experiences?.length ? (
              profile.experiences.map((exp: any, index: number) => (
                <ExpCard key={index} {...exp} />
              ))
            ) : (
              <div className="text-mine-shaft-500 dark:text-mine-shaft-400 text-sm">
                No experience added
              </div>
            )}
          </div>
        </div>

        <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

        {/* Certifications */}
        <div className="px-3">
          <div className="text-2xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
            Certifications
          </div>
          <div className="flex flex-col gap-8">
            {profile?.certifications?.length ? (
              profile.certifications.map((cert: any, index: number) => (
                <CertiCard key={index} {...cert} />
              ))
            ) : (
              <div className="text-mine-shaft-500 dark:text-mine-shaft-400 text-sm">
                No certifications added
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;