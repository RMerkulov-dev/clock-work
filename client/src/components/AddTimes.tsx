import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import useAddTimeInterval from "../hooks/useAddTimeInterval";
import { Button, Input } from "./index";
import { format, parseISO } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLoading } from "../hooks/useLoading";

const AddTimes = () => {
  const loading = useLoading();
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
      description: "",
    },
  });

  if (!userId) {
    return toast.error("No ID available");
  }
  const addTimeIntervalMutation = useAddTimeInterval(userId);
  console.log("loading", loading);
  const onSubmit = async (data: any) => {
    loading.onLoadingStart();

    const startTimeValue = data.startTime;
    const endTimeValue = data.endTime;
    const description = data.description;

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
        description,
      });
      reset();
      await queryClient.invalidateQueries(["totalTime", userId]);
      toast.success("Success");
      loading.onLoadingFinish();
    } catch (error) {
      console.error("Error saving time interval:", error);
      toast.error("Error:(");
    }
  };

  return (
    <div>
      <form className="flex flex-col items-center justify-center gap-4">
        <Input
          id="description" // Add the description input
          label="Description"
          type="text"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="startTime"
          label="Start Time "
          type="time"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="endTime"
          label="End Time "
          type="time"
          register={register}
          errors={errors}
          required
        />

        <Button
          disabled={loading.isLoading}
          label="ADD"
          onClick={handleSubmit(onSubmit)}
        ></Button>
      </form>
    </div>
  );
};

export default AddTimes;
