import {
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

export type RadioGroupOption = {
  value: string
  label: string
}

type FormRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  label: string
  options: RadioGroupOption[]
  optionLabelProps?: FormControlLabelProps
} & Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  RadioGroupProps

export const FormRadioGroup = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  options,
  label,
  disabled,
  optionLabelProps,
  control,
  ...other
}: FormRadioGroupProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <FormControl disabled={disabled || isSubmitting} error={!!error}>
          <FormLabel id={name}>{label}</FormLabel>
          <RadioGroup row aria-labelledby={name} {...field} {...other}>
            {options.map((option) => (
              <Box key={option.value}>
                <FormControlLabel
                  control={<Radio />}
                  value={option.value}
                  label={option.label}
                  {...optionLabelProps}
                />
              </Box>
            ))}
          </RadioGroup>

          {!!error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
