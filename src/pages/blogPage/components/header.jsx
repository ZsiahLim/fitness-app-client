import { ReloadOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Input, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'

export default function BlogPageHeader({ setSearchText, handleSearchBlog, getData }) {
    const intl = useIntl()
    const { currentUser } = useSelector(state => state.user)
    const navigateTo = useNavigate()
    return (
        <>
            <div className='searchBox'>
                <SearchOutlined /><Input style={{ paddingTop: 0, paddingBottom: 0 }} onChange={({ target: { value } }) => setSearchText(value)} size='large' placeholder={intl.formatMessage({id: 'app.blog.msg.searchField'})} onPressEnter={({ target: { value } }) => handleSearchBlog(value)} allowClear bordered={false} />
            </div>
            <div className='refresh' onClick={getData}>
                <Tooltip title={intl.formatMessage({id: 'app.blog.label.refresh'})}>
                    <ReloadOutlined />
                </Tooltip>
            </div>
            <div className='moreOptions' onClick={() => { navigateTo('/blog/my') }}>
                {currentUser.avator ? <Avatar src={currentUser.avator} /> : <Avatar icon={<UserOutlined />} />}
                {intl.formatMessage({id: 'app.blog.label.myBlogs'})}
            </div>
        </>
    )
}
