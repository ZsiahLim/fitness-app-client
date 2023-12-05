import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { getuser } from '../api/user.api';

// 这是一个自定义Hook
function useUserTarget() {
    const [weightTarget, setWeightTarget] = useState(null)
    const [stepTarget, setStepTarget] = useState(null)
    const [distanceTarget, setDistanceTarget] = useState(null)
    const [calorieTarget, setCalorieTarget] = useState(null)
    const [durationTarget, setDurationTarget] = useState(null)

    const { currentUser } = useSelector(state => state.user)

    const getTarget = async () => {
        await getuser(currentUser._id).then(res => {
            if (res && res?.status !== false) {
                res?.weightTarget && setWeightTarget(res.weightTarget)
                res?.stepTarget && setStepTarget(res.stepTarget)
                res?.distanceTarget && setDistanceTarget(res.distanceTarget)
                res?.calorieTarget && setCalorieTarget(res.calorieTarget)
                res?.durationTarget && setDurationTarget(res.durationTarget)
            }
        }).catch(err => {
            console.log(err, 'err');
            message.error("出现异常请重试")
        })
    }
    useEffect(() => {
        getTarget()
    }, [])

    // 返回状态和设置方法
    return {
        weightTarget,
        stepTarget,
        distanceTarget,
        calorieTarget,
        durationTarget,
    };
}

export default useUserTarget;

