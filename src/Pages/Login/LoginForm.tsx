import { Button, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import AvatarIconComponent from '../../Components/Avatar/AvatarIcon'
import SubmitForm from '../../Components/Button/SubmitForm'
import ControllerEmailInput from '../../Components/Form/ControllerEmailInput'
import ControllerPasswordInput from '../../Components/Form/ControllerPasswordInput'
import * as HISTORY from '../../history'
import { userLogIn } from '../../store/user/action-creators'
import { useFormStyles } from '../../theme/form'

type Inputs = {
  email: string
  password: string
}

const LoginForm: React.FC = (): ReactElement => {
  const classes = useFormStyles()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const submitForm: SubmitHandler<Inputs> = (data) => {
    dispatch(
      userLogIn({
        email: data.email,
        password: data.password,
      })
    )
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container>
            <AvatarIconComponent icon={<LockOutlinedIcon />} />
            <ControllerEmailInput
              control={control}
              defaultValue=""
              error={errors.email}
              label="Email Address"
              name="email"
            />
            <ControllerPasswordInput
              control={control}
              defaultValue=""
              error={errors.password}
              label="Password"
              name="password"
              validateLength={false}
            />
          </Grid>
          <SubmitForm caption="LOG IN" color="primary" />
          <Button color="secondary" onClick={HISTORY.gotoForgotPassword}>
            Forgot Password?
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default LoginForm
