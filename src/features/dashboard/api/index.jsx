import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX
const DASHBOARD_URL = `${API_URL}/dashboard/${API_SUFFIX}`

const GET_ORDERS_COUNT_SUMMARY_URL = `${DASHBOARD_URL}/orderscountsummary/`
const GET_ORDERS_SALES_SUMMARY_URL = `${DASHBOARD_URL}/orderssalessummary/`
const GET_TOTAL_SALES_SUMMARY_URL = `${DASHBOARD_URL}/totalsalessummary/`

// period
const GET_CUSTOMERS_COUNT_URL = `${DASHBOARD_URL}/customerscount/`
const GET_MEMBERS_COUNT_URL = `${DASHBOARD_URL}/memberscount/`
// branch and period
const GET_ORDERS_COUNT_URL = `${DASHBOARD_URL}/orderscount/`
const GET_TOTAL_SALES_URL = `${DASHBOARD_URL}/totalsales/`

const GET_VARIANTS_QUANTITY_SOLD_URL = `${DASHBOARD_URL}/productvariantquantitysold/`
const GET_VARIANTS_TOTAL_SALES_URL = `${DASHBOARD_URL}/productvarianttotalsales/`

const GET_PENDING_ORDERS_URL = `${DASHBOARD_URL}/getpendingorders/`
const GET_VARIANTS_STOCKS_URL = `${DASHBOARD_URL}/productvariantstocks/`

export const getOrdersCountSummary = (values) => {
  return axios
    .post(`${GET_ORDERS_COUNT_SUMMARY_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getOrdersSalesSummary = (values) => {
  return axios
    .post(`${GET_ORDERS_SALES_SUMMARY_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getTotalSalesSummary = (values) => {
  return axios
    .post(`${GET_TOTAL_SALES_SUMMARY_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getCustomersCount = (values) => {
  return axios
    .post(`${GET_CUSTOMERS_COUNT_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getMembersCount = (values) => {
  return axios
    .post(`${GET_MEMBERS_COUNT_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}
export const getOrdersCount = (values) => {
  return axios
    .post(`${GET_ORDERS_COUNT_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getTotalSales = (values) => {
  return axios
    .post(`${GET_TOTAL_SALES_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getVariantsQuantitySold = (values) => {
  return axios
    .post(`${GET_VARIANTS_QUANTITY_SOLD_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getVariantTotalSales = (values) => {
  return axios
    .post(`${GET_VARIANTS_TOTAL_SALES_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getPendingOrdersList = (branchId) => {
  return axios
    .get(
      `${GET_PENDING_ORDERS_URL}`,
      humps.decamelizeKeys({
        params: {
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data))
}

export const getVariantStocksList = (branchId) => {
  return axios
    .get(
      `${GET_VARIANTS_STOCKS_URL}`,
      humps.decamelizeKeys({
        params: {
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data))
}
