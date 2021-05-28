import React, { ReactElement } from 'react';

import ScoresStackedChart from '../../../Components/Chart/ScoresStackedChart';
import DividerComponent from '../../../Components/Divider';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { ScoresPlayer } from '../../../store/players/types';
import { colorPrimary, colorSecondary } from '../../../ui/theme/chartColors';

interface IProps {
  scoresPlayer: ScoresPlayer;
}

const ScoresSection: React.FC<IProps> = ({ scoresPlayer }: IProps): ReactElement => {
  return (
    <>
      <SubTitleComponent text="TOTO RONDES" />
      <DividerComponent />
      <ScoresStackedChart
        scoresPlayer={scoresPlayer}
        colorMain={colorSecondary}
        colorHover={colorPrimary}
        loggedInUser={false}
      />
    </>
  );
};

export default ScoresSection;
