import {useEffect, useState} from 'react'
import {getCSSVariableValue} from '@/components/assets/_utils'
import {arrayObjectsToArray} from '@/utils/arrayToSelectOptions'
import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import CustomCard from '@/components/elements/Card/CustomCard'
import Chart from 'react-apexcharts'

const OrderSalesSummary = () => {
  const {orderSalesSummary} = useDashboard()
  const [categories, setCategories] = useState([])
  const [totalAmount, setTotalAmount] = useState([])
  const [totalDiscount, setTotalDiscount] = useState([])

  const borderColor = getCSSVariableValue('--kt-gray-200')
  const labelColor = getCSSVariableValue('--kt-gray-700')

  const baseColor = getCSSVariableValue('--kt-warning')
  const lightColor = getCSSVariableValue('--kt-warning-light')
  const secondaryColor = getCSSVariableValue('--kt-primary')
  const secondaryLightColor = getCSSVariableValue('--kt-primary-light')

  useEffect(() => {
    if (orderSalesSummary) {
      setCategories(arrayObjectsToArray(orderSalesSummary.totalAmount, 'period'))
      setTotalAmount(arrayObjectsToArray(orderSalesSummary.totalAmount, 'total'))
      setTotalDiscount(arrayObjectsToArray(orderSalesSummary.totalDiscount, 'total'))
    }
  }, [orderSalesSummary])

  const chart = {
    series: [
      {
        name: 'Total Amount',
        type: 'area',
        data: totalAmount,
      },
      {
        name: 'Total Discount',
        type: 'column',
        data: totalDiscount,
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
        colors: [baseColor, secondaryColor],
      },
      fill: {
        type: 'solid',
      },
      colors: [lightColor, secondaryLightColor],
      legend: {
        labels: {
          colors: labelColor,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'bottom',
          },
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return '₱' + value
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
      header={<span className='card-label fw-bold text-dark'>Total Sales Summary</span>}
    >
      <Chart options={chart.options} series={chart.series} type='area' height={350} />
    </CustomCard>
  )
}

export default OrderSalesSummary
