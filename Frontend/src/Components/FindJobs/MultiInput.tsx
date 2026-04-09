
import {
  Checkbox,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

interface MultiInputProps {
  icon: React.ElementType;
  options: string[];
  title: string;
}

const MultiInput = (props: MultiInputProps) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const MAX_DISPLAYED_VALUES = 2;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  useEffect(() => {
    setData(props.options);
  }, [props.options]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch("");
    let updatedValues: string[];
    if (val === "$create") {
      updatedValues = [...value, search];
      setData((prev) => [...prev, search]);
    } else {
      updatedValues = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
    }
    setValue(updatedValues);
    dispatch(updateFilter({ [props.title]: updatedValues }));
  };

  const handleValueRemove = (val: string) => {
    const updatedValues = value.filter((v) => v !== val);
    setValue(updatedValues);
    dispatch(updateFilter({ [props.title]: updatedValues }));
  };

  const values = value
    .slice(
      0,
      value.length <= MAX_DISPLAYED_VALUES
        ? MAX_DISPLAYED_VALUES
        : MAX_DISPLAYED_VALUES - 1,
    )
    .map((item) => (
      <Pill
        key={item}
        withRemoveButton
        onRemove={() => handleValueRemove(item)}
      >
        {item}
      </Pill>
    ));

  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          <Checkbox
            size="xs"
            color="brightSun.4"
            checked={value.includes(item)}
            readOnly
          />
          <span className="text-mine-shaft-700 dark:text-mine-shaft-300 text-sm">
            {item}
          </span>
        </Group>
      </Combobox.Option>
    ));

  const Icon = props.icon;

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          rightSection={
            <IconSelector className="text-mine-shaft-500 dark:text-mine-shaft-400" />
          }
          onClick={() => combobox.toggleDropdown()}
          leftSection={
            <div className="text-bright-sun-400 p-1 bg-mine-shaft-100 dark:bg-mine-shaft-800 rounded-full mr-2">
              <Icon />
            </div>
          }
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder className="!text-mine-shaft-500 dark:!text-mine-shaft-200">
                {props.title}
              </Input.Placeholder>
            )}
            <Combobox.EventsTarget>
              <PillsInput.Field
                value={search}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                  combobox.updateSelectedOptionIndex();
                }}
                placeholder=""
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    if (value.length > 0) {
                      handleValueRemove(value[value.length - 1]);
                    }
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className="!bg-white dark:!bg-mine-shaft-800 !border-mine-shaft-200 dark:!border-mine-shaft-700">
        <Combobox.Search
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder={`Search ${props.title}`}
          classNames={{
            input:
              "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-200 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-500",
          }}
        />
        <Combobox.Options>{options}</Combobox.Options>
        {!exactOptionMatch && search.trim().length > 0 && (
          <Combobox.Option
            value="$create"
            className="text-mine-shaft-700 dark:text-mine-shaft-300"
          >
            + Create {search}
          </Combobox.Option>
        )}
        {exactOptionMatch && options.length === 0 && (
          <Combobox.Empty className="!text-mine-shaft-500 dark:!text-mine-shaft-400">
            Nothing found
          </Combobox.Empty>
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInput;
