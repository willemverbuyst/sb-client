import { Button, Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import SubmitForm from '../../../Components/Button/SubmitForm'
import ControllerPasswordInput from '../../../Components/Form/ControllerPasswordInput'
import * as HISTORY from '../../../history'
import { changePassword } from '../../../store/user/action-creators'
import { useFormStyles } from '../../../theme/form'

type Inputs = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const EditPasswordForm: React.FC = (): ReactElement => {
  const classes = useFormStyles()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>()
  const newPassword = watch('newPassword', '')

  const submitForm: SubmitHandler<Inputs> = (data) => {
    dispatch(
      changePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmPassword
      )
    )
    reset(data, {
      keepValues: false,
    })
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container>
            <ControllerPasswordInput
              control={control}
              defaultValue=""
              error={errors.currentPassword}
              label="Current Password"
              name="currentPassword"
              validateLength={false}
            />
            <ControllerPasswordInput
              control={control}
              defaultValue=""
              error={errors.newPassword}
              label="New Password"
              name="newPassword"
              validateLength
            />
            <ControllerPasswordInput
              control={control}
              defaultValue=""
              error={errors.confirmPassword}
              label="Confirm Password"
              name="confirmPassword"
              validateLength
              newPassword={newPassword}
            />
          </Grid>
          <SubmitForm caption="CHANGE PASSWORD" color="primary" />
          <Button color="secondary" onClick={HISTORY.gotoProfile}>
            Update Profile
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default EditPasswordForm
