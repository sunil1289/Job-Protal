

import { Button, Divider } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../Components/Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-screen w-full bg-mine-shaft-50 dark:bg-mine-shaft-950 font-['poppins'] p-4 transition-colors duration-300">
      <Divider mx="md" mb="xl" color="mineShaft.2" className="dark:!border-mine-shaft-800" />
      <Link className="my-4 inline-block" to="/find-talent">
        <Button
          leftSection={<IconArrowNarrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <div className="flex justify-center">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;