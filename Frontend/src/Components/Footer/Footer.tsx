import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBriefcaseFilled,
} from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <div
      className="
        pt-20 px-6 pb-10 
        bg-mine-shaft-50 dark:bg-mine-shaft-900
        text-mine-shaft-800 dark:text-mine-shaft-200
        flex flex-wrap justify-between gap-10
        border-t border-mine-shaft-200 dark:border-mine-shaft-800
        font-['Poppins']
      "
    >
      <div className="w-full md:w-1/4 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-bright-sun-500">
          <IconBriefcaseFilled className="h-6 w-6" />
          <span className="text-xl font-semibold">JobZel</span>
        </div>
        <p className="text-sm text-mine-shaft-600 dark:text-mine-shaft-400 leading-relaxed">
          Job portal with user profiles, skill updates, certifications, work
          experience, and admin job postings.
        </p>
        <div className="flex gap-3">
          {[IconBrandFacebook, IconBrandInstagram, IconBrandX].map(
            (Icon, i) => (
              <div
                key={i}
                className="
                  p-2 rounded-full cursor-pointer
                  bg-bright-sun-400 text-black
                  hover:bg-bright-sun-500 hover:text-black
                  transition-all duration-300
                "
              >
                <Icon size={18} />
              </div>
            )
          )}
        </div>
      </div>

      {footerLinks.map((item, index) => (
        <div key={index} className="min-w-[140px]">
          <h3 className="text-lg font-semibold mb-4 text-bright-sun-500">
            {item.title}
          </h3>
          {item.links.map((link, i) => (
            <div
              key={i}
              className="
                text-sm mb-2 cursor-pointer
                text-mine-shaft-600 dark:text-mine-shaft-400
                hover:text-bright-sun-500 dark:hover:text-bright-sun-400
                hover:translate-x-1
                transition-all duration-200
              "
            >
              {link}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;