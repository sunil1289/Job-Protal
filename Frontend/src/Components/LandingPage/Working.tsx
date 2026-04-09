import { Avatar } from "@mantine/core";
import { work } from "../../Data/Data";

const Working = () => {
  return (
    <section className="mt-24 py-12 bg-mine-shaft-100 dark:bg-mine-shaft-900 transition-colors duration-300">
      
      {/* Heading */}
      <div className="text-center px-4">
        <h2 className="text-4xl md:text-3xl sm:text-2xl font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
          How It <span className="text-bright-sun-400">Works</span>
        </h2>

        <p className="mt-4 text-lg sm:text-sm max-w-2xl mx-auto text-mine-shaft-600 dark:text-mine-shaft-400">
          Effortlessly navigate through the process and land your dream job.
        </p>
      </div>

      {/* Content */}
      <div className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-16 px-6 md:px-10 lg:px-16">
        
        {/* Left Image */}
        <div className="relative flex justify-center">
          <img
            className="w-[28rem] md:w-[24rem] sm:w-[20rem]"
            src="/Working/girlA.png"
            alt="Girl working"
          />

          {/* Floating Card */}
          <div className="absolute right-0 top-1/3 w-40 sm:w-32 flex flex-col items-center gap-2 border border-bright-sun-400 rounded-xl py-3 px-2 backdrop-blur-md bg-white/30 dark:bg-mine-shaft-800/40 shadow-md">
            
            <Avatar
              className="!h-16 !w-16 sm:!h-12 sm:!w-12"
              src="girl3.png"
              alt="profile"
            />

            <p className="text-sm sm:text-xs font-semibold text-center text-mine-shaft-900 dark:text-mine-shaft-100">
              Complete your profile
            </p>

            <span className="text-xs text-mine-shaft-600 dark:text-mine-shaft-400">
              70% Completed
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-10 max-w-xl">
          {work.map((item, index) => (
            <div key={index} className="flex items-start gap-5">
              
              {/* Icon */}
              <div className="p-3 bg-bright-sun-300 rounded-full flex-shrink-0 shadow-sm">
                <img
                  className="h-10 w-10 md:h-8 md:w-8 sm:h-6 sm:w-6"
                  src={`/Working/${item.name}.png`}
                  alt={item.name}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xl md:text-lg sm:text-base font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm md:text-sm sm:text-xs text-mine-shaft-600 dark:text-mine-shaft-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Working;