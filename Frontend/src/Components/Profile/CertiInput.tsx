
import { Button, TextInput } from "@mantine/core";
import fields from "../../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../services/NotificationService";

const CertiInput = (props: any) => {
  const dispatch = useDispatch();
  const select = fields;
  const profile = useSelector((state: any) => state.profile);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("Issue date is required"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    let certi = [...profile.certifications];
    certi.push(form.getValues());
    certi[certi.length - 1].issueDate =
      certi[certi.length - 1].issueDate.toISOString();
    dispatch(changeProfile({ ...profile, certifications: certi }));
    props.setEdit(false);
    successNotification("Success", "Certificate added successfully!");
  };

  const inputClass = {
    label: "!text-mine-shaft-700 dark:!text-mine-shaft-300 !font-medium",
    input:
      "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-500 focus:!border-bright-sun-400",
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="capitalize text-lg font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
        Add Certificate
      </div>

      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-5">
        <TextInput
          label="Title"
          {...form.getInputProps("name")}
          withAsterisk
          placeholder="Enter Title"
          classNames={inputClass}
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>

      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-5">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          label="Issue date"
          withAsterisk
          placeholder="Pick date"
          maxDate={new Date()}
          classNames={inputClass}
        />
        <TextInput
          {...form.getInputProps("certificateId")}
          label="Certificate ID"
          withAsterisk
          placeholder="Enter ID"
          classNames={inputClass}
        />
      </div>

      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          Save
        </Button>
        <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;