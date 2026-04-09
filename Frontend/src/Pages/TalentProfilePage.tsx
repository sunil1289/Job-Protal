
import { Button } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Components/services/ProfileService";
import RecommandTalent from "../Components/TalentProfile/RecommandTalent";
import Profile from "../Components/TalentProfile/Profile";

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState<any>([]);

  useEffect(() => {
    getAllProfiles()
      .then((res) => setTalents(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-50 dark:bg-mine-shaft-950 font-['poppins'] p-4 transition-colors duration-300">
      <Link to="/findtalent">
        <Button
          onClick={() => navigate(-1)}
          leftSection={<IconArrowNarrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5 lg-mx:flex-wrap">
        <Profile />
        <RecommandTalent talents={talents} />
      </div>
    </div>
  );
};

export default TalentProfilePage;