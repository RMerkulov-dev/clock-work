import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { apiClient } from "../utils/axios-utils";
import { Input } from "./index";
import { useAuthStore } from "../stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  const onSubmit = async (data: FieldValues) => {
    try {
      const { startTime, endTime } = data;

      // Convert start and end time to minutes
      const startTimeInMinutes = convertTimeToMinutes(startTime);
      const endTimeInMinutes = convertTimeToMinutes(endTime);

      // Calculate the total time in minutes
      const totalTime = endTimeInMinutes - startTimeInMinutes;

      // Update the total time on the server
      await updateTotalTimeMutation.mutateAsync(totalTime);
      reset(); // Reset the form after successful submission
    } catch (err) {
      console.log(err);
    }
  };

  const updateTotalTimeMutation = useMutation(
    (totalTime: number) => updateTotalTime(userId, totalTime),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["totalTime", userId]);
      },
    }
  );

  const updateTotalTime = async (userId: string | null, totalTime: number) => {
    if (!userId) {
      return null;
    }

    const res = await apiClient.put(`/users/${userId}/total-time`, {
      totalTime,
    });
    return res.data;
  };

  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  return (
    <>
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
        <button type="submit">Update Time</button>
      </form>
    </>
  );
};

export default AddTimes;
