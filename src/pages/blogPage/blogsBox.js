import React, { useEffect, useState } from 'react'
import { Avatar, Dropdown, Input, Tooltip, message } from 'antd'
import { getlatestBlogs, getmostlikeblogs, getrandomblog, getsubsribedusersblogs, searchblog } from '../../api/user.api';
import { useSelector } from 'react-redux';
import EmptyBlog from './components/empty';
import { useLoaderData, useNavigate } from 'react-router-dom';
import WaterfallContainer from '../../components/waterfallContainer/BlogsWrapper';
import { useIntl } from 'react-intl';
import { DownOutlined, ReloadOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import SIZE from '../../constants/SIZE';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import COLORS from '../../constants/COLORS';
export default function BlogsBox() {
    const intl = useIntl()
    const tabs = {
        all: { value: 'all', label: intl.formatMessage({ id: 'app.blog.Community' }) },
        subscribe: { value: 'subscribe', label: intl.formatMessage({ id: 'app.blog.Subscribed' }) },
        newest: { value: 'newest', label: intl.formatMessage({ id: 'app.blog.Latest' }) },
        mostLiked: { value: 'mostLiked', label: intl.formatMessage({ id: 'app.blog.MostLiked' }) },
        search: { value: 'search', label: intl.formatMessage({ id: 'app.blog.Search' }) },
    }
    const onClick = ({ key }) => {
        console.log("key", key);
        setSelectedTabs(key)
    };
    const [selectedTabs, setSelectedTabs] = useState(tabs.all.value)
    const items = [
        {
            key: tabs.all.value,
            label: (
                <span>
                    {tabs.all.label}
                </span>
            ),
        },
        {
            key: tabs.subscribe.value,
            label: (
                <span>
                    {tabs.subscribe.label}
                </span>
            ),
        },
        {
            key: tabs.newest.value,
            label: (
                <span>
                    {tabs.newest.label}
                </span>
            ),
        },
        {
            key: tabs.mostLiked.value,
            label: (
                <span>
                    {tabs.mostLiked.label}
                </span>
            ),
        },
    ];
    const navigateTo = useNavigate()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [searchText, setSearchText] = useState()

    const [allBlogs, setAllBlogs] = useState(useLoaderData())
    const [showBlogs, setShowBlogs] = useState([])
    const [searchedBlogs, setSearchedBlogs] = useState([])
    const [subscribedUserBlogs, setSubscribedUserBlogs] = useState([])
    const [mostLikedBlogs, setMostLikedBlogs] = useState([])
    const [latestBlogs, setLatestBlogs] = useState([])

    const getData = async () => {
        await getrandomblog().then((blogs) => {
            setAllBlogs(blogs)
        })
    }
    const getSubscribedBlogs = async () => {
        await getsubsribedusersblogs().then(res => {
            if (res && res.status !== false) {
                setSubscribedUserBlogs(res)
            }
        })
    }
    const getMostLikedBlogs = async () => {
        await getmostlikeblogs().then(res => {
            if (res && res.status !== false) {
                setMostLikedBlogs(res)
            }
        })
    }
    const getLatestBlogs = async () => {
        await getlatestBlogs().then(res => {
            if (res && res.status !== false) {
                setLatestBlogs(res)
            }
        })
    }
    useEffect(() => {
        selectedTabs !== tabs.search.value && setSearchText('')
        switch (selectedTabs) {
            case tabs.all.value:
                setShowBlogs(allBlogs)
                break;
            case tabs.mostLiked.value:
                setShowBlogs(mostLikedBlogs)
                break;
            case tabs.newest.value:
                setShowBlogs(latestBlogs)
                break;
            case tabs.subscribe.value:
                setShowBlogs(subscribedUserBlogs)
                break;
            default:
                setShowBlogs(allBlogs)
                break;
        }
    }, [selectedTabs])
    useEffect(() => {
        getSubscribedBlogs()
        getMostLikedBlogs()
        getLatestBlogs()
    }, [])

    const handleSearchBlog = async () => {
        setSelectedTabs(tabs.search.value)
        if (searchText) {
            const query = { params: searchText }
            await searchblog(query).then((blogs) => {
                setSearchedBlogs(blogs)
            }).catch(err => {
                console.log(err);
                message.error(intl.formatMessage({ id: 'error.blog.failedGet' }))
            })
        } else {
            setSearchedBlogs([])
        }
    }
    const lightHeaderClassname = theme === 'light' ? 'header-light' : ''
    return (
        <>
            <div className={`header ${lightHeaderClassname}`}>
                <div className='Tabs'>
                    <Dropdown
                        menu={{ items, onClick }}
                        placement="bottom"
                    >
                        <div className='buttonHover' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: SIZE.LittleMargin, padding: "8px 20px", borderRadius: SIZE.CardBorderExtraRadius, backgroundColor: COLORS.primary, color: COLORS.white, fontWeight: 'bold' }}>
                            <div>
                                {tabs[selectedTabs].label}
                            </div>
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
                <div className='searchBox'>
                    <SearchOutlined /><Input style={{ paddingTop: 0, paddingBottom: 0 }} value={searchText} onChange={({ target: { value } }) => setSearchText(value)} size='large' placeholder={intl.formatMessage({ id: 'app.blog.msg.searchField' })} onPressEnter={({ target: { value } }) => handleSearchBlog(value)} allowClear bordered={false} />
                </div>
                <div className='refresh' onClick={getData}>
                    <Tooltip title={intl.formatMessage({ id: 'app.blog.label.refresh' })}>
                        <ReloadOutlined />
                    </Tooltip>
                </div>
                <div className='moreOptions' onClick={() => { navigateTo('/blog/my') }}>
                    {currentUser.avator ? <Avatar src={currentUser.avator} /> : <Avatar icon={<UserOutlined />} />}
                    <span>
                        {intl.formatMessage({ id: 'app.blog.label.myBlogs' })}
                    </span>
                </div>
                {/* <BlogPageHeader setSearchText={setSearchText} handleSearchBlog={handleSearchBlog} getData={getData} /> */}
            </div>
            <div className='blog-content'>
                {searchText && (searchedBlogs.length === 0 || allBlogs.length === 0) && <EmptyBlog />}
                <WaterfallContainer blogs={searchText ? searchedBlogs : showBlogs} />
                {/* <WaterfallContainer blogs={selectedTabs.value === tabs.all.value ? allBlogs : searchedBlogs} /> */}
            </div>
        </>

    )
}
