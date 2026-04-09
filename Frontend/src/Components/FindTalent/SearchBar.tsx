
import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../../Data/TalentData";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(min-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([1, 50]);
  const [name, setName] = useState("");

  const handleChange = (field: string, event: any) => {
    if (field === "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      const val = event.target.value;
      setName(val);
      dispatch(updateFilter({ name: val }));
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            onClick={toggle}
            m="sm"
            radius="lg"
            variant="outline"
            color="brightSun.4"
            autoContrast
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}
      </div>

      <Collapse in={opened || !matches}>
        <div className="flex lg-mx:!flex-wrap px-5 py-8 items-center gap-4">

          {/* Name Input */}
          <div className="flex lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 items-center w-1/5">
            <div className="text-bright-sun-400 bg-mine-shaft-100 dark:bg-mine-shaft-900 rounded-full p-1 mr-2">
              <IconUserCircle size={20} />
            </div>
            <Input
              variant="unstyled"
              value={name}
              onChange={(e) => handleChange("name", e)}
              placeholder="Talent Name"
              className="[&_input]:!placeholder-mine-shaft-400 dark:[&_input]:!placeholder-mine-shaft-300 [&_input]:!text-mine-shaft-900 dark:[&_input]:!text-mine-shaft-100 w-full"
            />
          </div>

          <Divider
            mr="xs"
            className="sm-mx:hidden"
            size="xs"
            orientation="vertical"
            color="mineShaft.2"
          />

          {/* Search Fields */}
          {searchFields.map((item, index) => (
            <div
              key={index}
              className="flex items-center w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1"
            >
              <Divider
                mr="xs"
                className="sm-mx:hidden"
                size="xs"
                orientation="vertical"
                color="mineShaft.2"
              />
              <MultiInput {...item} />
            </div>
          ))}

          {/* Experience Slider */}
          <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10 lg-mx:mt-7 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
            <div className="flex text-sm justify-between text-mine-shaft-700 dark:text-mine-shaft-300 mb-1">
              <div>Experience</div>
              <div>
                {value[0]} Years - {value[1]} Years
              </div>
            </div>
            <RangeSlider
              value={value}
              min={0}
              max={50}
              minRange={1}
              labelTransitionProps={{
                transition: "skew-down",
                duration: 150,
                timingFunction: "linear",
              }}
              size="xs"
              color="brightSun.5"
              onChange={setValue}
              onChangeEnd={(val) => handleChange("exp", val)}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default SearchBar;