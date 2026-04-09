


import {
  Button,
  Divider,
  FileInput,
  NumberInput,
  Textarea,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { getBase64 } from "../services/Utilities";
import { applyJob } from "../services/JobService";
import {
  errorNotification,
  successNotification,
} from "../services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);

  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isNotEmpty("Email is required"),
      phone: isNotEmpty("Phone is required"),
      resume: isNotEmpty("Resume is required"),
    },
  });

  const handlePreview = () => {
    form.validate();
    if (!form.isValid()) return;
    setPreview(!preview);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      let resume: any = await getBase64(form.getValues().resume);
      let applicant = {
        ...form.getValues(),
        applicantId: user.id,
        resume: resume.split(",")[1],
      };
      await applyJob(id, applicant);
      successNotification("Success", "Application submitted successfully");
      navigate("/job-history");
    } catch (err: any) {
      errorNotification("Error", err.response?.data?.errorMessage);
    } finally {
      setSubmit(false);
    }
  };

  /* Shared classNames for all inputs in edit mode */
  const inputClass = {
    label: "!text-mine-shaft-700 dark:!text-mine-shaft-300 !font-medium",
    input:
      "!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700 !text-mine-shaft-900 dark:!text-mine-shaft-100 placeholder:!text-mine-shaft-400 dark:placeholder:!text-mine-shaft-500 focus:!border-bright-sun-400",
  };

  /* Preview mode: unstyled — just text color */
  const previewClass = {
    label: "!text-mine-shaft-600 dark:!text-mine-shaft-400 !font-medium",
    input:
      "!text-mine-shaft-800 dark:!text-mine-shaft-300 !font-semibold !bg-transparent",
  };

  const fieldClass = preview ? previewClass : inputClass;

  return (
    <>
      <LoadingOverlay
        className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />

      <Divider
        my="xl"
        color="mineShaft.2"
        className="dark:!border-mine-shaft-700"
      />

      <div className="text-xl font-semibold mb-5 text-mine-shaft-900 dark:text-mine-shaft-100">
        Submit Your Application
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
          <TextInput
            {...form.getInputProps("name")}
            label="Full Name"
            placeholder="Enter name"
            withAsterisk
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            classNames={fieldClass}
          />
          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="Enter email"
            withAsterisk
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            classNames={fieldClass}
          />
        </div>

        {/* Row 2 */}
        <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
          <NumberInput
            {...form.getInputProps("phone")}
            label="Phone Number"
            placeholder="Enter phone number"
            withAsterisk
            hideControls
            min={0}
            max={9999999999}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            classNames={fieldClass}
          />
          <TextInput
            {...form.getInputProps("website")}
            label="Personal Website"
            placeholder="Enter URL"
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            classNames={fieldClass}
          />
        </div>

        {/* Resume */}
        <FileInput
          {...form.getInputProps("resume")}
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach your CV"
          placeholder="Your CV"
          withAsterisk
          leftSectionPointerEvents="none"
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          classNames={fieldClass}
        />

        {/* Cover Letter */}
        <Textarea
          {...form.getInputProps("coverLetter")}
          label="Cover Letter"
          placeholder="Type something about yourself..."
          autosize
          minRows={4}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          classNames={fieldClass}
        />

        {/* Buttons */}
        {!preview && (
          <Button onClick={handlePreview} color="brightSun.4" variant="light">
            Preview
          </Button>
        )}

        {preview && (
          <div className="flex gap-10 [&>*]:w-1/2">
            <Button
              fullWidth
              onClick={handlePreview}
              color="brightSun.4"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="brightSun.4"
              variant="light"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationForm;