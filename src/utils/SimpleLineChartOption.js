import * as echarts from 'echarts'
import COLORS from '../constants/COLORS';
import useUserTheme from '../hooks/useUserTheme';
import APPTHEME from '../constants/COLORS/APPTHEME';

const SimpleLineChartOption = (xArr, yArr, title, color, targetValue) => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const targetArr = new Array(xArr.length).fill(targetValue)
    let yarr = yArr.filter(element => element);
    let min = targetValue ? Math.min(...yarr, targetValue) - 1 : Math.min(...yarr) - 1
    min = Math.floor(min)
    let max = targetValue ? Math.max(...yarr, targetValue) + 1 : Math.max(...yarr) + 1
    max = Math.ceil(max)
    const xaxis = targetValue ? [
        {
            data: yArr,
            type: 'line',
            name: title,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                        offset: 0, color: color ? color : '#6C96E1' // 0% 处的颜色
                    }, {
                        offset: 1, color: THEME.contentColor// 100% 处的颜色
                    }]
                    ),  //背景渐变色 
                },
            },
            smooth: true
        },
        {
            name: 'Target',
            type: 'line',
            smooth: true,
            // lineStyle: {
            //     width: 0
            // },
            showSymbol: true,
            // emphasis: {
            // focus: 'series'
            // },
            data: targetArr
        },
    ] : [
        {
            data: yArr,
            type: 'line',
            name: title,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                        offset: 0, color: color ? color : '#6C96E1' // 0% 处的颜色
                    }, {
                        offset: 1, color: THEME.contentColor// 100% 处的颜色
                    }]
                    ),  //背景渐变色 
                },
            },
            smooth: true
        }]
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: COLORS.primary,
                },
            },
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    type: 'png', // 设置保存图片的类型，例如 'png', 'jpeg'
                    name: title, // 设置保存的图片名称
                }
            }
        },
        xAxis: {
            type: 'category',
            data: xArr,
            show: true
        },
        yAxis: {
            type: 'value',
            min: min,
            max: max,
            show: true,
            splitLine: {
                show: true // Do not show the split lines
            },
        },
        grid: {
            top: -10,
        },
        series: xaxis,
        backgroundColor: ''
    }
};
export default SimpleLineChartOption