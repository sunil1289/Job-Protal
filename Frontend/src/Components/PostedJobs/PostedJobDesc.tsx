

// import { Badge, Tabs } from "@mantine/core";
// import JobDesc from "../JobDesc/JobDesc";
// import TalentCard from "../FindTalent/TalentCard";
// import { useEffect, useState } from "react";

// const emptyState = (message: string) => (
//   <div className="text-xl font-semibold min-h-[70vh] flex justify-center items-start pt-10 text-mine-shaft-400 dark:text-mine-shaft-500">
//     {message}
//   </div>
// );

// const PostedJobDesc = (props: any) => {
//   const [tab, setTab] = useState("overview");
//   const [arr, setArr] = useState<any>([]);

//   const handleTabChange = (value: any) => {
//     setTab(value);
//     if (value === "applicants") {
//       setArr(props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED"));
//     } else if (value === "invited") {
//       setArr(props.applicants?.filter((x: any) => x.applicationStatus === "INTERVIEWING"));
//     } else if (value === "offered") {
//       setArr(props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED"));
//     } else if (value === "rejected") {
//       setArr(props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED"));
//     }
//   };

//   useEffect(() => {
//     handleTabChange("overview");
//   }, [props]);

//   return (
//     <div className="w-3/4 md-mx:w-full px-5 md-mx:p-0">
//       {props.jobTitle ? (
//         <>
//           {/* Title */}
//           <div className="text-2xl xs-mx:text-xl font-semibold flex items-center text-mine-shaft-900 dark:text-mine-shaft-100">
//             {props.jobTitle}
//             <Badge variant="light" ml="sm" color="brightSun.4" size="sm">
//               {props.jobStatus}
//             </Badge>
//           </div>

//           {/* Location */}
//           <div className="font-medium mb-4 items-center xs-mx:text-sm text-mine-shaft-600 dark:text-mine-shaft-300">
//             {props.location}
//           </div>

//           <div className="px-1">
//             <Tabs value={tab} onChange={handleTabChange} variant="outline" radius="lg">
//               <Tabs.List
//                 className="font-semibold mb-5
//                   [&_button]:text-lg xs:mx-6
//                   [&_button]:text-base xsm:mx-6
//                   [&_button]:text-sm
//                   [&_button]:!px-1.5
//                   [&_button]:py-2
//                   [&_button]:font-medium
//                   [&_button]:text-mine-shaft-600
//                   dark:[&_button]:text-mine-shaft-400
//                   [&_button[data-active='true']]:text-bright-sun-400
//                   [&_button[data-active='true']]:border-b-mine-shaft-200
//                   dark:[&_button[data-active='true']]:border-b-mine-shaft-950"
//               >
//                 <Tabs.Tab value="overview">Overview</Tabs.Tab>
//                 <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
//                 <Tabs.Tab value="invited">Invited</Tabs.Tab>
//                 <Tabs.Tab value="offered">Offered</Tabs.Tab>
//                 <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
//               </Tabs.List>

//               <Tabs.Panel value="overview" className="[&>div]:w-full">
//                 <JobDesc {...props} closed={props.jobStatus === "CLOSED"} edit />
//               </Tabs.Panel>

//               <Tabs.Panel value="applicants">
//                 <div className="flex flex-wrap justify-start pt-4 gap-4">
//                   {arr?.length
//                     ? arr.map((talent: any, idx: any) => (
//                         <TalentCard key={idx} {...talent} posted />
//                       ))
//                     : emptyState("No Applicants")}
//                 </div>
//               </Tabs.Panel>

//               <Tabs.Panel value="invited">
//                 <div className="flex flex-wrap justify-start pt-4 gap-4">
//                   {arr?.length
//                     ? arr.map((talent: any, idx: any) => (
//                         <TalentCard key={idx} {...talent} invited />
//                       ))
//                     : emptyState("No Invited Candidates")}
//                 </div>
//               </Tabs.Panel>

//               <Tabs.Panel value="offered">
//                 <div className="flex flex-wrap justify-start pt-4 gap-4">
//                   {arr?.length
//                     ? arr.map((talent: any, idx: any) => (
//                         <TalentCard key={idx} {...talent} offered />
//                       ))
//                     : emptyState("No Offered Applicants")}
//                 </div>
//               </Tabs.Panel>

