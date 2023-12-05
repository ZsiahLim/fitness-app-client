import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';
import { getlatestrecord, getrecords } from '../api/record.api';
import { setRecords } from '../redux/RecordSlice';
import { message } from 'antd';

// 这是一个自定义Hook
function useRecord(selectDay) {
    const [todayRecord, setTodayRecord] = useState({})
    const [latestRecord, setLatestRecord] = useState({})
    const dispatch = useDispatch()
    const [allRecords, setAllRecords] = useState([])
    const getRecords = async () => {
        await getrecords().then(res => {
            if (res && res?.status !== false) {
                setAllRecords(res)
                dispatch(setRecords(res))
            }
        }).catch(err => {
            console.log(err, 'err');
            message.error("出现异常请重试")
        })
    }
    const getLatestRecord = async () => {
        await getlatestrecord().then(res => {
            if (res && res?.status !== false) {
                setLatestRecord(res)
            }
        }).catch(err => {
            console.log(err, 'err');
            message.error("出现异常请重试")
        })
    }
    useEffect(() => {
        getRecords()
        getLatestRecord()
    }, [])
    useEffect(() => {
        if (allRecords.length !== 0) {
            const foundRecord = allRecords.find(record => checkTwoDaysIsEqual(new Date(record.date), selectDay ? selectDay : new Date()))
            foundRecord && setTodayRecord(foundRecord)
            console.log("foundRecord", foundRecord);
        }
    }, [selectDay, allRecords]);

    // 返回状态和设置方法
    return { todayRecord, latestRecord };
}

export default useRecord;
