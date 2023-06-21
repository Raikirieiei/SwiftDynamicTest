import React from 'react'
import { Table, Row, Col, Button, Checkbox, TableProps, Form, Input, InputNumber, Typography, Popconfirm, TableColumnType } from 'antd';
import { useTranslation } from 'react-i18next';
import './css/table.css'
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useState, useEffect } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { SorterResult } from 'antd/es/table/interface';


interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  tel_number: number;
  nationality: string;
}



const DataTable: React.FC = () => {

  const { t } = useTranslation()
  const [form] = Form.useForm();

  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [data, setData] = useState<DataType[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);


  useEffect(() => {
    let arr = []
    for (let i = 0; i < 46; i++) {
      arr.push({
        key: i,
        name: `Edward King ${i}`,
        gender: 'female',
        tel_number: i + (i + 1),
        nationality: 'eiei'
      });
    }
    setData(arr)
  }, [])

  
  const columns: ColumnsType<DataType> = [
    {
      title: t('table.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('table.gender'),
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortOrder: sortedInfo.columnKey === 'gender' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('table.tel'),
      dataIndex: 'tel_number',
      key: 'tel_number',
      sorter: (a, b) => a.tel_number - b.tel_number,
      sortOrder: sortedInfo.columnKey === 'tel_number' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('table.nationality'),
      dataIndex: 'nationality',
      key: 'nationality',
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      sortOrder: sortedInfo.columnKey === 'nationality' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('table.edit'),
      dataIndex: 'edit',
    },
  ];



  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      setSelectedRowKeys(data.map((item) => item.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleCustomDelete = () => {
    handleDelete(selectedRowKeys);
    setSelectAllChecked(false);
    setSelectedRowKeys([]);
  };


  const handleDelete = (keys: React.Key[]) => {
    const updatedData = data.filter((item) => !keys.includes(item.key));
    setData(updatedData);
  };


  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  return (
    <div className='table_container'>
      <Row gutter={10} style={{ paddingBottom: '20px' }}>
        <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            onChange={(e) => handleSelectAllChange(e)}
            checked={selectAllChecked}
          >
            {t('table.select_all')}
          </Checkbox>
        </Col>
        <Col span={4}>
          <Button onClick={handleCustomDelete}>
            {t('table.delete')}
          </Button>
        </Col>
      </Row>
      <Table
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 3,
        }}
        onChange={handleChange}
      />
    </div>
  )
}

export default DataTable