import React, { useCallback, useState } from "react";
import { useRegisterModal } from "../../hooks/useRegisterModal";
import { useLoginModal } from "../../hooks/useLoginModal";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/axios-utils";
import toast from "react-hot-toast";
import Heading from "../Heading";
import { Input, Modal } from "../index";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routes";
import { useAuth } from "../../hooks/useAuth";

const LoginModal = () => {
  const navigate = useNavigate();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const isLogin = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { times } = routes;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUserMutation = useMutation((data) =>
    axios.post(`${BASE_URL}/auth/login`, data)
  );
  const onSubmit = (data: any) => {
    loginUserMutation
      .mutateAsync(data)
      .then(() => {
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
        console.log(data);
        isLogin.onLogin();
        navigate(times);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        loginModal.onClose();
      });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to ClockWork"
        subtitle="Please Log in to your account"
      />
      <Input
        id="email"
        label="Email"
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
        First time using ClockWork?
        <span
          onClick={toggle}
          className="
              text-gray-500
              cursor-pointer
              hover:underline
            "
        >
          {" "}
          Register
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Log in"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
