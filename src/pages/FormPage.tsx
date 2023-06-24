import React, { ChangeEvent } from 'react'
import './css/formpage.css'
import {
  Input,
  Form,
  Button,
  Col,
  Row,
  Select,
  DatePicker,
  Radio,
  DatePickerProps,
  Space,
  InputNumber
} from 'antd';

import { useTranslation } from 'react-i18next';
import Table from '../components/DataTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addData } from '../redux/dataSlice';

const FormPage = () => {

  const { t } = useTranslation()
  const { Option } = Select;
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const prefixArray = [
    { label: t('form.mr'), value: 'mr' },
    { label: t('form.ms'), value: 'ms' },
    { label: t('form.mrs'), value: 'mrs' },
  ]

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

  const customFormat1 = 'MM/DD/YYYY';

  const customFormat: DatePickerProps['format'] = (value) =>
    `${value.format(customFormat1)}`;

  const handleBack = () => {
    navigate('/')
  }

  const handleClear = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    const { id_number: { id_part1, id_part2, id_part3, id_part4, id_part5 }, ...rest1 } = values;
    const id_number = `${id_part1}${id_part2}${id_part3}${id_part4}${id_part5}`;

    let { tel_number: { tel_part1, tel_part2 }, ...rest2 } = values;
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

    dispatch(addData({...values, id_number, tel_number}));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='form_container'>
        <Row>
          <Col span={22} className='form_big_box'>
            <div className='form_box'>
              <Form
                name="basic"
                style={{ maxWidth: 1600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Row gutter={20} style={{ paddingBottom: '5px' }}>
                  <Col span={6}>
                    <Form.Item
                      label={t('form.prefix')}
                      name="prefix"
                      rules={[{ required: true, message: t('form_alert.prefix') }]}
                    >
                      <Select placeholder={t('form.placeholder.prefix')}>
                        {prefixArray.map(item =>
                          <Option value={item.value}>{item.label}</Option>
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      label={t('form.name')}
                      name="name"
                      rules={[{ required: true, message: t('form_alert.name') , pattern: /^[A-Za-z]+$/ }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      label={t('form.surname')}
                      name="surname"
                      rules={[{ required: true, message: t('form_alert.surname'), pattern: /^[A-Za-z]+$/ }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={20} style={{ paddingBottom: '5px' }}>
                  <Col span={7}>
                    <Form.Item
                      label={t('form.birthday')}
                      name="birthday"
                      rules={[{ required: true, message: t('form_alert.birthdate')}]}
                    >
                      <DatePicker
                        // onChange={onChange}
                        placeholder={t('form.placeholder.birthday')}
                        style={{ width: '100%' }}
                        format={customFormat}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label={t('form.nationality')}
                      name="nationality"
                      rules={[{ required: true, message: t('form_alert.nationality') }]}
                    >
                      <Select placeholder={t('form.placeholder.nation')}>
                        {nationArray.map(item =>
                          <Option value={item.value}>{item.label}</Option>
                        )}
                      </Select>

                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10} style={{ paddingBottom: '5px' }}>
                  <Col span={23}>
                    <Form.Item
                      label={t('form.id_number')}
                    >
                        <Form.Item
                          name={['id_number', 'id_part1']}
                          noStyle
                          dependencies={['id_number']}
                          
                        >
                          <InputNumber maxLength={2} style={{ width: '10%' }} controls={false} />
                        </Form.Item>
                        <span style={{ paddingLeft: '5px', paddingRight: '5px' }}> - </span>
                        <Form.Item
                          name={['id_number', 'id_part2']}
                          noStyle
                          dependencies={['id_number']}
                        >
                          <InputNumber maxLength={3} style={{ width: '20%' }} controls={false} />
                        </Form.Item>
                        <span style={{ paddingLeft: '5px', paddingRight: '5px' }}> - </span>
                        <Form.Item
                          name={['id_number', 'id_part3']}
                          noStyle
                          dependencies={['id_number']}
                        >
                          <InputNumber maxLength={3} style={{ width: '20%' }} controls={false} />
                        </Form.Item>
                        <span style={{ paddingLeft: '5px', paddingRight: '5px' }}> - </span>
                        <Form.Item
                          name={['id_number', 'id_part4']}
                          noStyle
                          dependencies={['id_number']}
                        >
                          <InputNumber maxLength={3} style={{ width: '10%' }} controls={false} />
                        </Form.Item>
                        <span style={{ paddingLeft: '5px', paddingRight: '5px' }}> - </span>
                        <Form.Item
                          name={['id_number', 'id_part5']}
                          noStyle
                          dependencies={['id_number']}
                        >
                          <InputNumber maxLength={2} style={{ width: '10%' }}  controls={false}/>
                        </Form.Item>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10} style={{ paddingBottom: '5px' }}>
                  <Col span={24}>
                    <Form.Item
                      label={t('form.gender')}
                      name="gender"
                      rules={[{ required: true, message: t('form_alert.gender') }]}
                    >
                      <Radio.Group
                      >
                        {genderArray.map(item =>
                          <Radio value={item.value}>{item.label}</Radio>
                        )}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10} style={{ paddingBottom: '5px' }}>
                  <Col span={16}>
                    <Form.Item
                      label={t('form.tel_number')}
                      rules={[
                        { required: true, message: 'Please enter a tel number' },
                      ]}
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
                  </Col>
                </Row>

                <Row gutter={10} style={{ paddingBottom: '5px' }}>
                  <Col span={12}>
                    <Form.Item
                      label={t('form.travel_id')}
                      name="travel_id"
                    >
                      <InputNumber style={{width:'100%'}} controls={false} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10} >
                  <Col span={12}>
                    <Form.Item
                      label={t('form.expected_salary')}
                      name="expected_salary"
                      rules={[{ required: true, message: t('form_alert.salary') }]}
                    >
                      <InputNumber style={{ width: '100%'}}  controls={false}/>
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form.Item>
                      <Button style={{ maxWidth: '100px' }} onClick={handleClear}>
                        {t('form.clear_form')}
                      </Button>
                    </Form.Item>

                  </Col>
                  <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form.Item>
                      <Button htmlType="submit" style={{ maxWidth: '100px' }} >
                        {t('form.submit_form')}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

            </div>
          </Col>
          <Col span={2}>
            <Button onClick={handleBack}>{t('back_button')}</Button>
          </Col>
        </Row>
      </div>
      <Table/>
    </>
  )
}

export default FormPage