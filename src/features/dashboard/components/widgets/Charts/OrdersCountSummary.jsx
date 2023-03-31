import {useEffect, useState} from 'react'
import {getCSSVariableValue} from '@/components/assets/_utils'
import {arrayObjectsToArray} from '@/utils/arrayToSelectOptions'
import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import CustomCard from '@/components/elements/Card/CustomCard'
import Chart from 'react-apexcharts'

const OrdersCountSummary = () => {
  const {ordersCountSummary} = useDashboard()
  const [categories, setCategories] = useState([])
  const [data, setData] = useState([])
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const labelColor = getCSSVariableValue('--kt-gray-700')
  const baseColor = getCSSVariableValue('--kt-warning')
  const lightColor = getCSSVariableValue('--kt-warning-light')

  useEffect(() => {
    if (ordersCountSummary) {
      setCategories(arrayObjectsToArray(ordersCountSummary, 'period'))
      setData(arrayObjectsToArray(ordersCountSummary, 'total'))
    }
  }, [ordersCountSummary])

  const chart = {
    series: [
      {
        name: 'Total Order Count',
        data: data,
      },
    ],
    options: {
      chart: {
        id: 'order-count',
        fontFamily: 'inherit',
        toolbar: {
          show: false,
        },
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      labels: categories,
      stroke: {
        show: true,
        width: 3,
        colors: [baseColor],
      },
      fill: {
        type: 'solid',
      },
      colors: [lightColor],
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value
          },
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      xaxis: {
        labels: {
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
      header={<span className='card-label fw-bold text-dark'>Total Order Count Summary</span>}
    >
      <Chart options={chart.options} series={chart.series} type='area' height={350} />
    </CustomCard>
  )
}

export default OrdersCountSummary
