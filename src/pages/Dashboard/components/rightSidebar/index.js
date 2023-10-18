import React, { useState } from 'react'
import { CalendarFilled } from '@ant-design/icons';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import './index.less'
import { useSelector } from 'react-redux';
import NoSchedule from '../../../../components/noSchedule';

const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function RightSidebar() {
    const { userLocale } = useSelector(state => state.user)
    const lang = userLocale.substring(0, 2)
    const [today, setToday] = useState(dayjs(new Date()));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='RightSidebarBox'>
            <div className='rightSidebar-date'>
                <div className='rightSidebar-today'>
                    <div>{new Date(today).toLocaleDateString(lang, options)}</div>
                    <CalendarFilled onClick={showModal} style={{ fontSize: 20 }} />
                </div>
            </div>
            <Divider />
            <div className='rightSidebar-Schedule'>
                <NoSchedule />
            </div>
            <Modal title="Select Date" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <DateCalendar value={today} onChange={(newValue) => setToday(newValue)} />
            </Modal>
        </div>
    )
}
