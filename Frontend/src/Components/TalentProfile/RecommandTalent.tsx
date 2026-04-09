


import { useParams } from "react-router-dom";
import TalentCard from "../FindTalent/TalentCard";

const RecommendTalent = (props: any) => {
  const { id } = useParams();

  return (
    <div>
      <div className="text-xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
        Recommended Talent
      </div>
      <div className="flex flex-col flex-wrap gap-5">
        {props?.talents?.map(
          (talent: any, idx: any) =>
            idx < 4 && id != talent.id && <TalentCard key={idx} {...talent} />
        )}
      </div>
    </div>
  );
};

export default RecommendTalent;