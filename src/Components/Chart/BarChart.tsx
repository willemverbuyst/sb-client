import 'chartjs-plugin-datalabels';

import { Grid } from '@material-ui/core';
import * as chartjs from 'chart.js';
import React, { ReactElement } from 'react';
import { Bar, ChartData } from 'react-chartjs-2';

interface IProps {
  chartData: ChartData<chartjs.ChartData>;
  chartOptions: chartjs.ChartOptions;
  goto: (id: number) => void;
}

const BarChart: React.FC<IProps> = ({ chartData, chartOptions, goto }: IProps): ReactElement => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} md={6} container justify="center">
        <Bar
          data={chartData}
          options={chartOptions}
          onElementsClick={(e) => {
            if (e[0] !== undefined) goto(e[0]._index);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default BarChart;
