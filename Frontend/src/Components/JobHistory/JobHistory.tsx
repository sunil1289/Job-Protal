

import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any[]>([]);
  const [showList, setShowList] = useState<any[]>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
        const appliedJobs = res.filter((job: any) =>
          job.applicants?.some(
            (applicant: any) =>
              applicant.applicantId === user.id &&
              applicant.applicationStatus === "APPLIED"
          )
        );
        setShowList(appliedJobs);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile.savedJobs?.includes(job.id))
      );
    } else {
      setShowList(
        jobList.filter((job: any) =>
          job.applicants?.some(
            (applicant: any) =>
              applicant.applicantId === user.id &&
              applicant.applicationStatus === value
          )
        )
      );
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-5 xs-mx:font-medium text-mine-shaft-900 dark:text-mine-shaft-100">
        Job History
      </div>
      <div className="px-6">
        <Tabs
          variant="outline"
          radius="md"
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List
            className="font-semibold mb-5
              [&_button]:text-lg xs:mx-6
              [&_button]:text-base xsm:mx-6
              [&_button]:text-sm
              [&_button]:!px-1.5
              [&_button]:py-2
              [&_button]:font-medium
              [&_button]:text-mine-shaft-600
              dark:[&_button]:text-mine-shaft-400
              [&_button[data-active='true']]:text-bright-sun-400
              [&_button[data-active='true']]:border-b-mine-shaft-200
              dark:[&_button[data-active='true']]:border-b-mine-shaft-950"
          >
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="mt-10 flex flex-wrap gap-10 justify-start">
              {showList.length ? (
                showList.map((job: any, index: number) => (
                  <Card
                    key={index}
                    {...job}
                    {...{ [activeTab.toLowerCase()]: true }}
                  />
                ))
              ) : (
                <div className="text-xl font-semibold text-mine-shaft-400 dark:text-mine-shaft-500">
                  No jobs found
                </div>
              )}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;