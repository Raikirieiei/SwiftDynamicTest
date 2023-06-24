import React from 'react'
import { Table, Row, Col, Button, Checkbox, TableProps, Form, Input, InputNumber, Typography, Popconfirm, TableColumnType } from 'antd';
import { useTranslation } from 'react-i18next';
import './css/table.css'
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useState, useEffect } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { SorterResult } from 'antd/es/table/interface';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteData, deleteOneData, updateData } from '../redux/dataSlice';
import { RootState } from '../redux/store';


interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  tel_number: number;
  nationality: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DataType;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DataTable: React.FC = () => {

  const { t } = useTranslation()
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);

  const [editingKey, setEditingKey] = useState('');

  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: any }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        dispatch(updateData({ ...row })); // Dispatch updateData with updated fields
        setEditingKey('');
      } else {
        dispatch(updateData({ ...row }));
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    {
      title: t('table.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true
    },
    {
      title: t('table.gender'),
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
      sortOrder: sortedInfo.columnKey === 'gender' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true
    },
    {
      title: t('table.tel'),
      dataIndex: 'tel_number',
      key: 'tel_number',
      sorter: (a: any, b: any) => a.tel_number - b.tel_number,
      sortOrder: sortedInfo.columnKey === 'tel_number' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true
    },
    {
      title: t('table.nationality'),
      dataIndex: 'nationality',
      key: 'nationality',
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
      sortOrder: sortedInfo.columnKey === 'nationality' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true
    },
    {
      title: t('table.edit'),
      dataIndex: 'edit',
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <a style={{ paddingRight: '10px' }}>{t('table.edit_info')}</a>
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteColumn(record.key)}>
              <a>{t('table.delete')}</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


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
    dispatch(deleteData(keys));
  };

  const handleDeleteColumn = (key: React.Key) => {
    dispatch(deleteOneData(key));
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
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowSelection={rowSelection}
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          pageSize: 3,
          onChange: cancel,
        }}
        onChange={handleChange}
      />
    </div>
  )
}

export default DataTable