

// import { useNavigate, useParams } from "react-router";
// import PostedJobDesc from "../Components/PostedJobs/PostedJobDesc";
// import PostedJobs from "../Components/PostedJobs/PostedJobs";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getJobPostedBy } from "../Components/services/JobService";
// import { Button, Divider, Drawer } from "@mantine/core";
// import { useDisclosure, useMediaQuery } from "@mantine/hooks";

// const PostedJobsPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const user = useSelector((state: any) => state.user);
//   const [jobList, setJobList] = useState<any[]>([]);
//   const [job, setJob] = useState<any>({});
//   const [opened, { open, close }] = useDisclosure(false);
//   const matches = useMediaQuery("(max-width: 767px)");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     getJobPostedBy(user.id)
//       .then((res) => {
//         setJobList(res);
//         if (res && res.length > 0 && Number(id) == 0)
//           navigate(`/posted-jobs/${res[0].id}`);
//         setJob(res.find((item: any) => item.id == id));
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   return (
//     <div className="min-h-[90vh] bg-mine-shaft-50 dark:bg-mine-shaft-950 font-['poppins'] px-5 transition-colors duration-300">
//       <Divider
//         size="xs"
//         color="mineShaft.2"
//         className="dark:!border-mine-shaft-800"
//       />

//       {matches && (
//         <Button
//           size="sm"
//           my="xs"
//           autoContrast={true}
//           onClick={open}
//           color="brightSun.4"
//           variant="light"
//         >
//           All Jobs
//         </Button>
//       )}

//       <Drawer
//         offset={8}
//         radius="md"
//         size={250}
//         overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
//         opened={opened}
//         onClose={close}
//         title="All Jobs"
//         classNames={{
//           content:
//             "!bg-white dark:!bg-mine-shaft-900",
//           header:
//             "!bg-white dark:!bg-mine-shaft-900 !text-mine-shaft-900 dark:!text-mine-shaft-100",
//           title:
//             "!font-semibold !text-mine-shaft-900 dark:!text-mine-shaft-100",
//           close:
//             "!text-mine-shaft-600 dark:!text-mine-shaft-300 hover:!bg-mine-shaft-100 dark:hover:!bg-mine-shaft-800",
//         }}
//       >
//         <PostedJobs job={job} jobList={jobList} />
//       </Drawer>

//       <div className="flex gap-5 justify-around py-5">
//         {!matches && <PostedJobs job={job} jobList={jobList} />}
//         <PostedJobDesc {...job} />
//       </div>
//     </div>
//   );
// };

// export default PostedJobsPage;


import { useNavigate, useParams } from "react-router";
import PostedJobDesc from "../Components/PostedJobs/PostedJobDesc";
import PostedJobs from "../Components/PostedJobs/PostedJobs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Components/services/JobService";
import { Button, Divider, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
  const [opened, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res);
        // FIX: was Number(id) == 0 which breaks for string IDs like "0" edge cases
        // and always re-navigates when id is a valid non-zero number string
        if (res && res.length > 0 && (!id || id === "0")) {
          navigate(`/posted-jobs/${res[0].id}`);
        }
        setJob(res.find((item: any) => String(item.id) === String(id)));
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-50 dark:bg-mine-shaft-950 font-['poppins'] px-5 transition-colors duration-300">
      <Divider
        size="xs"
        color="mineShaft.2"
        className="dark:!border-mine-shaft-800"
      />
      {matches && (
        <Button
          size="sm"
          my="xs"
          autoContrast={true}
          onClick={open}
          color="brightSun.4"
          variant="light"
        >
          All Jobs
        </Button>
      )}
      <Drawer
        offset={8}
        radius="md"
        size={250}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        opened={opened}
        onClose={close}
        title="All Jobs"
        classNames={{
          content: "!bg-white dark:!bg-mine-shaft-900",
          header: "!bg-white dark:!bg-mine-shaft-900 !text-mine-shaft-900 dark:!text-mine-shaft-100",
          title: "!font-semibold !text-mine-shaft-900 dark:!text-mine-shaft-100",
          close: "!text-mine-shaft-600 dark:!text-mine-shaft-300 hover:!bg-mine-shaft-100 dark:hover:!bg-mine-shaft-800",
        }}
      >
        <PostedJobs job={job} jobList={jobList} />
      </Drawer>
      <div className="flex gap-5 justify-around py-5">
        {!matches && <PostedJobs job={job} jobList={jobList} />}
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};

export default PostedJobsPage;