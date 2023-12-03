import { useState, useEffect } from 'react';
import AppleHealthKit from 'react-native-health'

// 这是一个自定义Hook
function useSpecificTimeKit(startTime) {
    const [hasPermissions, setHasPermissions] = useState(false);
    const [steps, setSteps] = useState(0);
    const [distance, setDistance] = useState(0);
    const [calorie, setCalorie] = useState(0);

    // 定义权限对象
    const permissions = {
        permissions: {
            read: [
                AppleHealthKit.Constants.Permissions.Steps,
                AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
                AppleHealthKit.Constants.Permissions.ActiveEnergyBurned
            ],
        },
    };

    // 初始化AppleHealthKit
    useEffect(() => {
        AppleHealthKit.initHealthKit(permissions, (err) => {
            if (err) {
                console.log("error initializing Healthkit: ", err);
                return;
            }
            setHasPermissions(true);
        });
    }, []);

    // 获取步数和行走距离
    useEffect(() => {
        if (!hasPermissions) {
            return;
        }

        const options = {
            date: startTime.toISOString(),
            includeManuallyAdded: false, // 注意属性名称的大小写
        };

        AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
            if (err) {
                console.log("error getting distance: ", err);
                return;
            }
            setDistance(Math.floor(results.value));
        });

        AppleHealthKit.getStepCount(options, (err, results) => {
            if (err) {
                console.log("error getting steps: ", err);
                return;
            }
            setSteps(results.value);
        });

        const colorieOptions = {
            startDate: startTime.toISOString(),
            endDate: new Date().toISOString()
        }
        AppleHealthKit.getActiveEnergyBurned(
            (colorieOptions),
            (err, results) => {
                if (err) {
                    console.log('err colore', err);
                    return
                }
                const totalCalories = results.reduce((total, dataPoint) => total + dataPoint.value, 0);
                setCalorie(totalCalories.toFixed(1))
            },
        )
    }, [hasPermissions]);

    useEffect(() => {
        // 定义定时器
        const interval = setInterval(() => {
            if (!hasPermissions) {
                return;
            }
            const options = {
                date: startTime.toISOString(),
                includeManuallyAdded: false, // 注意属性名称的大小写
            };

            AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
                if (err) {
                    console.log("error getting distance: ", err);
                    return;
                }
                setDistance(Math.floor(results.value));
            });

            AppleHealthKit.getStepCount(options, (err, results) => {
                if (err) {
                    console.log("error getting steps: ", err);
                    return;
                }
                setSteps(results.value);
            });

            const colorieOptions = {
                startDate: startTime.toISOString(),
                endDate: new Date().toISOString()
            }
            AppleHealthKit.getActiveEnergyBurned(
                (colorieOptions),
                (err, results) => {
                    if (err) {
                        console.log('err colore', err);
                        return
                    }
                    const totalCalories = results.reduce((total, dataPoint) => total + dataPoint.value, 0);
                    setCalorie(totalCalories.toFixed(1))
                },
            )// 每隔指定时间调用一次fetchHealthData
        }, 2000);

        // 清除定时器
        return () => clearInterval(interval);
    }, [hasPermissions]);
    // 返回状态和设置方法
    return { steps, distance, calorie };
}

export default useSpecificTimeKit;
