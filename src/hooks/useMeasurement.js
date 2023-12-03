import { useState, useEffect } from 'react';
import { getlatestmeasurement, getmeasurements } from '../api/measurement';
import { message } from 'antd';
import { useSelector } from 'react-redux';
// 这是一个自定义Hook
function useMeasurement() {
    const { currentUser } = useSelector(state => state.user)
    const [allMeasurements, setAllMeasurements] = useState([])
    const [latestMeasurement, setLatestMeasurement] = useState({})

    const getMeasurement = async () => {
        await getmeasurements().then(res => {
            if (res.status !== false) {
                setAllMeasurements(res)
            } else {
                message.error('出现异常请稍后重试')
            }
        })
    }
    const getLatestMeasurement = async () => {
        await getlatestmeasurement().then(res => {
            if (res.status !== false) {
                console.log("latest", res);
                setLatestMeasurement(res)
            } else {
                message.error('出现异常请稍后重试')
            }
        })
    }
    useEffect(() => {
        getMeasurement()
        getLatestMeasurement()
    }, [currentUser?.measurements])

    // 返回状态和设置方法
    return { latestMeasurement, allMeasurements }
}

export default useMeasurement;
