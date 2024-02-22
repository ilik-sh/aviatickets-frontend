import React from "react";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useAppDispatch } from "hooks/redux.hooks";
import { signIn } from "aviatickets-submodule/auth/store/auth.actions";
import { SignInForm as SignIn } from "aviatickets-submodule/auth/types/forms/sign-in.form";
import { useNavigate } from "react-router-dom";
import { signInFormSchema } from "aviatickets-submodule/auth/validation-schemas/sign-in-form.schema";
import Paper from "@mui/material/Paper";
import { yupResolver } from "@hookform/resolvers/yup";
import MainImage from "./components/main-image.comp";
import SignInForm from "./components/forms/sign-in-form.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { enqueueSnackbar } from "notistack";
import { getDeviceId } from "./utils/get-device-id";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: yupResolver(signInFormSchema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignIn) => {
    let device = getDeviceId();

    const response = await dispatch(signIn(data));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      navigate("/flight-search");
      enqueueSnackbar("Succesfully signed in", {
        variant: "success",
      });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <MainImage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignInForm
          control={control}
          onSubmit={handleSubmit(onSubmit)}
          validationErrors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default SignInPage;
