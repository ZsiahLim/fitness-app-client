import React from 'react'
import { Badge, Avatar, List } from 'antd';
import './index.less'
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

const data = [
    {
        title: 'Leon Qin',
    },
    {
        title: 'Leiheng',
    },
    {
        title: 'leon 666',
    },
    {
        title: 'leon 888',
    },
    {
        title: 'Yours',
    },
];
const colors = ['', 'cyan', 'green']
export default function Index() {
    const { currentTheme } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const competitionDashboardClassname = currentTheme === 'light' ? 'competition-light' : ''
    return (
        <div className={`competition ${competitionDashboardClassname}`}>
            <div className='competitionTitle'>{formatMessage({ id: 'competition' })}</div>
            <div className='competitionRange'>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    size='small'
                    renderItem={(item, index) => (
                        [0, 1, 2].includes(index) ? <Badge.Ribbon text={`No. ${index + 1}`} color={colors[index]}>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description=''
                                />
                            </List.Item>
                        </Badge.Ribbon> :
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={index === 4 && 'Your range is 120, Fighting!!!'}
                                />
                            </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
