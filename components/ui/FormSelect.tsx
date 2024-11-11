import {
  FormControl,
  FormControlLabelProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

export type SelectOption = {
  value: string
  label: string
}

type FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  label: string
  options: SelectOption[]
  idSuffix?: string
} & Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  SelectProps

export const FormSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  options,
  label,
  idSuffix: idSuffixParam,
  disabled,
  control,
  ...other
}: FormSelectProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { error },
        formState: { isSubmitting },
      }) => {
        const idSuffix = idSuffixParam ?? (Math.random() * 1000).toString()
        const labelId = `${name}-label-${idSuffix}`

        return (
          <FormControl disabled={disabled || isSubmitting} error={!!error}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
              labelId={labelId}
              id={`${name}-${idSuffix}`}
              label={label}
              size="small"
              {...field}
              {...other}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {!!error && <FormHelperText error>{error.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
