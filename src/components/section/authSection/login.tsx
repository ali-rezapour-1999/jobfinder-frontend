"use client";

import React, { useState } from "react";
import { Form, Input, Button, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/state/authState";
import toast, { Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  const { login, isLoading, setLoading } = useAuthStore();
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = (form: HTMLFormElement) => {
    const email = form.email.value;
    const password = form.password.value;

    const errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "ایمیل وارد نکردی";
    }
    if (!password) {
      errors.password = "رمز عبور وارد نکردی";
    }
    return errors;
  };

  const inputChangeHandler = async (
    input: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({ ...formData, [input.target.name]: input.target.value });
  };
  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const errors = validateForm(form);

    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
    } else {
      setLoading(true);
      const result = await login(formData.email, formData.password);
      try {
        if (result.success) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col px-10 items-center justify-center"
    >
      <h1 className="text-2xl font-bold mb-8 border-b-1">ورود به جرقه</h1>
      <Form
        onSubmit={onSubmitLogin}
        className="w-full items-center justify-center flex flex-col gap-8"
      >
        <Input
          isRequired
          label="ایمیل"
          labelPlacement="outside"
          name="email"
          placeholder="ایمیل خود را وارد کنید"
          type="email"
          size="lg"
          validate={() => formErrors.email || ""}
          value={formData.email}
          onChange={inputChangeHandler}
        />
        <Input
          isRequired
          label="رمز عبور"
          labelPlacement="outside"
          name="password"
          placeholder="رمز عبور خود را وارد کنید"
          type="password"
          size="lg"
          validate={() => formErrors.password || ""}
          value={formData.password}
          onChange={inputChangeHandler}
        />
        <Button color="primary" type="submit" className="px-10">
          {isLoading ? <Spinner /> : " ورود "}
        </Button>
      </Form>
      <Toaster position="top-center" />
    </motion.div>
  );
};

export default Login;
