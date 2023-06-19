import React from 'react'
import './css/shapepage.css'
import Card from '../components/Card'
const ShapePage = () => {
  return (
    <div>
      <div className='shape_container'>
        <div>
          Layout & Style
        </div>
        <div>
          change lang
        </div>
      </div>

      <div className='shape_function'>

        <div>
          <Card shape="square"/>
        </div>

        <div>
          <Card shape="square"/>
        </div>

        <div>
          <Card shape="square"/>
        </div>
        
      </div>

      <div className='shape_button'>
        <div>
          <Card shape="square"/>
        </div>

        <div>
          <Card shape="square"/>
        </div>

        <div>
          <Card shape="square"/>
        </div>

        <div>
          <Card shape="square"/>
        </div>

        <div>
          <Card shape="square"/>
        </div>

        <div>
          <Card shape="square"/>
        </div>
      </div>
    </div>
  )
}

export default ShapePage