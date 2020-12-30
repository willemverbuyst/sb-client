import { Box, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectToken } from '../../store/user/selectors';
import { content, title, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...title(theme),
    ...topSection(theme),
    ...content(theme),
  }),
);

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
}))(MuiAccordion);

const AccordionSummary = withStyles(() => ({
  root: {
    backgroundColor: '#f1f1f1',
    borderBottom: '2px solid #EA9C3B',
    marginBottom: -1,
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
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Rules: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Regels
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.content}>
        <Grid item xs={12} md={8}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="overline">Hoeveel punten kan ik verdienen per wedstrijd?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Het aantal goals per team goed voorspeld: 2 punten (dus 2x 2
                    punten te verdienen)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Een winner of gelijkspel goed voorspeld: 5 punten" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Een volledige uitslag goed voorspeld: 1 punt" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="De punten tellen op, dus als de gehele uitslag goed is
                      voorspeld verdien je in totaal 10 punten."
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant="overline">Hoeveel totorondes worden er gespeeld?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText primary="Er worden in totaal 11 totorondes per seizoen gespeeld." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Elke totoronde duurt 3 speelrondes." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Behalve de laatste totoronde, die bestaat uit 4 speelrondes." />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
              <Typography variant="overline">Wat is de totaaltoto?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText primary="Naast de reguliere totorondes, is er ook een Totaaltoto." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Dit is een aparte toto dat bestaat uit alle 34 speelrondes." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Degene die aan het eind de meeste punten heeft verdiend, wint de Totaaltoto." />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
              <Typography variant="overline">Wanneer ben je de winnaar van de toto?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText primary="Na afloop van de laatste speelronde van een spel worden alle punten bij elkaar opgeteld." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Degene met de meeste punten wint." />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
              <Typography variant="overline">Wat gebeurt er als ik mijn punten niet heb ingezet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText primary="Wanneer een speler geen voorspelling heeft gedaan dan wordt er géén score genoteerd." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Er zijn dan ook geen punten te behalen op deze wedstrijd." />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Rules;
