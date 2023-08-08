import React, { useCallback, useState } from "react";
import { Input, Modal } from "../index";
import { useRegisterModal } from "../../hooks/useRegisterModal";
import { useLoginModal } from "../../hooks/useLoginModal";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiClient } from "../../utils/axios-utils";
import Heading from "../Heading";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/authStore";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const setUserId = useAuthStore((state) => state.setUserId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const registerUserMutation = useMutation((data) =>
    apiClient.post("/api/auth/register", data)
  );
  const onSubmit = (data: any) => {
    setIsLoading(true);
    registerUserMutation
      .mutateAsync(data)
      .then((response) => {
        const userId = response.data._id;
        const token = response.data.token;
        setUserId(userId, token);
        console.log("userId", userId);
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        registerModal.onClose();
        loginModal.onOpen();
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to ClockWork" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="fullName"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div>
      <p>
        Already have an account?
        <span
          onClick={toggle}
          className="
              text-gray-500
              cursor-pointer
              hover:underline
            "
        >
          Log in
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
