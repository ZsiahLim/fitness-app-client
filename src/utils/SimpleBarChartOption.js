import * as echarts from 'echarts'
import COLORS from '../constants/COLORS';
// import useUserTheme from '../hooks/useUserTheme';
// import APPTHEME from '../constants/COLORS/APPTHEME';

const SimpleBarChartOption = (xArr, yArr, title, color, targetValue, boundaryColor) => {
    // const theme = useUserTheme()
    // const THEME = APPTHEME[theme]
    const targetArr = new Array(xArr.length).fill(targetValue)
    let yarr = yArr.filter(element => element);
    let max = targetValue ? (Math.max(...yarr, targetValue) + 3) : (Math.max(...yarr) + 3)
    max = Math.ceil(max)
    const xaxis = targetValue ? [
        {
            data: yArr,
            type: 'bar',
            name: title,
            smooth: true
        },
        {
            name: 'Target',
            type: 'line',
            smooth: true,
            lineStyle: {
                width: 6,
                color: COLORS.green,
            },
            symbol: 'none',
            showSymbol: true,
            symbolSize: 0, // 数据点的大小
            itemStyle: {
                normal: {
                    color: COLORS.green, // 数据点的颜色
                    borderColor: COLORS.green, // 数据点边框的颜色
                    borderWidth: 2, // 数据点边框的宽度
                    borderType: 'solid' // 数据点边框的类型，还可以是'dashed'或'dotted'
                }
            },
            data: targetArr
        },
    ] : [{
        data: yArr,
        type: 'bar',
        name: title,
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                    offset: 0, color: color ? color : '#6C96E1' // 0% 处的颜色
                }, {
                    offset: 1, color: boundaryColor// 100% 处的颜色
                    // offset: 1, color: THEME.contentColor// 100% 处的颜色
                }]
                ),  //背景渐变色 
            },
        },
        smooth: true
    }]
    return {
        legend: {
            textStyle: {
                color: COLORS.commentText
            }
        },
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
            // min: min,
            max: max,
            show: true,
            splitLine: {
                show: true // Do not show the split lines
            },
        },
        grid: {
        },
        series: xaxis,
        backgroundColor: ''
    }
};
export default SimpleBarChartOption