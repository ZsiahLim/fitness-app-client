import React from 'react'
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts'
import './index.less'
import { Segmented } from 'antd';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

export default function Index() {
    const { currentTheme } = useSelector(state => state.user)
    const trendDashboardClassname = currentTheme === 'light' ? 'trend-light' : ''
    const trendTitleClassname = currentTheme === 'light' ? 'cardTitle-light' : ''
    const getColorBoundary = currentTheme === 'dark' ? '#1d1d1d' : '#ffffff'
    const { formatMessage } = useIntl()

    const getOptionLine = () => {
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    name: 'Sports trend',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                                offset: 0, color: '#6C96E1' // 0% 处的颜色
                            }, {
                                offset: 1, color: getColorBoundary// 100% 处的颜色
                            }]
                            ),  //背景渐变色 
                        },
                    },
                    smooth: true
                }
            ],
            backgroundColor: ''
        };
    }
    return (
        <div className={`trend ${trendDashboardClassname}`}>
            <div className={`cardTitle ${trendTitleClassname}`}>{formatMessage({ id: 'worktrend' })}</div>
            <div className='Trend-Options'>
                <Segmented defaultValue={formatMessage({ id: 'Weekly' })} options={[formatMessage({ id: 'Weekly' }), formatMessage({ id: 'Monthly' }), formatMessage({ id: 'Yearly' })]} />
            </div>
            <ReactEcharts option={getOptionLine()} theme={currentTheme} />
        </div>
    )
}
