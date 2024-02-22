import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useAppDispatch } from "hooks/redux.hooks";
import { useNavigate } from "react-router-dom";
import { SignUpForm as SignUp } from "aviatickets-submodule/auth/types/forms/sign-up.form";
import { signUp } from "aviatickets-submodule/auth/store/auth.actions";
import { signUpFormSchema } from "aviatickets-submodule/auth/validation-schemas/sign-up-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpForm from "./components/forms/sign-up-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";
import { getDeviceId } from "./utils/get-device-id";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: yupResolver(signUpFormSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    let device = getDeviceId();

    const response = await dispatch(signUp(data));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      navigate("/flight-search");
      enqueueSnackbar("Succesfully signed up", {
        variant: "success",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignUpForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        validationErrors={errors}
      />
    </Container>
  );
};

export default SignUpPage;
