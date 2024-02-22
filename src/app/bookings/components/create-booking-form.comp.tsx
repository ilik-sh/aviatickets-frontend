import { Button, ButtonProps, Stack, StackProps, styled } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { PassengerForm } from "./passenger-form.comp";
import { FC } from "react";
import {
  createBookingFormSchema,
  CreateBookingFormYup,
} from "../validation-schemas/create-booking-form.schema";
import { useAppSelector } from "hooks/redux.hooks";
import { tickerSearchFilterSelector } from "aviatickets-submodule/ticket-search-filter/store/ticket-search-filter.selectors";

interface CreateBookingFormProps {
  onBookButtonClick: (state: CreateBookingFormYup) => void;
  isBookButtonDisabled: boolean;
}

const StyledForm = styled("form")(() => ({
  borderRadius: "20px",
  padding: "20px 0",
}));

const StyledStack = styled(Stack)<StackProps>(() => ({
  flexDirection: "column",
  rowGap: "20px",
}));

const StyledBookButton = styled(Button)<ButtonProps>(() => ({
  fontSize: "1rem",
  alignSelf: "center",
}));

const CreateBookingForm: FC<CreateBookingFormProps> = ({
  onBookButtonClick,
  isBookButtonDisabled,
}) => {
  const { filter } = useAppSelector(tickerSearchFilterSelector);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBookingFormYup>({
    mode: "all",
    resolver: yupResolver(createBookingFormSchema),
    defaultValues: {
      passengers: Array.from(Array(+filter.passengerAmount), () => ({
        firstName: "",
        lastName: "",
        passportId: "",
      })),
    },
  });
  console.log(filter.passengerAmount)

  const { fields } = useFieldArray({
    name: "passengers",
    control,
  });

  return (
    <StyledForm onSubmit={handleSubmit(onBookButtonClick)}>
      <StyledStack>
        {fields.map((field, index) => (
          <PassengerForm
            key={field.id}
            index={index}
            control={control}
            validationErrors={errors}
          />
        ))}
        <StyledBookButton
          variant="contained"
          type="submit"
          disabled={isBookButtonDisabled}
        >
          Book
        </StyledBookButton>
      </StyledStack>
    </StyledForm>
  );
};

export default CreateBookingForm;
