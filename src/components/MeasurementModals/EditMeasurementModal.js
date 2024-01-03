import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { isEmptyObj } from '../../utils/funcs';
import { updatemeasurement, uploadmeasurement } from '../../api/measurement';
import { setMeasurements, setLatestMeasurement } from '../../redux/MeasurementSlice';
import { Modal, message, Button, Form, Input, InputNumber } from 'antd';
import { loginSuccess } from '../../redux/userSlice';
import { calculateBMI } from '../../utils/BMICalculate';
import SIZE from '../../constants/SIZE';
import COLORS from '../../constants/COLORS';
import { useIntl } from 'react-intl';

const EditMeasurementModal = ({ measurement, visible, setVisible }) => {
    const intl = useIntl()
    const [selectedMeasurement, setSelectedMeasurement] = useState()
    useEffect(() => {
        console.log("measurement", measurement);
        setSelectedMeasurement(measurement)
    }, [measurement])
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState();
    const [fatRate, setFatRate] = useState();
    const [BMI, setBMI] = useState();
    useEffect(() => {
        selectedMeasurement?.height && setHeight(selectedMeasurement.height)
        selectedMeasurement?.weight && setWeight(selectedMeasurement.weight)
        selectedMeasurement?.bodyFatRate && setFatRate(selectedMeasurement.bodyFatRate)
        selectedMeasurement?.BMI && setBMI(selectedMeasurement.BMI)
    }, [selectedMeasurement])
    const handleInputWeight = (value) => {
        console.log(value);
        setWeight(value)
    }
    const handleInputHeight = (value) => {
        console.log(value);
        setHeight(value)
    }
    const handleInputFatRate = (value) => {
        console.log(value);
        setFatRate(value)
    }
    const handleUpdateMeasurement = async () => {
        if (weight && height) {
            const data = fatRate ? {
                weight: parseFloat(weight),
                height: parseFloat(height),
                BMI,
                bodyFatRate: parseFloat(fatRate)
            } : {
                weight: parseFloat(weight),
                height: parseFloat(height),
                BMI,
            }
            await updatemeasurement(selectedMeasurement._id, data).then(res => {
                if (res.status !== false) {
                    setVisible(false)
                    dispatch(setMeasurements(res))
                } else {
                    message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                }
            })
        } else {
            message.error(intl.formatMessage({ id: 'error.incompleteInput' }))
        }
    }
    useEffect(() => {
        if (height && weight) {
            const BMI = calculateBMI(weight, height)
            setBMI(BMI)
        }
    }, [height, weight])
    const dispatch = useDispatch()
    return (
        <Modal
            title={intl.formatMessage({ id: 'app.stats.title.editMetric' })}
            open={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={null}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                    <div style={{ width: 100 }}>{intl.formatMessage({ id: 'app.stats.title.wtUnit' })}</div>
                    <div style={{}}><InputNumber style={{ width: 200 }} value={weight} min={30} max={200} step={0.01} onChange={handleInputWeight} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                    <div style={{ width: 100 }}>{intl.formatMessage({ id: 'app.stats.title.htUnit' })}</div>
                    <div style={{}}><InputNumber style={{ width: 200 }} value={height} min={80} max={300} step={0.01} onChange={handleInputHeight} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                    <div style={{ width: 100 }}>{intl.formatMessage({ id: 'app.stats.title.bfrUnit' })}</div>
                    <div style={{}}><InputNumber style={{ width: 200 }} value={fatRate} min={2} max={50} step={0.01} onChange={handleInputFatRate} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                    <div style={{ width: 100 }}>BMI</div>
                    <div style={{}}><InputNumber disabled style={{ width: 200 }} value={BMI} step={0.01} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin }}>
                    <div onClick={handleUpdateMeasurement} style={{ padding: "8px 22px", borderRadius: 18, fontSize: 18, fontWeight: 'bold', color: COLORS.white, backgroundColor: COLORS.primary }}>
                        {intl.formatMessage({ id: 'btn.save' })}
                    </div>
                    <div onClick={() => setVisible(false)} style={{ padding: "8px 22px", borderRadius: 18, fontSize: 18, fontWeight: 'bold', color: COLORS.commentText }}>
                        {intl.formatMessage({ id: 'btn.cancel' })}
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default EditMeasurementModal