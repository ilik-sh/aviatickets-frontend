import * as yup from "yup";
import { InferType } from "yup";

export const createBookingFormSchema = yup
  .object()
  .shape({
    passengers: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            firstName: yup.string().max(50, "50 symbols max").required("First name is required"),
            passportId: yup.string().max(50, "50 symbols max").required("Passport number is required"),
            lastName: yup.string().max(50, "50 symbols max").required("Last name is required"),
          })
          .required()
      )
      .required(),
  })
  .required();

export type CreateBookingFormYup = InferType<typeof createBookingFormSchema>;
