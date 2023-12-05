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
            console.log(res);
            if (res && res?.status !== false) {
                setAllMeasurements(res)
            } else {

            }
        })
    }
    const getLatestMeasurement = async () => {
        await getlatestmeasurement().then(res => {
            if (res && res?.status !== false) {
                setLatestMeasurement(res)
            } else {
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
