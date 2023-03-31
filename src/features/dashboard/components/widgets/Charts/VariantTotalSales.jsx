import {useEffect, useState} from 'react'
import {getCSSVariableValue} from '@/components/assets/_utils'
import {arrayObjectsToArray} from '@/utils/arrayToSelectOptions'
import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import CustomCard from '@/components/elements/Card/CustomCard'
import Chart from 'react-apexcharts'

const VariantTotalSales = () => {
  const {variantTotalSales} = useDashboard()
  const [categories, setCategories] = useState([])
  const [data, setData] = useState([])
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const labelColor = getCSSVariableValue('--kt-gray-700')

  const baseColor = getCSSVariableValue('--kt-warning')
  const lightColor = getCSSVariableValue('--kt-warning-light')
  const secondaryColor = getCSSVariableValue('--kt-primary')
  const secondaryLightColor = getCSSVariableValue('--kt-primary-light')

  useEffect(() => {
    if (variantTotalSales) {
      setCategories(arrayObjectsToArray(variantTotalSales, 'name'))
      setData(arrayObjectsToArray(variantTotalSales, 'total'))
    }
  }, [variantTotalSales])

  const chart = {
    series: data,
    options: {
      labels: categories,
      chart: {
        id: 'variant-total-sales',
        fontFamily: 'inherit',
        toolbar: {
          show: false,
        },
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Sales',
                fontSize: '24px',
                fontWeight: 600,
                color: labelColor,
                formatter: function (w) {
                  let sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                  return '₱' + sum
                },
              },
              name: {
                show: true,
                fontSize: '20px',
                fontWeight: 600,
                color: labelColor,
              },
              value: {
                show: true,
                fontSize: '22px',
                color: labelColor,
                offsetY: 16,
                formatter: function (value) {
                  return '₱' + value
                },
              },
            },
          },
        },
      },
      legend: {
        labels: {
          colors: labelColor,
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return '₱' + value
          },
        },
      },
    },
  }

  return (
    <CustomCard
      cardClassName='card card-flush overflow-hidden h-md-100'
      hasHeader={true}
      header={<span className='card-label fw-bold text-dark'>Product Variant Total Sales</span>}
    >
      <Chart options={chart.options} series={chart.series} type='donut' height={350} />
    </CustomCard>
  )
}

export default VariantTotalSales
