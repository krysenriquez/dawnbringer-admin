import Chart from 'react-apexcharts'

const CustomChart = (props) => {
  const {id, categories, dataName, dataSeries, ...rest} = props

  const chart = {
    options: {
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        toolbar: {
          show: false,
        },
        id: id,
      },
      xaxis: {
        categories: categories,
      },
    },
    series: [
      {
        name: dataName,
        data: dataSeries,
      },
    ],
  }

  return <Chart options={chart.options} series={chart.series} {...rest} />
}

export default CustomChart
