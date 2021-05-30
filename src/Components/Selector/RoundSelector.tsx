import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { optionsRoundSelector } from '../../utils/selectorFunctions';

const RoundSelector: React.FC = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const options = optionsRoundSelector(+id);

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleMenuItemClick = (_event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setOpen(false);
    history.push(`/klassement/ronde/${(+id - 1) * 3 + index + 1}`);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup color="primary" ref={anchorRef}>
          <Button
            color="primary"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="Ga naar toto ronde"
            aria-haspopup="menu"
            onClick={handleToggle}
            variant="text"
          >
            Ga naar ronde
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem key={option} onClick={(event) => handleMenuItemClick(event, index)}>
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

export default RoundSelector;
