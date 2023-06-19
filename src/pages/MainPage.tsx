import React from 'react'
import './css/mainpage.css'
import Card from '../components/Card'
import '../i18n/config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const MainPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateTo = (path: string) => {
    navigate(path)
  }

  return (
    <div>

        <div className='main_container'>
          <div onClick={() => navigateTo('/shape')}>
            <Card title={t('sub_title.sub1')}/>
          </div>
          <div onClick={() => navigateTo('/form')}>
            <Card title={t('sub_title.sub2')} />
          </div>    
        </div>
    </div>
   

  )
}

export default MainPage