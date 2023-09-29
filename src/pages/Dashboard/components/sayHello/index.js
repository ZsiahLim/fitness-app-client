import React, { useEffect, useState } from 'react'
import { BellFilled, LoadingOutlined } from '@ant-design/icons';
import './index.less'
import { Avatar, Badge, Dropdown, List, Popover, Spin, Tabs, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { TabPane } from 'react-bootstrap';
import { useIntl } from 'react-intl';

const items = [{ key: '1', label: (<a target="_blank" rel="noopener noreferrer">System Messages</a>) }, { key: '2', label: (<a target="_blank" rel="noopener noreferrer">My Messages</a>) }];
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function Index() {
    const { currentTheme, currentUser: { name } } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const [visible, setVisible] = useState(false);
    const [noticeList, setNoticeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { noticeCount } = useSelector(state => state.user);
    const noticeListFilter = (type) => {
        return noticeList.filter(notice => notice.type === type);
    };

    // loads the notices belonging to logged in user
    // and sets loading flag in-process
    const getNotice = async () => {
        setLoading(true);
        // const { status, result } = await getNoticeList();

        setLoading(false);
        // status && setNoticeList(result);
    };

    useEffect(() => {
        getNotice();
    }, []);
    const welcomeDashboardClassname = currentTheme === 'light' ? 'welcome-light' : ''
    const SayhelloUsernameClassname = currentTheme === 'light' ? 'Sayhello-username-light' : ''
    const notificationBoxClassname = currentTheme === 'light' ? 'notificationBox-light' : ''
    const tabs = (
        <div>
            <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={formatMessage({ id: 'systemNotifications' })} key="1"                    >
                        <List
                            dataSource={noticeListFilter('notification')}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.title}>{item.title}</a>}
                                        description={item.datetime}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab={formatMessage({ id: 'messages' })} key="2">
                        <List
                            dataSource={noticeListFilter('message')}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.title}>{item.title}</a>}
                                        description={
                                            <div className="notice-description">
                                                <div className="notice-description-content">{item.description}</div>
                                                <div className="notice-description-datetime">{item.datetime}</div>
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
    return (
        <div className='sayHello'>
            <div style={{ fontWeight: 800, fontSize: '30px' }}>{formatMessage({ id: 'hi' })}, <span className={`Sayhello-username ${SayhelloUsernameClassname}`}>{name}</span> ! </div>
            <div className={`welcome ${welcomeDashboardClassname}`}><h3>{formatMessage({ id: 'sayhello' })} <span style={{ fontWeight: 600 }}>Medal</span>~</h3></div>
            <div className={`notificationBox ${notificationBoxClassname}`}>
                <Popover
                    content={tabs}
                    placement="bottom"
                    trigger={['click']}
                    open={visible}
                    onOpenChange={v => setVisible(v)}
                >
                    <Badge count={noticeCount} overflowCount={999}>
                        <BellFilled style={{ fontSize: 26 }} />
                    </Badge>
                </Popover>
            </div>
        </div >
    )
}
