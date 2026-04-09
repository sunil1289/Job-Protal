import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategory = () => {
  return (
    <div className="mt-20 pb-5">
      <div
        className="text-4xl text-center font-semibold   bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200
    mb-3 xs-mx:text-xl md-mx:text-3xl sm-mx:text-2xl "
      >
        Browse <span className="text-bright-sun-400">Job</span>Categories
      </div>
      <div className="text-lg bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200 sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-center w-1/2 sm-mx:w-11/12">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!
      </div>
      <Carousel
        slideSize="20%"
        slideGap="md"
        className="focus-visible:[&_button]:outline-none [&_button]:!bg-bright-sun-500 [&_button]:! border-none 
  [&_button]:hover:!opacity-75 [&_button]:opacity-0"
        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
      >
        {jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
            <div
              className="flex flex-col items-center  w-64 sm-mx:w-56 xs-mx:w-48 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300
               ease-in-out !shadow-bright-sun-400"
            >
              <div className="p-2 bg-bright-sun-400  rounded-full">
                <img
                  className="h-8 w-8 sm-mx:h-6 sm-mx:w-6  xs-mx:h-4 xs-mx:w-4 "
                  src={`/Category/${category.name}.png`}
                  alt={category.name}
                />
              </div>
              <div className="xs-mx:text-base sm-mx:text-lg bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200  text-xl font-semibold">
                {category.name}
              </div>
              <div className="text-sm xs-mx:text-xs dark:text-mine-shaft-200 text-center text-mine-shaft-300">
                {category.desc}
              </div>
              <div className="text-bright-sun-400 text-lg sm-mx:text-base xs-mx:text-sm">
                {category.jobs} + New Job Posted
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};
export default JobCategory;
