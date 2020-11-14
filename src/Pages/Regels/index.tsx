import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default function Regels() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);

  return (
    <div className={classes.root}>
      <Typography variant="h2">
        Regels
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Hoeveel punten kan ik verdienen per wedstrijd?</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText primary="Het aantal goals per team goed voorspeld: 2 punten (dus 2x 2
                punten te verdienen)"/>
              </ListItem>
              <ListItem>
                <ListItemText primary="Een winner of gelijkspel goed voorspeld: 5 punten"/>
              </ListItem>
              <ListItem>
                <ListItemText primary="Een volledige uitslag goed voorspeld: 1 punt"/>
              </ListItem>
              <ListItem>
                <ListItemText primary="De punten tellen op, dus als de gehele uitslag goed is
                  voorspeld verdien je in totaal 10 punten."/>
              </ListItem>
            </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Hoeveel totorondes worden er gespeeld?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Er worden in totaal 11 totorondes per seizoen gespeeld. Elke totoronde duurt 3 speelrondes. Behalve de laatste totoronde, die bestaat uit 4 speelrondes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Wat is de totaaltoto?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Naast de reguliere totorondes, is er ook een Totaaltoto. Dit is een aparte toto dat bestaat uit alle 34 speelrondes. Degene die aan het eind de meeste punten heeft verdiend, wint de Totaaltoto.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography className={classes.heading}>Wanneer ben je de winnaar van de toto?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Na afloop van de laatste speelronde van een spel worden alle punten bij elkaar opgeteld. Degene met de meeste punten wint.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography className={classes.heading}>Wat gebeurt er als ik mijn punten niet heb ingezet?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Wanneer een speler geen voorspelling heeft gedaan dan wordt er géén score genoteerd. Er zijn dan ook geen punten te behalen op deze wedstrijd.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
