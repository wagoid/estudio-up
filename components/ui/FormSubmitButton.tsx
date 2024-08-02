import { Button, ButtonProps } from '@mui/material'
import { Control, FieldValues, useFormState } from 'react-hook-form'

export const FormSubmitButton = <TFieldValues extends FieldValues>({
  control,
  ...otherProps
}: Omit<ButtonProps, 'disabled'> & { control: Control<TFieldValues> }) => {
  const { isDirty, isSubmitting, isValid } = useFormState({ control })

  return (
    <Button
      variant="contained"
      type="submit"
      disabled={!isDirty || isSubmitting || !isValid}
      {...otherProps}
    />
  )
}
