


import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { getBase64 } from "../services/Utilities";
import { successNotification } from "../services/NotificationService";

const Profile = () => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const { hovered, ref } = useHover();

  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("success", "Profile picture updated successfully");
  };

  return (
    <div className="w-4/5 lg-mx:w-full mx-auto">
      <div className="relative px-5">
        <img
          className="rounded-t-xl w-full h-60 object-cover xs-mx:h-30"
          src="/Profile/banner.jpg"
          alt="banner"
        />
        <div
          ref={ref}
          className="absolute left-6 top-full -translate-y-1/2 flex items-center justify-center md-mx:-bottom-5 sm-mx:-bottom-16"
        >
          <Avatar
            className="!w-40 !h-40 md-mx:!w-35 md-mx:!h-35 border-mine-shaft-50 dark:border-mine-shaft-900 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32"
            src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : null}
            color="blue"
            alt="profile img"
          />
          {hovered && (
            <Overlay
              gradient="linear-gradient(145deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)"
              className="!rounded-full"
              opacity={0.75}
            />
          )}
          {hovered && (
            <IconEdit className="absolute z-[300] w-8 h-8 text-bright-sun-400" />
          )}
          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="absolute top-0 left-0 w-full h-full z-[301] [&_*]:!rounded-full [&_*]:!h-full"
              variant="transparent"
              size="lg"
              radius="xl"
              accept="image/png,image/jpeg"
            />
          )}
        </div>
      </div>

      <div className="px-3 mt-20">
        <Info />
      </div>
      <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />
      <About />
      <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />
      <Skills />
      <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />
      <Experience />
      <Divider mx="xs" my="xl" color="mineShaft.2" className="dark:!border-mine-shaft-700" />
      <Certificate />
    </div>
  );
};

export default Profile;