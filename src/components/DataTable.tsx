import React from 'react'
import { Table, Row, Col, Button, Checkbox, TableProps, Form, Input, InputNumber, Typography, Popconfirm, TableColumnType, Radio, Select } from 'antd';
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
import { log } from 'console';


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
  inputType: any;
  record: DataType;
  index: number;
  children: React.ReactNode;
}



const DataTable: React.FC = () => {

  const { t } = useTranslation()
  const [form] = Form.useForm();
  const { Option } = Select;

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);

  const [editingKey, setEditingKey] = useState('');

  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const isEditing = (record: DataType) => record.key === editingKey;

  const genderArray = [
    { label: t('form.male'), value: 'male' },
    { label: t('form.female'), value: 'female' },
    { label: t('form.other'), value: 'other' },
  ]

  const nationArray = [
    { label: t('form.nation.th'), value: 'th' },
    { label: t('form.nation.en'), value: 'en' },
    { label: t('form.nation.cn'), value: 'cn' },
  ]

  const telArray = [
    { label: "+66", value: 'tel_th' },
    { label: "+1", value: 'tel_en' },
    { label: "+86", value: 'tel_cn' },
  ]

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
      
    return (
      <td {...restProps}>
        {editing && inputType === 'text' ? (
          <Form.Item
            name="name"
            rules={[{ required: true, message: t('form_alert.name'), pattern: /^[A-Za-z]+$/ }]}
            style={{ marginBottom: '0px' }}
          >
            <Input />
          </Form.Item>
        ) : editing && inputType === 'radio' ? (
          <Form.Item
            name="gender"
            style={{ marginBottom: '0px' }}
          >
            <Radio.Group
            >
              {genderArray.map(item =>
                <Radio value={item.value}>{item.label}</Radio>
              )}
            </Radio.Group>
          </Form.Item>
        ) : editing && inputType === 'nested_input' ? (
          <Form.Item
            style={{ marginBottom: '0px' }}
          >
            <Form.Item
              name={['tel_number', 'tel_part1']}
              noStyle
              rules={[{ required: true, message: t('form_alert.tel_prefix') }]}
              dependencies={['address']}
            >
              <Select style={{ width: '30%' }}>
                {telArray.map(item =>
                  <Option value={item.value}>{item.label}</Option>
                )}
              </Select>
            </Form.Item>

            <span style={{ paddingLeft: '5px', paddingRight: '5px' }}> - </span>
            <Form.Item
              name={['tel_number', 'tel_part2']}
              noStyle
              rules={[{ required: true, message: t('form_alert.tel_number') }]}
              dependencies={['address']}
            >
              <InputNumber style={{ width: '60%' }} controls={false} />
            </Form.Item>
          </Form.Item>
        ) : editing && inputType === 'select' ? (
          <Form.Item
            name="nationality"
            rules={[{ required: true, message: t('form_alert.nationality') }]}
            style={{ marginBottom: '0px' }}
          >
            <Select placeholder={t('form.placeholder.nation')}>
              {nationArray.map(item =>
                <Option value={item.value}>{item.label}</Option>
              )}
            </Select>

          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record: Partial<DataType> & { key: any }) => {
    form.setFieldsValue({ name: '', gender: '', tel_number: '', nationality: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType | any; 

      let { tel_number: { tel_part1, tel_part2 }, ...rest2 } = row;
      
      switch (tel_part1) {
        case "tel_th":
          tel_part1 = "+66"
          break;
        case "tel_en":
          tel_part1 = "+1"
          break;
        case "tel_cn":
          tel_part1 = "+86"
          break;
        default:
          tel_part1 = null
          break;
      }

      const tel_number = `${tel_part1}${tel_part2}`;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      const item = newData[index];

      newData.splice(index, 1, {
        ...item,
        ...row,
        tel_number
      });
      dispatch(updateData({ ...newData[index] }));
      setEditingKey('');

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    {
      title: t('table.name'),
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true,
    },
    {
      title: t('table.gender'),
      dataIndex: 'gender',
      key: 'gender',
      width: '20%',
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
      sortOrder: sortedInfo.columnKey === 'gender' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true,
      render: (value: string) => {
        const genderMap: { [key: string]: string } = {
          male: 'Male',
          female: 'Female',
          other: 'Not Specify',
        };
        return genderMap[value] || value;
      },
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
      width: '20%',
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
      sortOrder: sortedInfo.columnKey === 'nationality' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true,
      render: (value: string) => {
        const nationalityMap: { [key: string]: string } = {
          en: 'English',
          th: 'Thai',
          cn: 'China',
        };
        return nationalityMap[value] || value;
      },
    },
    {
      title: t('table.edit'),
      dataIndex: 'edit',
      width: '15%',
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
        inputType: col.dataIndex === 'name' ? 'text' : col.dataIndex === 'gender' ? 'radio' : col.dataIndex === 'tel_number' ? 'nested_input' : col.dataIndex === 'nationality' && 'select',
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
      <Form form={form} component={false}>
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
      </Form>
    </div>
  )
}

export default DataTable