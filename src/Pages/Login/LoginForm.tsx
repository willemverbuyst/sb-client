import { Grid, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { ReactElement, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import AvatarIconComponent from '../../Components/Avatar/AvatarIcon';
import SubmitButtonComponent from '../../Components/Button/SubmitButton';
import FormContainer from '../../Components/Form/FormContainer';
import PasswordFieldComponent from '../../Components/Form/PasswordField';
import TextFieldComponent from '../../Components/Form/TextField';
import * as HISTORY from '../../history';
import { ILogInCredentials } from '../../models/credentials.model';
import { userLogIn } from '../../store/user/action-creators';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

type Inputs = {
  email: string;
  exampleRequired: string;
};

const LoginForm: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [logInCredentials, setLogInCredentials] = useState<ILogInCredentials>({
    email: '',
    password: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(userLogIn(logInCredentials));
    setLogInCredentials({
      email: '',
      password: '',
    });
  };

  const updateLoginCredentials = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLogInCredentials({
      ...logInCredentials,
      [event.target.id]: event.target.value,
    });

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <AvatarIconComponent icon={<LockOutlinedIcon />} />
            <TextField
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              // id="email"
              label="Email Address"
              // value={logInCredentials.email}
              // onChange={updateLoginCredentials}
              {...register('email', { required: true })}
            />
            {errors.email && <span>This field is required</span>}

            {/* <input {...register('exampleRequired', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>} */}
            <input type="submit" />
          </Grid>
        </form>
      </Grid>
    </Grid>

    // <FormContainer
    //   inputFields={
    //     <>
    //       <AvatarIconComponent icon={<LockOutlinedIcon />} />
    //       <TextFieldComponent
    //         id="email"
    //         label="Email Address"
    //         value={logInCredentials.email}
    //         onChange={updateLoginCredentials}
    //       />
    //       <PasswordFieldComponent
    //         id="password"
    //         label="Password"
    //         value={logInCredentials.password}
    //         onChange={updateLoginCredentials}
    //       />
    //     </>
    //   }
    //   submitButton={
    //     <SubmitButtonComponent
    //       caption="LOG IN"
    //       color="primary"
    //       handleClick={submitForm}
    //     />
    //   }
    //   link={
    //     <Link href="#" onClick={HISTORY.gotoForgotPassword}>
    //       Forgot Password?
    //     </Link>
    //   }
    // />
  );
};

export default LoginForm;
