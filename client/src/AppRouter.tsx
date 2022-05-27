import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import * as ROUTES from './constants/routes'
import Chat from './Pages/Chat'
import ForgotPassword from './Pages/ForgotPassword'
import Login from './Pages/Login'
import PageNotFound from './Pages/PageNotFound'
import ListOfPlayers from './Pages/Players/ListOfPlayers'
import PredictionsPlayer from './Pages/Players/PredictionsPlayer'
import ScoresPlayer from './Pages/Players/ScoresPlayer'
import EditPassword from './Pages/Profile/EditPassword'
import EditProfile from './Pages/Profile/EditProfile'
import Program from './Pages/Program'
import Rules from './Pages/Rules'
import Fixture from './Pages/Scores/Fixture'
import Round from './Pages/Scores/Round'
import TotalToto from './Pages/Scores/TotalToto'
import TotoRound from './Pages/Scores/TotoRound'
import SignUp from './Pages/SignUp'
import Predictions from './Pages/User/PredictionsUser'
import ScoresUser from './Pages/User/ScoresUser'

const AppRouter = (): JSX.Element => (
  <Switch>
    <Redirect exact path={ROUTES.HOME} to={ROUTES.LOGIN} />
    <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
    <Route exact path={ROUTES.ROUND} component={Round} />
    <Route exact path={ROUTES.TOTAL_TOTO} component={TotalToto} />
    <Route exact path={ROUTES.TOTO_ROUND} component={TotoRound} />
    <Route exact path={ROUTES.LOGIN} component={Login} />
    <Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
    <Route exact path={ROUTES.CHAT} component={Chat} />
    <Route exact path={ROUTES.PAGE_NOT_FOUND} component={PageNotFound} />
    <Route exact path={ROUTES.EDIT_PROFILE} component={EditProfile} />
    <Route exact path={ROUTES.EDIT_PASSWORD} component={EditPassword} />
    <Route exact path={ROUTES.PROGRAM} component={Program} />
    <Route exact path={ROUTES.RULES} component={Rules} />
    <Route exact path={ROUTES.SCORES_USER} component={ScoresUser} />
    <Route exact path={ROUTES.LIST_OF_PLAYERS} component={ListOfPlayers} />
    <Route exact path={ROUTES.SCORES_PLAYERS} component={ScoresPlayer} />
    <Route
      exact
      path={ROUTES.PREDICTIONS_PLAYERS}
      component={PredictionsPlayer}
    />
    <Route exact path={ROUTES.PREDICTIONS} component={Predictions} />
    <Route exact path={ROUTES.FIXTURES} component={Fixture} />
    <Redirect path="/" to={ROUTES.PAGE_NOT_FOUND} />
  </Switch>
)

export default AppRouter
