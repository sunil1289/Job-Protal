import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe = () => {
  const isSmall = useMediaQuery("(max-width: 639px)");
  const isExtraSmall = useMediaQuery("(max-width: 475px)");

  return (
    <section className="mt-32 px-6 md:px-10 lg:px-16">
      
      <div
        className="
        rounded-2xl py-12 px-6 md:px-12 
        flex flex-col lg:flex-row items-center justify-between gap-10 
        shadow-lg transition-colors duration-300
        
        bg-mine-shaft-100 dark:bg-mine-shaft-900
        "
      >
        
        {/* Text */}
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-4xl md:text-3xl sm:text-2xl font-semibold 
          text-mine-shaft-900 dark:text-mine-shaft-100">
            Never Want to Miss Any{" "}
            <span className="text-bright-sun-400">Job News</span>
          </h2>

          <p className="mt-4 text-sm md:text-base 
          text-mine-shaft-600 dark:text-mine-shaft-400">
            Subscribe to get the latest job updates, career tips, and opportunities directly in your inbox.
          </p>
        </div>

        {/* Input + Button */}
        <div className="w-full max-w-xl">
          <div
            className="
            flex sm:flex-row flex-col items-center gap-3 
            rounded-xl p-2 shadow-inner transition-colors duration-300
            
            bg-white dark:bg-mine-shaft-800
            border border-mine-shaft-200 dark:border-mine-shaft-700
            "
          >
            
            <TextInput
              className="
              flex-1 font-medium
              [&_input]:bg-transparent 
              [&_input]:text-mine-shaft-900 dark:[&_input]:text-mine-shaft-100
              [&_input]:placeholder:text-mine-shaft-500
              "
              variant="unstyled"
              placeholder="Enter your email"
              size={isExtraSmall ? "sm" : isSmall ? "md" : "lg"}
            />

            <Button
              className="!rounded-lg w-full sm:w-auto"
              size={isExtraSmall ? "sm" : isSmall ? "md" : "lg"}
              color="brightSun.4"
            >
              Subscribe
            </Button>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Subscribe;