import Marquee from "react-fast-marquee";
import { companies } from "../../Data/Data";

const Companies = () => {
  return (
    <div className="mt-20 pb-5 bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200">
      <div
        className="text-4xl xs-mx:text-xl md-mx:text-3xl sm-mx:text-2xl 
                  text-center font-semibold mb-10"
      >
        Trusted By <span className="text-bright-sun-400">1000+</span> Companies
      </div>

      <Marquee pauseOnHover={true} className="mt-4">
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-8 px-2 py-1 sm-mx:mx-6 xs-mx:mx-4 xsm-mx:mx-2 
                   hover:bg-mine-shaft-200 dark:hover:bg-mine-shaft-700 
                   rounded-xl cursor-pointer"
          >
            <img
              className="h-14"
              src={`/Companies/${company}.png`}
              alt={company}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};
export default Companies;
