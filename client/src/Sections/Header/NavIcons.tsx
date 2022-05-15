import { Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Weekend } from '@material-ui/icons'
import BarChart from '@material-ui/icons/BarChart'
import EmojiEvents from '@material-ui/icons/EmojiEvents'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Face from '@material-ui/icons/Face'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl'
import Group from '@material-ui/icons/Group'
import HelpOutline from '@material-ui/icons/HelpOutline'
import PersonAdd from '@material-ui/icons/PersonAdd'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'
import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import NavIcon from '../../Components/NavIcon'
import * as HISTORY from '../../history'
import { userLogOut } from '../../store/user/action-creators'
import {
  selectRoundAndTotoRoundNumber,
  selectUser,
} from '../../store/user/selectors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: '1.8rem',
    },
    iconSet: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        height: '100%',
      },
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      height: '3.6rem',
      marginBottom: '1rem',
    },
  })
)

const NavIcons: React.FC = (): ReactElement => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(selectUser)
  const [roundNumber, totoRoundNumber] = useSelector(
    selectRoundAndTotoRoundNumber
  )

  const gotoLogin = (): void => {
    dispatch(userLogOut())
    history.push('/login')
  }

  return (
    <Grid container className={classes.iconSet} alignItems="center">
      <NavIcon
        label="program"
        goto={HISTORY.gotoProgram}
        icon={<Weekend className={classes.icon} />}
      />
      <NavIcon
        label="prediction"
        goto={() => HISTORY.gotoPredictionsUser(totoRoundNumber, roundNumber)}
        icon={<SportsSoccerIcon className={classes.icon} />}
      />
      <NavIcon
        label="round"
        goto={() => HISTORY.gotoRankingRound(roundNumber)}
        icon={<FormatListNumberedRtlIcon className={classes.icon} />}
      />
      <NavIcon
        label="toto round"
        goto={() => HISTORY.gotoRankingTotoRound(totoRoundNumber)}
        icon={<FormatListNumberedIcon className={classes.icon} />}
      />
      {user && user.totaalToto ? (
        <NavIcon
          label="total toto"
          goto={HISTORY.gotoRankingTotalToto}
          icon={<EmojiEvents className={classes.icon} />}
        />
      ) : null}
      <NavIcon
        label="my scores"
        goto={HISTORY.gotoScoresUser}
        icon={<BarChart className={classes.icon} />}
      />
      <NavIcon
        label="players"
        goto={HISTORY.gotoPlayers}
        icon={<Group className={classes.icon} />}
      />
      {user && user.admin ? (
        <NavIcon
          label="sign up"
          goto={HISTORY.gotoSignUp}
          icon={<PersonAdd className={classes.icon} />}
        />
      ) : null}
      <NavIcon
        label="profile"
        goto={HISTORY.gotoProfile}
        icon={<Face className={classes.icon} />}
      />
      <NavIcon
        label="rules"
        goto={HISTORY.gotoRules}
        icon={<HelpOutline className={classes.icon} />}
      />
      <NavIcon
        label="sign out"
        goto={gotoLogin}
        icon={<ExitToAppIcon className={classes.icon} />}
      />
    </Grid>
  )
}

export default NavIcons
