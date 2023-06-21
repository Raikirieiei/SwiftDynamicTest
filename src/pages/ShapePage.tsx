import React from 'react'
import './css/shapepage.css'
import Card from '../components/Card'
import { Col, Divider, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ShapePage = () => {
  const [rowJustify, setRowJustify] = useState(true)
  const { t } = useTranslation()

  const shape_position = [
    'square',
    'circle',
    'oval',
    'trapezoid',
    'rectangle',
    'parallelogram'
  ]
  const [shiftedShapePosition, setShiftedShapePosition] = useState(shape_position);

  const handleMovePosition = () => {
    setRowJustify(prev => !prev)
  }
  
  const handleMoveLeft = () => {
    const firstElement = shiftedShapePosition.shift();
    if (firstElement !== undefined) {
      setShiftedShapePosition([...shiftedShapePosition, firstElement]);
    }
  }
  
  const handleMoveRight = () => {
    const lastElement = shiftedShapePosition.pop();
    if (lastElement !== undefined) {
      setShiftedShapePosition([lastElement, ...shiftedShapePosition]);
    }
  };

  const handleRandomShape = () => {
    const newArray = [...shiftedShapePosition];
  
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
  
    setShiftedShapePosition(newArray)
  }

  return (
    <div className='shape_container'>

      <Row justify="center" gutter={24} style={{ paddingBottom: '20px' }}>

        <Col span={6}>
          <Card shape='triangle_left' label={t('move_label.shape')} onClick={handleMoveLeft}/>
        </Col>

        <Col span={12}>
          <Card shape={['triangle_up', 'triangle_down']} label={t('move_label.position')} onClick={handleMovePosition} />
        </Col>

        <Col span={6}>
          <Card shape='triangle_right' label={t('move_label.shape')} onClick={handleMoveRight}/>
        </Col>

      </Row>

      <Divider></Divider>

      <Row justify={rowJustify? 'end' : 'center'} gutter={24} style={{ paddingBottom: '20px' }}>

        <Col span={6}>
          <Card shape={shiftedShapePosition[0]} onClick={handleRandomShape}/>
        </Col>

        <Col span={6}>
          <Card shape={shiftedShapePosition[1]} onClick={handleRandomShape}/>
        </Col>

        <Col span={6}>
          <Card shape={shiftedShapePosition[2]} onClick={handleRandomShape}/>
        </Col>
      </Row>

      <Row justify={rowJustify? 'center' : 'end'} gutter={24}>

        <Col span={6}>
          <Card shape={shiftedShapePosition[3]} onClick={handleRandomShape}/>
        </Col>

        <Col span={6}>
          <Card shape={shiftedShapePosition[4]} onClick={handleRandomShape}/>
        </Col>

        <Col span={6}>
          <Card shape={shiftedShapePosition[5]} onClick={handleRandomShape}/>
        </Col>

      </Row>
    </div>
  )
}

export default ShapePage