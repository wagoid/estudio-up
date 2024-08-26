import { Button, ButtonProps } from '@mui/material'
import { Control, FieldValues, useFormState } from 'react-hook-form'

export const FormSubmitButton = <TFieldValues extends FieldValues>({
  control,
  disableDirtyCheck,
  ...otherProps
}: Omit<ButtonProps, 'disabled'> & {
  control: Control<TFieldValues>
  disableDirtyCheck?: boolean
}) => {
  const { isDirty, isSubmitting, isValid } = useFormState({ control })

  return (
    <Button
      variant="contained"
      type="submit"
      disabled={(!disableDirtyCheck && !isDirty) || isSubmitting || !isValid}
      {...otherProps}
    />
  )
}
