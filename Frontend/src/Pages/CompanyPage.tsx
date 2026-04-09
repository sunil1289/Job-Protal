import { Button } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import Company from "../Components/CompanyProfile/Company";
import SimilarCompanies from "../Components/CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-5 pt-5">
        <Button
          color="brightSun.4"
          my="md"
          onClick={() => navigate(-1)}
          leftSection={<IconArrowNarrowLeft />}
          variant="light"
        >
          Back
        </Button>
      </div>

      <div className="flex justify-between gap-5">
        <Company />
        <SimilarCompanies />
      </div>
    </>
  );
};

export default CompanyPage;
