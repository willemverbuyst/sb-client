import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  }),
);

const PinnedSubheaderList: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 11].map((sectionId) => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`Totoronde ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`Ronde-${sectionId}-${item}`}>
                <ListItemText primary={`Ronde ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default PinnedSubheaderList;
