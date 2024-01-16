import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';
import { getlatestrecord, getrecords } from '../api/record.api';
import { setRecords } from '../redux/RecordSlice';
import { message } from 'antd';
import { useIntl } from 'react-intl';

// 这是一个自定义Hook
function useRecord(selectDay) {
    const { formatMessage } = useIntl()
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
            message.error(formatMessage({ id: 'error.errorHappens' }))
        })
    }
    const getLatestRecord = async () => {
        await getlatestrecord().then(res => {
            if (res && res?.status !== false) {
                setLatestRecord(res)
            }
        }).catch(err => {
            message.error(formatMessage({ id: 'error.errorHappens' }))
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
            console.log("allRecords", allRecords);
            const comparedDay = selectDay ? selectDay : new Date()
            console.log("comparedDay", comparedDay);

            const foundRecord = allRecords.find(record => {
                console.log("record", checkTwoDaysIsEqual(new Date(record.date), comparedDay));
                return checkTwoDaysIsEqual(new Date(record.date), comparedDay)
            })
            console.log("foundRecord", foundRecord);
            return foundRecord ? foundRecord : {}
        } else {
            return {}
        }
    }, [selectDay, allRecords]);

    // 返回状态和设置方法
    return { todayRecord, latestRecord };
}

export default useRecord;
