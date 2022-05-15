import 'chartjs-plugin-datalabels'

import { Box, Grid } from '@material-ui/core'
import * as chartjs from 'chart.js'
import React, { ReactElement } from 'react'
import { ChartData, HorizontalBar } from 'react-chartjs-2'

interface IProps {
  chartData: ChartData<chartjs.ChartData>
  chartOptions: chartjs.ChartOptions
  goto: (id: number) => void
}

const HorizontalBarChart: React.FC<IProps> = ({
  chartData,
  chartOptions,
  goto,
}: IProps): ReactElement => (
  <Box>
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={8} md={6} container justify="center">
        <HorizontalBar
          data={chartData}
          options={chartOptions}
          onElementsClick={(e) => {
            if (e[0] !== undefined) goto(e[0]._index)
          }}
          width={600}
          height={1200}
        />
      </Grid>
    </Grid>
  </Box>
)

export default HorizontalBarChart
