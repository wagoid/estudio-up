import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type FormTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  Omit<TextFieldProps, 'style' | 'defaultValue'> & { label?: string }

export const FormTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  defaultValue,
  type,
  shouldUnregister,
  disabled: disabledProp,
  helperText: helperTextProp,
  ...otherProps
}: FormTextFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      disabled={disabledProp}
      render={({
        field: { ref, disabled, ...otherFieldProps },
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <TextField
          inputRef={ref}
          helperText={error?.message ?? helperTextProp}
          size="small"
          error={!!error}
          type={type}
          style={
            type === 'hidden' ? { visibility: 'hidden', margin: 0 } : undefined
          }
          disabled={disabled ?? isSubmitting}
          {...otherFieldProps}
          {...otherProps}
        />
      )}
    />
  )
}
