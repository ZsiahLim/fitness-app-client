import COLORS from "../constants/COLORS";

export const BarchartsOptions = (dateArr, dataArr1, title1, dataArr2, title2, dataArr3, title3, dataArr4, title4,) => {
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
        grid: {
            left: '46',
        },
        legend: {
            textStyle: {
                color: COLORS.commentText
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: false, readOnly: false },
                restore: { show: false, },
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: dateArr,
        },
        yAxis: {
            type: 'value',
            scale: true,
            show: true,
            min: 0,
        },
        series: [
            {
                name: title1,
                type: 'bar',
                data: dataArr1,
            },
            {
                name: title2,
                type: 'bar',
                data: dataArr2,
            },
            {
                name: title3,
                type: 'bar',
                data: dataArr3,
            },
            {
                name: title4,
                type: 'bar',
                data: dataArr4,
            },
        ],
    };
}
