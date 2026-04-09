
import { useParams } from "react-router";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../services/JobService";

const RecommendedJobs = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any>(null);

  useEffect(() => {
    getAllJobs()
      .then((res) => setJobList(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="text-xl font-semibold mb-5 text-center text-mine-shaft-900 dark:text-mine-shaft-100">
        Recommended Jobs
      </div>
      <div className="flex bs:flex-col flex-wrap gap-5 justify-between bs-mx:justify-start">
        {jobList?.map(
          (job: any, idx: any) =>
            idx < 6 && id != job.id && <JobCard key={idx} {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;