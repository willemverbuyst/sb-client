import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import * as ROUTES from './constants/routes';
import SignUp from './Pages/Admin/SignUp';
import LogIn from './Pages/LogIn';
import PageNotFound from './Pages/PageNotFound';
import ListOfPlayers from './Pages/Players/ListOfPlayers';
import PredictionsPlayer from './Pages/Players/PredictionsPlayer';
import ScoresPlayer from './Pages/Players/ScoresPlayer';
import Predictions from './Pages/Predictions';
import Profile from './Pages/Profile';
import Program from './Pages/Program';
import Rules from './Pages/Rules';
import Fixture from './Pages/Scores/Fixture';
import Round from './Pages/Scores/Round';
import ScoresUser from './Pages/Scores/ScoresUser';
import TotalToto from './Pages/Scores/TotalToto';
import TotoRound from './Pages/Scores/TotoRound';

const AppRouter = (): JSX.Element => {
  return (
    <Switch>
      <Redirect exact path={ROUTES.HOME} to={ROUTES.LOGIN} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
      <Route exact path={ROUTES.ROUND} component={Round} />
      <Route exact path={ROUTES.TOTAL_TOTO} component={TotalToto} />
      <Route exact path={ROUTES.TOTO_ROUND} component={TotoRound} />
      <Route exact path={ROUTES.LOGIN} component={LogIn} />
      <Route exact path={ROUTES.PAGE_NOT_FOUND} component={PageNotFound} />
      <Route exact path={ROUTES.PROFILE} component={Profile} />
      <Route exact path={ROUTES.PROGRAM} component={Program} />
      <Route exact path={ROUTES.RULES} component={Rules} />
      <Route exact path={ROUTES.SCORES_USER} component={ScoresUser} />
      <Route exact path={ROUTES.LIST_OF_PLAYERS} component={ListOfPlayers} />
      <Route exact path={ROUTES.SCORES_PLAYERS} component={ScoresPlayer} />
      <Route exact path={ROUTES.PREDICTIONS_PLAYERS} component={PredictionsPlayer} />
      <Route exact path={ROUTES.PREDICTIONS} component={Predictions} />
      <Route exact path={ROUTES.FIXTURES} component={Fixture} />
      <Redirect path="/" to={ROUTES.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default AppRouter;