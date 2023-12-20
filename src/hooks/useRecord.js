import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';
import { getlatestrecord, getrecords } from '../api/record.api';
import { setRecords } from '../redux/RecordSlice';
import { message } from 'antd';

// 这是一个自定义Hook
function useRecord(selectDay) {
    const [latestRecord, setLatestRecord] = useState({})
    const dispatch = useDispatch()
    const [allRecords, setAllRecords] = useState([])
    const getRecords = async () => {
        await getrecords().then(res => {
            if (res && res?.status !== false) {
                console.log("resss", res);
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
            message.error("出现异常请重试")
        })
    }
    useEffect(() => {
        getRecords()
        getLatestRecord()
    }, [])
    // useEffect(() => {
    //     if (allRecords.length !== 0) {
    //         const foundRecord = allRecords.find(record => checkTwoDaysIsEqual(new Date(record.date), selectDay ? selectDay : new Date()))
    //         foundRecord && setTodayRecord(foundRecord)
    //     }
    // }, [selectDay, allRecords]);
    const todayRecord = useMemo(() => {
        if (allRecords.length !== 0) {
            const foundRecord = allRecords.find(record => checkTwoDaysIsEqual(new Date(record.date), selectDay ? selectDay : new Date()))
            console.log("foundRecord", foundRecord);
            return foundRecord ? foundRecord : {}
        } else {
            return {}
        }
        // return selectDay && allRecords.find(record =>
        //     checkTwoDaysIsEqual(new Date(record.date), selectDay)
        // );
    }, [selectDay, allRecords]);

    // 返回状态和设置方法
    return { todayRecord, latestRecord };
}

export default useRecord;
