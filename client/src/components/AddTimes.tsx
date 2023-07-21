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
      totalTime: "",
    },
  });

  const updateTotalTimeMutation = useMutation(
    (data: FieldValues) => updateTotalTime(userId, data.totalTime),
    {
      onSuccess: (data: number) => {
        queryClient.invalidateQueries(["totalTime", userId]);
        reset();
      },
    }
  );

  const onSubmit = async (data: FieldValues) => {
    try {
      await updateTotalTimeMutation.mutateAsync(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTotalTime = async (userId: string | null, data: FieldValues) => {
    if (!userId) {
      return null;
    }

    const res = await apiClient.put(`/users/${userId}/total-time`, {
      totalTime: data,
    });
    return res.data;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="totalTime"
          label="Total Time"
          type="number"
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
