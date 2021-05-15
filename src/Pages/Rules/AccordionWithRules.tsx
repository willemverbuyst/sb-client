import { Typography } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { ReactElement } from 'react';

import { listOfRules } from '../../constants/listOfRules';
import AccordionAnswers from './AccordionAnswers';

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

const AccordionWithRules: React.FC = (): ReactElement => {
  return (
    <>
      {listOfRules.map((rule, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="overline">{rule.question}</Typography>
          </AccordionSummary>
          <AccordionAnswers answers={rule.answers} />
        </Accordion>
      ))}
    </>
  );
};

export default AccordionWithRules;
