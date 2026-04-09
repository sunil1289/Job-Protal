

// import { Tabs } from "@mantine/core";
// import { useEffect, useState } from "react";
// import PostedJobCard from "./PostedJobCard";

// const PostedJobs = (props: any) => {
//   const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");

//   useEffect(() => {
//     setActiveTab(props.job?.jobStatus || "ACTIVE");
//   }, [props.job]);

//   return (
//     <div className="w-1/5 mt-5">
//       <div className="text-2xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
//         Jobs
//       </div>
//       <Tabs
//         variant="pills"
//         radius="md"
//         value={activeTab}
//         onChange={setActiveTab}
//       >
//         <Tabs.List
//           className="flex flex-row flex-nowrap gap-4 font-medium
//             [&_button[aria-selected='false']]:bg-mine-shaft-100
//             dark:[&_button[aria-selected='false']]:bg-mine-shaft-900
//             [&_button[aria-selected='false']]:text-mine-shaft-700
//             dark:[&_button[aria-selected='false']]:text-mine-shaft-300"
//         >
//           <Tabs.Tab value="ACTIVE">
//             Active [
//             {props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE").length}]
//           </Tabs.Tab>
//           <Tabs.Tab value="DRAFT">
//             Drafts [
//             {props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT").length}]
//           </Tabs.Tab>
//           <Tabs.Tab value="CLOSED">
//             Closed [
//             {props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED").length}]
//           </Tabs.Tab>
//         </Tabs.List>
//       </Tabs>

//       <div className="flex flex-col mt-3">
//         {props.jobList
//           ?.filter((job: any) => job?.jobStatus === activeTab)
//           .map((item: any, index: number) => (
//             <PostedJobCard key={index} {...item} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default PostedJobs;


import { Tabs } from "@mantine/core";
import { useState } from "react";
import PostedJobCard from "./PostedJobCard";

const PostedJobs = (props: any) => {
  // FIX: was using useEffect to sync activeTab with props.job, which reset the tab
  // every re-render and prevented users from freely switching tabs.
  // Now we initialize once from the selected job's status (or "ACTIVE" as fallback)
  // and let the user control the tab freely after that.
  const [activeTab, setActiveTab] = useState<string | null>(
    props.job?.jobStatus || "ACTIVE"
  );

  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
        Jobs
      </div>
      <Tabs
        variant="pills"
        radius="md"
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.List
          className="flex flex-row flex-nowrap gap-4 font-medium
            [&_button[aria-selected='false']]:bg-mine-shaft-100
            dark:[&_button[aria-selected='false']]:bg-mine-shaft-900
            [&_button[aria-selected='false']]:text-mine-shaft-700
            dark:[&_button[aria-selected='false']]:text-mine-shaft-300"
        >
          <Tabs.Tab value="ACTIVE">
            Active [{props.jobList?.filter((job: any) => job?.jobStatus === "ACTIVE").length}]
          </Tabs.Tab>
          <Tabs.Tab value="DRAFT">
            Drafts [{props.jobList?.filter((job: any) => job?.jobStatus === "DRAFT").length}]
          </Tabs.Tab>
          <Tabs.Tab value="CLOSED">
            Closed [{props.jobList?.filter((job: any) => job?.jobStatus === "CLOSED").length}]
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <div className="flex flex-col mt-3">
        {props.jobList
          ?.filter((job: any) => job?.jobStatus === activeTab)
          .map((item: any, index: number) => (
            <PostedJobCard key={index} {...item} />
          ))}
      </div>
    </div>
  );
};

export default PostedJobs;