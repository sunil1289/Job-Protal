import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustmentsAlt } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateSort } from "../Slices/SortSlice";

const jobOptions = [
  "relevance",
  "most recent",
  "salary (low-high)",
  "salary (high-low)",
];

const talentOptions = [
  "relevance",
  "experience: low to high",
  "experience: high to low",
];

const Sort = (props: any) => {
  const dispatch = useDispatch();
  const optionsList = props.sort === "job" ? jobOptions : talentOptions;
  const [selectedItem, setSelectedItem] = useState(optionsList[0]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = optionsList.map((item) => (
 <Combobox.Option
  className="!text-xs capitalize !text-mine-shaft-800 dark:!text-mine-shaft-200 hover:!text-white"
  value={item}
  key={item}
>
  {item}
</Combobox.Option>
  ));

  const handleSelect = (val: string) => {
    setSelectedItem(val);
    dispatch(updateSort(val));
    combobox.closeDropdown();
  };

  return (
    <Combobox
      store={combobox}
      width={180}
      position="bottom-start"
      onOptionSubmit={handleSelect}
    >
      <Combobox.Target>
        <div
          onClick={() => combobox.toggleDropdown()}
          className="cursor-pointer border border-bright-sun-400 flex px-3 py-1 gap-2 rounded-xl size-xl text-sm content-end xs-mx:mt-2 xs-mx:text-xs xs-mx:px-1 xs-mx:py-0 items-center capitalize
            text-mine-shaft-900 dark:text-mine-shaft-200
            hover:bg-mine-shaft-100 dark:hover:bg-mine-shaft-800
            transition-colors duration-200"
        >
          {selectedItem}
          <IconAdjustmentsAlt className="h-4 w-4 text-bright-sun-400" />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown className="!bg-white dark:!bg-mine-shaft-800 !border-mine-shaft-200 dark:!border-mine-shaft-700">
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Sort;