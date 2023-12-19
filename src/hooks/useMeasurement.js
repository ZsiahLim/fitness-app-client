// import { useState, useEffect } from 'react';
// import { getlatestmeasurement, getmeasurements } from '../api/measurement';
// import { useSelector } from 'react-redux';
// // 这是一个自定义Hook
// function useMeasurement() {
//     const { measurements, latestMeasurement: SavedMeasuremenst } = useSelector(state => state.measurement)
//     const { currentUser } = useSelector(state => state.user)
//     const [allMeasurements, setAllMeasurements] = useState([])
//     const [latestMeasurement, setLatestMeasurement] = useState({})

//     const getMeasurement = async () => {
//         await getmeasurements().then(res => {
//             console.log(res);
//             if (res && res?.status !== false) {
//                 setAllMeasurements(res)
//             } else {

//             }
//         })
//     }
//     const getLatestMeasurement = async () => {
//         await getlatestmeasurement().then(res => {
//             if (res && res?.status !== false) {
//                 setLatestMeasurement(res)
//             } else {
//             }
//         })
//     }

//     useEffect(() => {
//         getMeasurement()
//         getLatestMeasurement()
//     }, [currentUser?.measurements, measurements])

//     // 返回状态和设置方法
//     return { latestMeasurement, allMeasurements }
// }

// export default useMeasurement;
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getlatestmeasurement, getmeasurements } from '../api/measurement';

function useMeasurement() {
    const { measurements, latestMeasurement: savedMeasurements } = useSelector(state => state.measurement)
    const { currentUser } = useSelector(state => state.user)
    const [allMeasurements, setAllMeasurements] = useState([])
    const [latestMeasurement, setLatestMeasurement] = useState({})
    const [error, setError] = useState(null);

    const getMeasurement = useCallback(async () => {
        try {
            const res = await getmeasurements();
            if (res && res?.status !== false) {
                setAllMeasurements(res);
            }
        } catch (error) {
            setError(error);
        }
    }, []);

    const getLatestMeasurement = useCallback(async () => {
        try {
            const res = await getlatestmeasurement();
            if (res && res?.status !== false) {
                setLatestMeasurement(res);
            }
        } catch (error) {
            setError(error);
        }
    }, []);

    useEffect(() => {
        getMeasurement();
        getLatestMeasurement();
    }, [currentUser?.measurements, measurements]);

    const memoizedMeasurements = useMemo(() => {
        // Transformations or calculations with allMeasurements
        return allMeasurements;
    }, [allMeasurements]);

    // Return state, setters, and error
    return { latestMeasurement, allMeasurements: memoizedMeasurements, error };
}

export default useMeasurement;