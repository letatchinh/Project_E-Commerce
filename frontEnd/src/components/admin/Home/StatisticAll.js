import React, { useEffect, useState } from "react";
import { Card, Col, DatePicker, Row, Statistic, Table, Tabs, Typography } from "antd";
import moment from "moment";
import statics from "../../../apis/statics";
import { getNow } from "../../../constant/FunctionCommom";
import {   DollarOutlined, ProfileOutlined } from '@ant-design/icons';
import {get} from 'lodash'
import './index.css'
import SkeletonTable from "../../comon/SkeletonTable";
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD'; 
const columns = [
  {
    title:"Mã đơn hàng",
    dataIndex : 'billNumber',
    key: 'billNumber',
    align:'center',
    render : (item,record,index) => <Typography.Text strong>{item || ""}</Typography.Text>
  },
  {
    title:"Địa chỉ",
    dataIndex : 'shippingAddress',
    key: 'shippingAddress',
    align:'center',
    render : (item,record,index) => <Typography.Text strong>{get(item,'address','')}</Typography.Text>
  },
  {
    title:"Khách hàng",
    dataIndex : 'address',
    key: 'address',
    align:'center',
    render : (item,record,index) => 1
  },
  {
    title:"Phí ship",
    dataIndex : 'shippingPrice',
    key: 'shippingPrice',
    align:'center',
    render : (item,record,index) => item
  },
  {
    title:"Voucher",
    dataIndex : 'voucher',
    key: 'voucher',
    align:'center',
    render : (item,record,index) => item
  },
  {
    title:"Giá trị đơn hàng",
    dataIndex : 'priceBill',
    key: 'priceBill',
    align:'center',
    render : (item,record,index) => item
  },
  {
    title:"Thành tiền",
    dataIndex : 'totalPrice',
    key: 'totalPrice',
    align:'center',
    render : (item,record,index) => item
  },

]
export default function StatisticAll() {

  const [data,setData] = useState(null)
  const [date,setDate] = useState(getNow())
  const [loading,setLoading] = useState(false)
    const onhandleChangeDate = async(date,[startDate,endDate]) => {
      setDate({startDate,endDate})
    }
    const onhandleChangeDateMonth = async(dates,dateString) => {
      const startDate = moment(dateString).startOf('M').format("YYYY-MM-DD")
      const endDate = moment(dateString).endOf('M').format("YYYY-MM-DD")
      setDate({startDate,endDate})
    }
    const onhandleChangeDateYear = async(dates,dateString) => {
      const startDate = moment(dateString).startOf('y').format("YYYY-MM-DD")
      const endDate = moment(dateString).endOf('y').format("YYYY-MM-DD")
      setDate({startDate,endDate})
    }
    useEffect(() => {
      
      setLoading(true)
      const fetch = async() => {
        if(!date.startDate || !date.endDate) {
          setDate(getNow())
          const res = await statics.getAll({...getNow()})
          setData(res)
        }
        else{
          const res = await statics.getAll({...date})
          setData(res)
        }
        setLoading(false)
      }
      fetch()
    },[date])
    const onChange = (key) => {
      console.log(key);
    };
    const items = [
      {
        key: '1',
        label: `Theo ngày`,
        children:<RangePicker
        onChange={onhandleChangeDate}
        format={dateFormat}
      />,
      },
      {
        key: '2',
        label: `Theo tháng`,
        children: <DatePicker onChange={onhandleChangeDateMonth} picker="month" />,
      },
      {
        key: '3',
        label: `Theo Năm`,
        children: <DatePicker onChange={onhandleChangeDateYear} picker="year" />,
      },
    ]
  return (
    <div style={{ padding: "20px" , background : 'white' }}>
      <Row>
      <Col span={8}>
      <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} onChange={onChange}/>
      </Col>
      <Col span={16}>
      <Row style={{padding : '20px',borderRadius : '10px',boxShadow : '0 0 5px 1px #999'}}>
    <Col span={12}>
    <Card bordered={false}>
        <Statistic
          title="Tổng số đơn"
          value={get(data,'sumOrders.count',0)}
          // valueStyle={{ color: '#3f81200' }}
          prefix={<ProfileOutlined />}
        />
      </Card>
    </Col>
     <Col span={12}>
     <Card bordered={false}>
        <Statistic
          title="Doanh thu"
          value={get(data,'sumOrders.totalAmount',0)}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<DollarOutlined/>}
          suffix="VNĐ"
        />
      </Card>
     </Col>
</Row>  
      </Col>
      </Row>
      {
        loading ? <SkeletonTable rowCount={5} columns={columns}/>: <Table  style={{margin : '10px 0'}} pagination={false} key={(row) => row._id} columns={columns} dataSource={get(data,'orders',[])}/>
      }
    </div>
  );
}
