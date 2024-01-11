import { BellFilled, LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Empty, List, Modal, Popover, Spin, Tabs, } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { TabPane } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { getunreadedmessage, getuser } from '../../../../api/user.api';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import './index.less'
import { getnotifications } from '../../../../api/notification.api';
import useUncompletedTutorials from '../../../../hooks/useUncompletedTutorials';
import UnDoneTodoItem from '../../../planPage/Components/UnDoneTodoItem';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
import COLORS from '../../../../constants/COLORS';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function Notifications() {
    const { formatMessage } = useIntl()
    const navigateTo = useNavigate()
    const [visible, setVisible] = useState(false);

    const [allNotifications, setAllNotifications] = useState(0)
    const [notifications, setNotifications] = useState([]);
    const [unreadedMsgs, setUnreadedMsgs] = useState([])
    const yetDoneTutorial = useUncompletedTutorials()
    const getNotice = async () => {
        const unreadedMsgs = await getunreadedmessage()
        setUnreadedMsgs(unreadedMsgs)
        const notifications = await getnotifications()
        setNotifications(notifications)
    };
    useEffect(() => {
        getNotice();
        const intervalId = setInterval(getNotice, 3000)
        return () => {
            clearInterval(intervalId)
        }
    }, []);
    //get allNotification number
    useEffect(() => {
        const prevNum = allNotifications
        const allNotificationsNum = notifications.length + unreadedMsgs.length + yetDoneTutorial.length
        prevNum !== allNotificationsNum && setAllNotifications(allNotificationsNum)
    }, [notifications, unreadedMsgs, yetDoneTutorial]);
    const [currentNotification, setCurrenNotification] = useState({})
    const handleSystemDetailOpen = (notification) => {
        setCurrenNotification(notification)
        setSystemDetailOpen(true)
    }
    const getUnreadedMessageSender = async () => {
        return Promise.all(unreadedMsgs.map(async (unreadedMsg) => await getuser(unreadedMsg.sender)))
    }
    useEffect(() => {
        unreadedMsgs?.length !== 0 && getUnreadedMessageSender().then((sendersDetail) => {
            const res = unreadedMsgs.map(msg => {
                const senderDetail = sendersDetail.find(sender => sender._id === msg.sender)
                return { ...msg, senderDetail }
            })
            setUnreadedMsgs(res)
        })
    }, [unreadedMsgs])
    const getMsgValue = (msg) => {
        switch (msg.msgType) {
            case 'text':
                return msg.msgValue
            case 'image':
                return '[picture]'
            case 'video':
                return '[video]'
            default:
                break;
        }
    }
    useEffect(() => {
        console.log("done");
    }, [yetDoneTutorial])
    const tabs = (
        <div>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: `${formatMessage({ id: 'systemNotifications' })}(${notifications.length})`,
                        key: '1',
                        children: <List
                            dataSource={notifications}
                            renderItem={(notification, index) => (
                                <List.Item key={index} onClick={() => handleSystemDetailOpen(notification)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'} />}
                                        title={<>{formatMessage({ id: 'app.news.systemMsg' })}</>}
                                        description={notification.title}
                                    />
                                </List.Item>
                            )} />
                    },
                    {
                        label: `${formatMessage({ id: 'messages' })}(${unreadedMsgs.length})`,
                        key: '2',
                        children: <List
                            dataSource={unreadedMsgs}
                            renderItem={(unreadedMsg, index) => (
                                <List.Item key={index} onClick={() => navigateTo(`/chat/conversations/specific/${unreadedMsg.conversationId}`)}>
                                    <List.Item.Meta
                                        avatar={unreadedMsg?.senderDetail ? <Avatar src={unreadedMsg?.senderDetail.avator} /> : <Avatar icon={<UserOutlined />} />}
                                        title={unreadedMsg?.senderDetail ? <>{unreadedMsg?.senderDetail.name}</> : <>user</>}
                                        description={
                                            <div className="notice-description">
                                                <div className="notice-description-content">{getMsgValue(unreadedMsg)}</div>
                                                <div className="notice-description-datetime">{dayjs(unreadedMsg.updatedAt).format('YYYY-MM-DD HH:mm')}</div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    },
                    {
                        label: `${formatMessage({ id: 'todos' })}`,
                        key: '3',
                        children: <TodoPane />
                    },
                ]}
            >
            </Tabs>
        </div>
    );
    const [systemDetailOpen, setSystemDetailOpen] = useState(false)
    return (
        <>
            <Popover
                content={tabs}
                placement="bottom"
                trigger={['click']}
                open={visible}
                onOpenChange={v => setVisible(v)}
            >
                <Badge count={allNotifications} overflowCount={999}>
                    <BellFilled style={{ fontSize: 26 }} />
                </Badge>
            </Popover>
            <Modal title={formatMessage({ id: 'app.dsh.title.systemDetails' })} open={systemDetailOpen} zIndex={10000} footer={null} onCancel={() => setSystemDetailOpen(false)}>
                {currentNotification && <div>
                    {currentNotification.title}
                </div>}
            </Modal>
        </>
    )
}

function TodoPane() {
    const intl = useIntl()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const yetDoneTutorial = useUncompletedTutorials()
    return (
        <div>
            {yetDoneTutorial.length === 0 ? <div style={{ width: "100%", height: '96%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: THEME.backgroundColor, }}>
                <Empty description={false} />
                <div style={{ fontSize: 14, color: COLORS.commentText }}>
                    {intl.formatMessage({ id: 'app.dsh.notification.noTodo' })}
                </div>
            </div> : yetDoneTutorial.map((item, index) => <UnDoneTodoItem key={index} tutorial={item} />)}
        </div>
    )
}

