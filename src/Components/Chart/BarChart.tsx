import 'chartjs-plugin-datalabels'

import { Box, Grid } from '@material-ui/core'
import * as chartjs from 'chart.js'
import React, { ReactElement } from 'react'
import { Bar, ChartData } from 'react-chartjs-2'

interface IProps {
  chartData: ChartData<chartjs.ChartData>
  chartOptions: chartjs.ChartOptions
  goto: (id: number) => void
}

const BarChart: React.FC<IProps> = ({
  chartData,
  chartOptions,
  goto,
}: IProps): ReactElement => (
  <Box mt="4rem">
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={8} md={6} container justify="center">
        <Bar
          data={chartData}
          options={chartOptions}
          onElementsClick={(e) => {
            if (e[0] !== undefined) goto(e[0]._index)
          }}
        />
      </Grid>
    </Grid>
  </Box>
)

export default BarChart
