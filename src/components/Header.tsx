import React from 'react'
import './header.css'
import i18next from '../i18n/config'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { AiFillCaretDown } from "react-icons/ai";
import { useLocation } from 'react-router-dom';

const Header = () => {
    const {t} = useTranslation()
    const [lang, setLang] = useState("th")
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
    <div className='header_text'>{location.pathname == "/" ? t('main_title') : location.pathname == "/shape" ? t('shape_title'): t('form_title')}</div>
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
  </div>
  )
}

export default Header