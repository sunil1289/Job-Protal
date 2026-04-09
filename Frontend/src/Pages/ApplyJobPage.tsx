

import { Button } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../Components/ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Components/services/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
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
      <Button
        onClick={() => navigate(-1)}
        leftSection={<IconArrowNarrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
        mb="xs"
      >
        Back
      </Button>
      <ApplyJobComp {...job} />
    </div>
  );
};

export default ApplyJobPage;