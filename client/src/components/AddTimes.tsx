import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import useAddTimeInterval from "../hooks/useAddTimeInterval";
import { Input } from "./index";
import { format, parseISO } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddTimes = () => {
  const { userId } = useAuthStore();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });
  if (!userId) {
    return toast.error("No ID available");
  }
  const addTimeIntervalMutation = useAddTimeInterval(userId);

  const onSubmit = async (data: any) => {
    // Extract the time value from the input
    const startTimeValue = data.startTime; // Format: "hh:mm"
    const endTimeValue = data.endTime; // Format: "hh:mm"

    // Create Date objects with the current date and the extracted time values
    const currentDate = new Date();
    const startTime = parseISO(
      format(currentDate, `yyyy-MM-dd'T'${startTimeValue}:00`)
    );

    const endTime = parseISO(
      format(currentDate, `yyyy-MM-dd'T'${endTimeValue}:00`)
    );

    try {
      await addTimeIntervalMutation.mutateAsync({
        startTime,
        endTime,
      });
      reset();
      await queryClient.invalidateQueries(["totalTime", userId]);
      toast.success("Success");
    } catch (error) {
      console.error("Error saving time interval:", error);
      toast.error("Error:(");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="startTime"
        label="Start Time (hh:mm)"
        type="time"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="endTime"
        label="End Time (hh:mm)"
        type="time"
        register={register}
        errors={errors}
        required
      />
      <button type="submit">Add Time Interval</button>
    </form>
  );
};

export default AddTimes;
