import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../../Data/Data";

const Testimonials = () => {
  return (
    <section className="mt-24 py-12 px-6 md:px-10 lg:px-16 bg-mine-shaft-100 dark:bg-mine-shaft-900 transition-colors duration-300">
      
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-3xl sm:text-2xl font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
          What <span className="text-bright-sun-400">Users</span> Say About Us
        </h2>

        <p className="mt-4 text-lg sm:text-sm text-mine-shaft-600 dark:text-mine-shaft-400">
          Real feedback from people who found their dream jobs through our platform.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((data, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl border border-bright-sun-400/40 
            bg-white dark:bg-mine-shaft-800 
            shadow-sm hover:shadow-lg transition-all duration-300 
            flex flex-col gap-4"
          >
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar
                className="!h-14 !w-14"
                src="girl1.png"
                alt={data.name}
              />

              <div>
                <h3 className="text-lg sm:text-base font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
                  {data.name}
                </h3>

                <Rating value={data.rating} fractions={2} readOnly size="sm" />
              </div>
            </div>

            {/* Testimonial */}
            <p className="text-sm leading-relaxed text-mine-shaft-600 dark:text-mine-shaft-400">
              “{data.testimonial}”
            </p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;