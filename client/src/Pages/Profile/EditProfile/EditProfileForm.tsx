import { Button, Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import SubmitForm from '../../../Components/Button/SubmitForm'
import ControllerCheckbox from '../../../Components/Form/ControllerCheckbox'
import ControllerEmailInput from '../../../Components/Form/ControllerEmailInput'
import ControllerSelect from '../../../Components/Form/ControllerSelect'
import ControllerTextInput from '../../../Components/Form/ControllerTextInput'
import * as HISTORY from '../../../history'
import { IPlayer } from '../../../models/player.model'
import { ITeamForSelector } from '../../../models/toto.models'
import { editUserProfile } from '../../../store/user/action-creators'
import { useFormStyles } from '../../../theme/form'

interface IProps {
  teams: ITeamForSelector[]
  user: IPlayer
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

const EditProfileForm: React.FC<IProps> = ({
  teams,
  user,
}: IProps): ReactElement => {
  const classes = useFormStyles()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const submitForm: SubmitHandler<Inputs> = (data) => {
    dispatch(
      editUserProfile({
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        totaalToto: data.totaalToto,
        teamId: Number(data.teamId),
      })
    )
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container>
            <ControllerTextInput
              control={control}
              defaultValue={user.userName}
              error={errors.userName}
              label="User Name"
              name="userName"
            />
            <ControllerTextInput
              control={control}
              defaultValue={user.firstName}
              error={errors.firstName}
              label="First Name"
              name="firstName"
            />
            <ControllerTextInput
              control={control}
              defaultValue={user.lastName}
              error={errors.lastName}
              label="Last Name"
              name="lastName"
            />
            <ControllerEmailInput
              control={control}
              defaultValue={user.email}
              error={errors.email}
              label="Email Address"
              name="email"
            />
            <ControllerCheckbox
              control={control}
              defaultValue={user.totaalToto}
              label="Totaaltoto"
              name="totaalToto"
            />
            <ControllerTextInput
              control={control}
              defaultValue={user.phoneNumber}
              error={errors.phoneNumber}
              label="Phone Number"
              name="phoneNumber"
            />
            <ControllerSelect<Inputs, ITeamForSelector>
              control={control}
              defaultValue={String(user.team.id)}
              error={errors.teamId}
              label="Team"
              name="teamId"
              options={teams}
            />
          </Grid>
          <SubmitForm caption="UPDATE PROFIEL" color="primary" />
          {/* eslint-disable-next-line */}
          <Button color="secondary" onClick={HISTORY.gotoEditPassword}>
            Change Password
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default EditProfileForm
