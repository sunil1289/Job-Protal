
import { useState } from "react";
import { dropdownData } from "../../Data/JobsData";
import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import MultiInput from "./MultiInput";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(min-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([1, 300]);

  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
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
        <div className="flex lg-mx:!flex-wrap justify-evenly gap-2 pt-4 px-2 mx-auto">
          {dropdownData.map((dropdownItem, idx) => (
            <React.Fragment key={idx}>
              <div
                key={idx}
                className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1"
              >
                <MultiInput {...dropdownItem} />
              </div>
              <Divider
                className="sm-mx:hidden"
                mr="xs"
                size="xs"
                orientation="vertical"
              />
            </React.Fragment>
          ))}

          <div className="w-1/5 lg-mx:mt-7 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
            <div className="flex justify-between text-sm text-mine-shaft-700 dark:text-mine-shaft-300 mb-1">
              <div>Salary</div>
              <div>
                &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
              </div>
            </div>
            <RangeSlider
              value={value}
              onChange={setValue}
              onChangeEnd={handleChange}
              minRange={1}
              color="brightSun.5"
              size="xs"
              min={1}
              labelTransitionProps={{
                transition: "skew-down",
                duration: 150,
                timingFunction: "linear",
              }}
              max={300}
              step={1}
              defaultValue={[10, 30]}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default SearchBar;