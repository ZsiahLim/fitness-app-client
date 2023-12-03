import { BellFilled, LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, List, Modal, Popover, Spin, Tabs, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { TabPane } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { getunreadedmessage, getuser } from '../../../../api/user.api';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import './index.less'
import { getnotifications } from '../../../../api/notification.api';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function Notifications() {
    const { formatMessage } = useIntl()
    const navigateTo = useNavigate()
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [allNotifications, setAllNotifications] = useState(0)
    const [notifications, setNotifications] = useState([]);
    const [unreadedMsgs, setUnreadedMsgs] = useState([])

    const noticeListFilter = (type) => {
        return notifications.filter(notice => notice.type === type);
    };
    const getNotice = async () => {
        setLoading(true);
        const unreadedMsgs = await getunreadedmessage()
        setUnreadedMsgs(unreadedMsgs)
        console.log(unreadedMsgs);
        const notifications = await getnotifications()
        setNotifications(notifications)
        console.log("notifications", notifications);
        setLoading(false);
    };

    useEffect(() => {
        getNotice();
        // const intervalId = setInterval(getNotice, 3000)
        // return () => {
        //     clearInterval(intervalId)
        // }
    }, []);

    //get allNotification number
    useEffect(() => {
        const allNotificationsNum = notifications.length + unreadedMsgs.length
        setAllNotifications(allNotificationsNum)
    }, [notifications, unreadedMsgs]);
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
    const tabs = (
        <div>
            <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={`${formatMessage({ id: 'systemNotifications' })}(${notifications.length})`} key="1">
                        <List
                            dataSource={notifications}
                            renderItem={notification => (
                                <List.Item onClick={() => handleSystemDetailOpen(notification)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'} />}
                                        title={<>{'系统消息'}</>}
                                        description={notification.title}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab={`${formatMessage({ id: 'messages' })}(${unreadedMsgs.length})`} key="2">
                        <List
                            dataSource={unreadedMsgs}
                            renderItem={unreadedMsg => (
                                <List.Item onClick={() => navigateTo(`/chat/conversations/specific/${unreadedMsg.conversationId}`)}>
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
                    </TabPane>
                    <TabPane tab={formatMessage({ id: 'todos' })} key="3">
                        <List
                            dataSource={noticeListFilter('event')}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <div className="notice-title">
                                                <div className="notice-title-content">{item.title}</div>
                                                <Tag >{item.extra}</Tag>
                                            </div>
                                        }
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </Spin>
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
            <Modal title={'系统消息详情'} open={systemDetailOpen} zIndex={10000} footer={null} onCancel={() => setSystemDetailOpen(false)}>
                {currentNotification && <div>
                    {/* {currentNotification.title} <a onClick={() => navigateTo(`/specificblog/${currentNotification.targetID}`)}>{currentNotification.targetType === 'blog' ? '博客详情' : '评论详情'}</a> */}
                    {currentNotification.title} <a>{currentNotification.targetType === 'blog' ? '博客详情' : '评论详情'}</a>
                </div>}
            </Modal>
        </>
    )
}
