import { List, ListItem, ListItemText } from '@material-ui/core'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import { Theme, withStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const AccordionDetails = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails)

interface IProps {
  answers: Array<{ id: number; text: string }>
}

const AccordionAnswers: React.FC<IProps> = ({
  answers,
}: IProps): ReactElement => (
  <AccordionDetails>
    <List>
      {answers.map((answer) => (
        <ListItem key={answer.id}>
          <ListItemText primary={answer.text} />
        </ListItem>
      ))}
    </List>
  </AccordionDetails>
)

export default AccordionAnswers
