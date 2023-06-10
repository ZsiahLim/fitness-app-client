import React from 'react'
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts'
import './index.less'
import { Segmented } from 'antd';

export default function Index(props) {
    const { theme } = props
    const trendDashboardClassname = theme === 'light' ? 'trend-light' : ''
    const trendTitleClassname = theme === 'light' ? 'cardTitle-light' : ''
    const getColorBoundary = theme === 'dark' ? '#1d1d1d' : '#ffffff'

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
            <div className={`cardTitle ${trendTitleClassname}`}>Work trend</div>
            <div className='Trend-Options'>
                <Segmented options={['Weekly', 'Monthly', 'Yearly']} />
            </div>
            <ReactEcharts option={getOptionLine()} theme={theme} />
        </div>
    )
}
