import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddTimes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      totalTime: "",
    },
  });

  return <div>Add time</div>;
};

export default AddTimes;
