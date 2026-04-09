

import { Combobox, InputBase, ScrollArea, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";

const SelectInput = (props: any) => {
  useEffect(() => {
    setData(props.options);
    setValue(props.form.getInputProps(props.name).value);
    setSearch(props.form.getInputProps(props.name).value);
  }, [props.options]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item?.toLowerCase().includes(search?.toLowerCase().trim())
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
      className="!text-mine-shaft-800 dark:!text-mine-shaft-200 hover:!text-white"
    >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const selected = val === "$create" ? search : val;
        if (val === "$create") {
          setData((current) => [...current, search]);
        }
        setValue(selected);
        setSearch(selected);
        props.form.setFieldValue(props.name, selected);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...props.form.getInputProps(props.name)}
          withAsterisk
          leftSection={<props.leftSection stroke={1.5} />}
          label={props.label}
          rightSection={<Combobox.Chevron />}
          value={search}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
          onChange={(event) => {
            const val = event.currentTarget.value;
            setSearch(val);
            props.form.setFieldValue(props.name, val);
            combobox.openDropdown();
          }}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(props.form.values[props.name] || "");
          }}
          classNames={{
            label:
              "!text-mine-shaft-700 dark:!text-mine-shaft-300 !font-medium",
            input:
              "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-500 focus:!border-bright-sun-400",
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown className="!bg-white dark:!bg-mine-shaft-800 !border-mine-shaft-200 dark:!border-mine-shaft-700">
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options}
            {!exactOptionMatch && search?.trim()?.length > 0 && (
              <Combobox.Option
                value="$create"
                className="!text-mine-shaft-700 dark:!text-mine-shaft-300 hover:!text-white"
              >
                + Create {search}
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectInput;