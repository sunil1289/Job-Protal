import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Post Job", url: "post-job/0" },
    { name: "Posted jobs", url: "posted-jobs/0" },
    { name: "Job History", url: "job-history" },
    { name: "SignUp", url: "signup" },
  ];

  const location = useLocation();

  return (
    <div className="flex bs-mx:!hidden  bg-mine-shaft-100 dark:bg-mine-shaft-900 text-mine-shaft-800 dark:text-mine-shaft-200 gap-5  h-full items-center">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            location.pathname === `/${link.url}`
              ? "border-b-2 border-bright-sun-400 text-bright-sun-400"
              : "border-b-2 border-transparent"
          } h-full flex items-center`}
        >
          <Link to={`/${link.url}`}>{link.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
