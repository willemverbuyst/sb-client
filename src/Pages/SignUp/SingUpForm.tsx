import { Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import SubmitForm from '../../Components/Button/SubmitForm'
import ControllerCheckbox from '../../Components/Form/ControllerCheckbox'
import ControllerEmailInput from '../../Components/Form/ControllerEmailInput'
import ControllerSelect from '../../Components/Form/ControllerSelect'
import ControllerTextInput from '../../Components/Form/ControllerTextInput'
import { ITeamForSelector } from '../../models/toto.models'
import { addPlayer } from '../../store/players/action-creators'
import { useFormStyles } from '../../theme/form'

interface IProps {
  teams: ITeamForSelector[]
}

type Inputs = {
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  totaalToto: boolean
  teamId: string
}

const SignUpForm: React.FC<IProps> = ({ teams }: IProps): ReactElement => {
  const classes = useFormStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()

  const submitForm: SubmitHandler<Inputs> = (data) => {
    dispatch(
      addPlayer({
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        totaalToto: data.totaalToto,
        teamId: Number(data.teamId),
      })
    )
    reset(data, {
      keepValues: false,
    })
    history.push('/spelers')
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container>
            <ControllerTextInput
              control={control}
              defaultValue=""
              error={errors.userName}
              label="User Name"
              name="userName"
            />
            <ControllerTextInput
              control={control}
              defaultValue=""
              error={errors.firstName}
              label="First Name"
              name="firstName"
            />
            <ControllerTextInput
              control={control}
              defaultValue=""
              error={errors.lastName}
              label="Last Name"
              name="lastName"
            />
            <ControllerEmailInput
              control={control}
              defaultValue=""
              error={errors.email}
              label="Email Address"
              name="email"
            />
            <ControllerCheckbox
              control={control}
              defaultValue
              label="Totaaltoto"
              name="totaalToto"
            />
            <ControllerTextInput
              control={control}
              defaultValue=""
              error={errors.phoneNumber}
              label="Phone Number"
              name="phoneNumber"
            />
            <ControllerSelect<Inputs, ITeamForSelector>
              control={control}
              defaultValue=""
              error={errors.teamId}
              label="Team"
              name="teamId"
              options={teams}
            />
          </Grid>
          <SubmitForm caption="SIGN UP" color="primary" />
        </form>
      </Grid>
    </Grid>
  )
}

export default SignUpForm
