

import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindTalent/SearchBar";
import Talents from "../Components/FindTalent/Talents";

const FindTalentPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-50 dark:bg-mine-shaft-950 font-['poppins'] transition-colors duration-300">
      <SearchBar />
      <Divider size="xs" mx="md" color="mineShaft.2" className="dark:!border-mine-shaft-800" />
      <Talents />
    </div>
  );
};

export default FindTalentPage;