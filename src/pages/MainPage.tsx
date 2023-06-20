import React from 'react'
import './css/mainpage.css'
import Card from '../components/Card'
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
          <div style={{width: '300px'}}>
            <Card title={t('sub_title.sub1')} onClick={() => navigateTo('/shape')}/>
          </div>
          <div style={{width: '300px'}}>
            <Card title={t('sub_title.sub2')} onClick={() => navigateTo('/form')}/>
          </div>    
        </div>
    </div>
   

  )
}

export default MainPage