import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className=" flex sm-mx:flex-col-reverse items-center px-16 bs-mx:px-10 md-mx:px-5  bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200">
      <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
        <div
          className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-bold leading-tight 
     [&>span]:text-bright-sun-500  bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200"
        >
          Find Your <span>Dream</span> <span>Jobs</span> With Us
        </div>
        <div className="text-lg bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200 md-mx:text-base sm-mx:text-sm ">
          Good Life! Begins With A Good Company.Start exploring thousands of
          jobs in one place.
        </div>
        <div className="flex gap-3 mt-5 items-center">
          <TextInput
            className="bg-mine-shaft-100 dark:bg-mine-shaft-900 
             rounded-lg p-1 px-2 
                    text-mine-shaft-800 dark:text-mine-shaft-200
                            [&_input]:!text-mine-shaft-800 
                             dark:[&_input]:!text-mine-shaft-200"
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
          />

          <TextInput
            className="bg-mine-shaft-100 dark:bg-mine-shaft-900 
               rounded-lg p-1 px-2 
               text-mine-shaft-800 dark:text-mine-shaft-200
               [&_input]:!text-mine-shaft-800 
               dark:[&_input]:!text-mine-shaft-200"
            variant="unstyled"
            label="Job Type"
            placeholder="Full-Time"
          />

          <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-600 cursor-pointer">
            <IconSearch className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>
      <div className="w-[55%] flex items-center justify-center sm-mx:w-full">
        <div className="w-[30rem] relative">
          <img src="/Man-job.png" alt="Boy" />
          <div className=" absolute -right-12 w-fit xs-mx:-left-5 top-[50%] bs-mx:right-0 xs-mx:top-[10%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-centermb-1  bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200 text-sm">
              10k+ got job
            </div>
            <Avatar.Group spacing="sm">
              <Avatar src="avatar1.png" radius="xl" />
              <Avatar src="avatar2.png" radius="xl" />
              <Avatar src="Gavatar.png" radius="xl" />
              <Avatar src="Gavatar1.png" radius="xl" />
              <Avatar radius="xl">+9</Avatar>
            </Avatar.Group>
          </div>
          <div className="absolute xs:-left-5 w-fit xs-mx:!right-0 bs-mx:top-[35%] xs-mx:top-[60%] top-[26%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md gap-3 flex-col">
            <div className="flex gap-2 items-center ">
              <div className="w-12 h-10 p-1.5 bg-mine-shaft-950 rounded-lg">
                <img src="/Companies/Google.png" alt="" />
              </div>
              <div className="text-sm bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200 ">
                <div>Software Engineer</div>
                <div className="text-bright-sun-500 text-xs">New York</div>
              </div>
            </div>
            <div className="flex gap-2 justify-around bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200 dark:text-mine-shaft-200text-xs">
              <span>1 day ago</span>
              <span> 120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DreamJob;
