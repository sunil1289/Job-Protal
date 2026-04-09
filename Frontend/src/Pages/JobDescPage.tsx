

import { Button } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../Components/JobDesc/JobDesc";
import { useEffect, useState } from "react";
import { getJob } from "../Components/services/JobService";
import RecommendedJob from "../Components/JobDesc/RecommendedJob";

const JobDescPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id)
      .then((res) => setJob(res))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-50 dark:bg-mine-shaft-950 font-['poppins'] p-4 transition-colors duration-300">
      <Link className="my-6 inline-block" to="/find-jobs">
        <Button
          leftSection={<IconArrowNarrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5 justify-around bs-mx:flex-wrap">
        <JobDesc {...job} />
        <RecommendedJob />
      </div>
    </div>
  );
};

export default JobDescPage;