import { Grid, Typography } from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { ReactElement } from 'react'

import listOfRules from '../../constants/listOfRules'
import AccordionAnswers from './AccordionAnswers'

const Accordion = withStyles(() => ({
  root: {
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion)

const AccordionSummary = withStyles(() => ({
  root: {
    backgroundColor: '#f1f1f1',
    borderBottom: '1px solid #EA9C3B',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary)

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}))

const AccordionWithRules: React.FC = (): ReactElement => {
  const classes = useStyles()

  return (
    <Grid container justify="center" className={classes.content}>
      <Grid item xs={12} md={8}>
        {listOfRules.map((rule) => (
          <Accordion key={rule.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="overline">{rule.question}</Typography>
            </AccordionSummary>
            <AccordionAnswers answers={rule.answers} />
          </Accordion>
        ))}
      </Grid>
    </Grid>
  )
}

export default AccordionWithRules
