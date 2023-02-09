/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo, useState, useEffect} from 'react'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {OrderDetails} from './Cards/OrderDetails'
import {OrderCustomer} from './Cards/OrderCustomer'
import {OrderProcess} from './Cards/OrderProcess'
import {OrderDocuments} from './Cards/OrderDocuments'
import {OrderAddress} from './Cards/OrderAddress'
import {OrderTable} from './Cards/OrderTable'
import {OrderHistory} from './Cards/OrderHistory'
import Modal from '@/components/elements/Modal/Modal'
import {ProcessOrderModalHeader} from './Modal/ProcessOrderModalHeader'
import {ProcessOrderModalForm} from './Modal/ProcessOrderModalContent'

const OrderInfo = ({order}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState(order)

  useEffect(() => {
    setData(order)
  }, [order])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className='d-flex flex-column gap-7 gap-lg-10'>
        <div className='gap-0'>
          <OrderProcess histories={data.histories} latest_order_stage={data.latest_order_stage} />
          <div className='d-flex flex-wrap flex-stack gap-5 gap-lg-10'>
            <ul
              className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-lg-n2 me-auto'
              role='tablist'
            >
              <li className='nav-item' role='presentation'>
                <a
                  className='nav-link text-active-primary pb-4 active'
                  data-bs-toggle='tab'
                  href='#order_summary'
                  aria-selected='true'
                  role='tab'
                >
                  Order Summary
                </a>
              </li>
              <li className='nav-item' role='presentation'>
                <a
                  className='nav-link text-active-primary pb-4'
                  data-bs-toggle='tab'
                  href='#order_history'
                  aria-selected='false'
                  role='tab'
                  tabIndex={-1}
                >
                  Order History
                </a>
              </li>
            </ul>
            {order.latest_order_stage < 4 && (
              <a onClick={toggleModal} className='btn btn-primary btn-sm'>
                Process Order
              </a>
            )}
          </div>
        </div>
        <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
          <OrderDetails order={data} />
          <OrderCustomer customer={data.customer} />
          <OrderDocuments order={data} />
        </div>
        <div className='tab-content'>
          <div className='tab-pane fade active show' id='order_summary' role='tab-panel'>
            <div className='d-flex flex-column gap-7 gap-lg-10'>
              <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                {data.customer.address.map((address) => {
                  return <OrderAddress address={address} key={address.address_type} />
                })}
              </div>
              <OrderTable order={data} />
            </div>
          </div>
          <div className='tab-pane fade' id='order_history' role='tab-panel'>
            <div className='d-flex flex-column gap-7 gap-lg-10'>
              <OrderHistory histories={order.histories} />
              {/* <div className='card card-flush py-4 flex-row-fluid'>
              <div className='card-header'>
                <div className='card-title'>
                  <h2>Order Data</h2>
                </div>
              </div>
              <div className='card-body pt-0'>
                <div className='table-responsive'>
                  <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5'>
                    <tbody className='fw-semibold text-gray-600'>
                      <tr>
                        <td className='text-muted'>IP Address</td>
                        <td className='fw-bold text-end'>172.68.221.26</td>
                      </tr>
                      <tr>
                        <td className='text-muted'>Forwarded IP</td>
                        <td className='fw-bold text-end'>89.201.163.49</td>
                      </tr>
                      <tr>
                        <td className='text-muted'>User Agent</td>
                        <td className='fw-bold text-end'>
                          Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like
                          Gecko) Chrome/96.0.4664.110 Safari/537.36
                        </td>
                      </tr>
                      <tr>
                        <td className='text-muted'>Accept Language</td>
                        <td className='fw-bold text-end'>en-GB,en-US;q=0.9,en;q=0.8</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} closeOnOutsideClick={true}>
          <ProcessOrderModalHeader handleClick={toggleModal} />
          <ProcessOrderModalForm order={data} handleClick={toggleModal} />
        </Modal>
      )}
    </>
  )
}

export {OrderInfo}
