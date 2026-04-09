

import { Divider } from "@mantine/core";
import JobHistory from "../Components/JobHistory/JobHistory";

const JobHistoryPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-50 dark:bg-mine-shaft-950 font-['poppins'] p-4 transition-colors duration-300">
      <Divider size="xs" color="mineShaft.2" className="dark:!border-mine-shaft-800" />
      <div className="my-5">
        <JobHistory />
      </div>
    </div>
  );
};

export default JobHistoryPage;