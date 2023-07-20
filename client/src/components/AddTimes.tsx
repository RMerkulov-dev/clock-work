import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { apiClient } from "../utils/axios-utils";
import { Button, Input } from "./index";
import { useAuthStore } from "../stores/authStore";

const AddTimes = () => {
  const { userId } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      totalTime: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await updateTotalTime(userId, data.totalTime);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTotalTime = async (userId: string | null, data: number) => {
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
      <form>
        <Input
          id="totalTime" // Use "totalTime" instead of "time" to match the data field
          label="Total Time"
          type="number" // Assuming you want to enter a numeric value for total time
          register={register}
          errors={errors}
          required
        />
        <Button onClick={handleSubmit(onSubmit)} label="Update  time"></Button>
      </form>
    </>
  );
};

export default AddTimes;
