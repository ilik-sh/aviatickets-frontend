import {
  styled,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { KeysWithValuesOfType } from "aviatickets-submodule/ticket-search-filter/types/keys-with-values-of-type.type";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface TextFieldProps {
  label: string;
  control: Control<any, any>;
  name: string;
  helperText?: string;
  error: boolean;
}

const StyledMuiTextField = styled(MuiTextField)({
  '@media(max-width: 600px)': {
    width: '100%'
  }
});

const TextField: FC<TextFieldProps> = ({
  label,
  control,
  name,
  error,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <StyledMuiTextField {...props} {...field} error={error} label={label} />
      )}
    />
  );
};

export default TextField;
