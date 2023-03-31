import {useEffect, useState} from 'react'
import {getCSSVariableValue} from '@/components/assets/_utils'
import {arrayObjectsToHorizontalBarGraph} from '@/utils/arrayObjectsToGraph'
import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import CustomCard from '@/components/elements/Card/CustomCard'
import Chart from 'react-apexcharts'

const VariantQuantitySold = () => {
  const {variantsQuantitySold} = useDashboard()
  const [data, setData] = useState([])

  const borderColor = getCSSVariableValue('--kt-gray-200')
  const labelColor = getCSSVariableValue('--kt-gray-700')

  const baseColor = getCSSVariableValue('--kt-success')
  const lightColor = getCSSVariableValue('--kt-success-light')

  useEffect(() => {
    if (variantsQuantitySold) {
      setData(arrayObjectsToHorizontalBarGraph(variantsQuantitySold, 'name', 'total'))
    }
  }, [variantsQuantitySold])

  const chart = {
    series: [
      {
        name: 'Quantity Sold',
        data: data,
      },
    ],
    options: {
      chart: {
        id: 'variant-quantity-sold',
        fontFamily: 'inherit',
        toolbar: {
          show: false,
        },
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        show: true,
        width: 3,
        colors: [baseColor],
      },
      fill: {
        type: 'solid',
      },
      colors: [lightColor],
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '25%',
        },
      },
      dataLabels: {
        enabled: true,
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + ' pc/s'
          },
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: baseColor,
            width: 1,
            dashArray: 3,
          },
        },
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
  }

  return (
    <CustomCard
      cardClassName='card card-flush overflow-hidden h-md-100'
      hasHeader={true}
      header={<span className='card-label fw-bold text-dark'>Product Variant Quantity Sold</span>}
    >
      <Chart options={chart.options} series={chart.series} type='bar' height={350} />
    </CustomCard>
  )
}

export default VariantQuantitySold
