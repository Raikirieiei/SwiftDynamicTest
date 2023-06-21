import React from 'react'
import './css/header.css'
import i18next from '../i18n/config'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { AiFillCaretDown } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { Col, Divider, Row } from 'antd';

const Header = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation();



  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
    handleOpenDropdown()
  }

  const handleOpenDropdown = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className='main_header'>
      <Row>
        <Col span={22}>
          <div className='header_text'>{location.pathname == "/" ? t('main_title') : location.pathname == "/shape" ? t('shape_title') : t('form_title')}</div>
        </Col>
        <Col span={2} style={{ display: 'flex',alignItems: 'center', height: '40px'}}>
          <div className="dropdown">
            <button className='dropdown_box' onClick={handleOpenDropdown}>{t('change_lang')} <AiFillCaretDown /> </button>
            {isOpen && (
              <ul className="dropdown_menu">
                <li className="menu-item">
                  <button onClick={() => changeLanguage('th')}>{t('change_lang_th')}</button>
                </li>
                <li className="menu-item">
                  <button onClick={() => changeLanguage('en')}>{t('change_lang_en')}</button>
                </li>
              </ul>
            )}
          </div>
        </Col>

      </Row>
    </div>
  )
}

export default Header