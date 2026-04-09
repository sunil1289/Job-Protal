
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../services/ProfileService";
import { resetFilter } from "../Slices/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState<any[]>([]);
  const [filteredTalent, setFilteredTalent] = useState<any[]>([]);

  const filter = useSelector((state: any) => state.filter) || {
    name: "",
    "Job Title": [],
    Location: [],
    Skills: [],
    exp: [],
  };
  const sort = useSelector((state: any) => state.sort);

  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => setTalents(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let sorted = [...talents];
    if (sort === "experience: low to high") {
      sorted.sort((a: any, b: any) => a.totalExp - b.totalExp);
    } else if (sort === "experience: high to low") {
      sorted.sort((a: any, b: any) => b.totalExp - a.totalExp);
    }
    setTalents(sorted);
  }, [sort]);

  useEffect(() => {
    let result = [...talents];

    if (filter.name) {
      result = result.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter["Job Title"]?.length > 0) {
      result = result.filter((talent: any) =>
        filter["Job Title"].some((title: string) =>
          talent.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location?.length > 0) {
      result = result.filter((talent: any) =>
        filter.Location.some((loc: string) =>
          talent.location?.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }
    if (filter.Skills?.length > 0) {
      result = result.filter((talent: any) =>
        filter.Skills.some((skill: string) =>
          talent.skills?.some((tSkill: string) =>
            tSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    if (filter.exp?.length > 0) {
      result = result.filter(
        (talent: any) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
      );
    }

    setFilteredTalent(result);
  }, [filter, talents]);

  return (
    <div className="p-5">
      <div className="flex justify-between mt-5">
        <div className="text-2xl font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
          Talents
        </div>
        <Sort />
      </div>

      <div className="mt-10 flex flex-wrap gap-10 justify-start">
        {filteredTalent.length ? (
          filteredTalent.map((talent: any, index: number) => (
            <TalentCard key={index} {...talent} />
          ))
        ) : (
          <div className="text-red-500 font-semibold text-xl">
            No talents found
          </div>
        )}
      </div>
    </div>
  );
};

export default Talents;