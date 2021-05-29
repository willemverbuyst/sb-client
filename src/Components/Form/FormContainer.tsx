import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

interface IProps {
  inputFields: JSX.Element;
  submitButton: JSX.Element;
}

const FormContainer: React.FC<IProps> = ({ inputFields, submitButton }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.paper}>
        <form className={classes.form}>
          <Grid container spacing={1}>
            {inputFields}
          </Grid>
          {submitButton}
        </form>
      </Grid>
    </Grid>
  );
};

export default FormContainer;
