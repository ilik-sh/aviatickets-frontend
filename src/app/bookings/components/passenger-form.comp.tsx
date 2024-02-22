import { Typography, StackProps, Stack, styled, TypographyProps } from "@mui/material"
import { FC } from "react"
import { Control, FieldErrors } from "react-hook-form"
import { CreateBookingFormYup } from "../validation-schemas/create-booking-form.schema"
import TextField from "./text-field.comp";

interface PassengerFormProps {
  index: number,
  control: Control<CreateBookingFormYup, any>,
  validationErrors: FieldErrors<CreateBookingFormYup>;
}

const StyledContainer = styled(Stack)<StackProps>(() => ({
  padding: '10px'
}));

const StyledPassengerNumber = styled(Typography)<TypographyProps>(() => ({
  marginBottom: '10px',
  fontSize: '20px'
}));

const StyledPassengerFormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  rowGap: '32px',
  columnGap: '20px',

  '@media(max-width: 700px)': {
    flexWrap: 'wrap'
  },
}));

export const PassengerForm: FC<PassengerFormProps> = ({ index, control, validationErrors }) => {
  return (
    <StyledContainer>
      <StyledPassengerNumber>Passenger {index + 1}</StyledPassengerNumber>
      <StyledPassengerFormContainer>
        <TextField
          label="First name"
          name={`passengers.${index}.firstName`}
          control={control}
          error={Boolean(validationErrors.passengers?.[index]?.firstName)}
          helperText={validationErrors.passengers?.[index]?.firstName?.message}
        />
        <TextField
          label="Last name"
          name={`passengers.${index}.lastName`}
          control={control}
          error={Boolean(validationErrors.passengers?.[index]?.lastName)}
          helperText={validationErrors.passengers?.[index]?.lastName?.message}
        />
        <TextField
          label="Passport id"
          name={`passengers.${index}.passportId`}
          control={control}
          error={Boolean(validationErrors.passengers?.[index]?.passportId)}
          helperText={validationErrors.passengers?.[index]?.passportId?.message}
        />
      </StyledPassengerFormContainer>
    </StyledContainer>
  )
}