//               <Tabs.Panel value="rejected">
//                 <div className="flex flex-wrap justify-start pt-4 gap-4">
//                   {arr?.length
//                     ? arr.map((talent: any, idx: any) => (
//                         <TalentCard key={idx} {...talent} offered />
//                       ))
//                     : emptyState("No Rejected Applicants")}
//                 </div>
//               </Tabs.Panel>

//               <Tabs.Panel value="interviewing">
//                 <div className="flex flex-wrap justify-evenly pt-4 gap-4">
//                   {props.applicants
//                     ?.filter((x: any) => x.applicationStatus === "INTERVIEWING")
//                     .map((talent: any, idx: any) => (
//                       <TalentCard key={idx} {...talent} invited />
//                     ))}
//                 </div>
//               </Tabs.Panel>
//             </Tabs>
//           </div>
//         </>
//       ) : (
//         emptyState("No Job Selected")
//       )}
//     </div>
//   );
// };

// export default PostedJobDesc;

import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const emptyState = (message: string) => (
  <div className="text-xl font-semibold min-h-[70vh] flex justify-center items-start pt-10 text-mine-shaft-400 dark:text-mine-shaft-500">
    {message}
  </div>
);

const PostedJobDesc = (props: any) => {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState<any>([]);

  const handleTabChange = (value: any) => {
    setTab(value);
    if (value === "applicants") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED"));
    } else if (value === "invited") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "INTERVIEWING"));
    } else if (value === "offered") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED"));
    } else if (value === "rejected") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED"));
    }
  };

  useEffect(() => {
    handleTabChange("overview");
  }, [props]);

  return (
    <div className="w-3/4 md-mx:w-full px-5 md-mx:p-0">
      {props.jobTitle ? (
        <>
          {/* Title */}
          <div className="text-2xl xs-mx:text-xl font-semibold flex items-center text-mine-shaft-900 dark:text-mine-shaft-100">
            {props.jobTitle}
            <Badge variant="light" ml="sm" color="brightSun.4" size="sm">
              {props.jobStatus}
            </Badge>
          </div>

          {/* Location */}
          <div className="font-medium mb-4 items-center xs-mx:text-sm text-mine-shaft-600 dark:text-mine-shaft-300">
            {props.location}
          </div>

          <div className="px-1">
            <Tabs value={tab} onChange={handleTabChange} variant="outline" radius="lg">
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
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                {/* FIX: hide applicant tabs for DRAFT jobs — they can't have applicants */}
                {props.jobStatus !== "DRAFT" && (
                  <>
                    <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                    <Tabs.Tab value="invited">Invited</Tabs.Tab>
                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                    <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                  </>
                )}
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full">
                {/* FIX: pass draft prop so JobDesc can render correctly for draft state */}
                <JobDesc
                  {...props}
                  closed={props.jobStatus === "CLOSED"}
                  draft={props.jobStatus === "DRAFT"}
                  edit
                />
              </Tabs.Panel>

              <Tabs.Panel value="applicants">
                <div className="flex flex-wrap justify-start pt-4 gap-4">
                  {arr?.length
                    ? arr.map((talent: any, idx: any) => (
                        <TalentCard key={idx} {...talent} posted />
                      ))
                    : emptyState("No Applicants")}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="invited">
                <div className="flex flex-wrap justify-start pt-4 gap-4">
                  {arr?.length
                    ? arr.map((talent: any, idx: any) => (
                        <TalentCard key={idx} {...talent} invited />
                      ))
                    : emptyState("No Invited Candidates")}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="offered">
                <div className="flex flex-wrap justify-start pt-4 gap-4">
                  {arr?.length
                    ? arr.map((talent: any, idx: any) => (
                        <TalentCard key={idx} {...talent} offered />
                      ))
                    : emptyState("No Offered Applicants")}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="rejected">
                <div className="flex flex-wrap justify-start pt-4 gap-4">
                  {arr?.length
                    ? arr.map((talent: any, idx: any) => (
                        // FIX: was incorrectly passing offered prop, now passes rejected
                        <TalentCard key={idx} {...talent} rejected />
                      ))
                    : emptyState("No Rejected Applicants")}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        emptyState("No Job Selected")
      )}
    </div>
  );
};

export default PostedJobDesc;