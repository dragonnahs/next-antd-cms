import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'antd'
import { UsergroupDeleteOutlined,
  SnippetsOutlined,
  RadarChartOutlined,
  AliwangwangOutlined } from '@ant-design/icons';
import style from './index.scss'
import fetch from '@/util/fetch'

const Home = () => {
  const [ info, setInfo ] = useState({})
  useEffect(() => {
    async function getInfo(){
      let res = await fetch.post('/v1/h5/home/info')
      console.log(res);
      if(res.code === 200){
        setInfo(res.data.info)
      }
    }
    getInfo()
  }, [])
  return (
    <div className={style.home}>
      <Row justify='space-around' className={style.info} gutter={[0, 12]}>
        <Col span={11}>
          <Card className={style['info-card']}>
            <div className={style['info-item']}>
              <div className={style['info-icon']}>
                <UsergroupDeleteOutlined style={{fontSize: '40px'}} />
              </div>
              <div className={style['info-item-number']}>
                <div className={style['info-item-tip']}>用户</div>
                <div>{info.userCount}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={11}>
          <Card className={style['info-card']}>
            <div className={style['info-item']}>
              <div className={style['info-icon']}>
                <SnippetsOutlined style={{fontSize: '40px'}} />
              </div>
              <div className={style['info-item-number']}>
                <div className={style['info-item-tip']}>文章</div>
                <div>{info.articleCount}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={11}>
          <Card className={style['info-card']}>
            <div className={style['info-item']}>
              <div className={style['info-icon']}>
                <RadarChartOutlined style={{fontSize: '40px'}} />
              </div>
              <div className={style['info-item-number']}>
                <div className={style['info-item-tip']}>Radardchart</div>
                <div>258698</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={11}>
          <Card className={style['info-card']}>
            <div className={style['info-item']}>
              <div className={style['info-icon']}>
                <AliwangwangOutlined style={{fontSize: '40px'}} />
              </div>
              <div className={style['info-item-number']}>
                <div className={style['info-item-tip']}>Messages</div>
                <div>932407</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home