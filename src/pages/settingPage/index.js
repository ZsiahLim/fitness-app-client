import './index.less'
import ProfileCard from './components/profileCard'
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import SIZE from '../../constants/SIZE';
import COLORS from '../../constants/COLORS';
import { LikeOutlined, RightOutlined, StarOutlined } from '@ant-design/icons';
import useRecords from '../../hooks/useRecords';
import { secToSpecificMin } from '../../utils/funcs';
import useMeasurement from '../../hooks/useMeasurement';
import { formatTimeForChartSoloItem } from '../../utils/formatTime';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import MyExerciseCard from './components/MyExerciseCard';
export const cardType = {
    exercise: 'exercise',
    blog: 'blog',
}
export default function SettingPage() {
    const intl = useIntl()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const [likeBlogs, setLikeBlogs] = useState([])
    const [favoriteBlogs, setFavoriteBlogs] = useState([])
    useEffect(() => {
        if (currentUser?.likeBlogs && currentUser?.likeBlogs.length !== 0) {
            setLikeBlogs(currentUser.likeBlogs)
        }
        if (currentUser?.favoriteBlogs && currentUser?.favoriteBlogs.length !== 0) {
            setFavoriteBlogs(currentUser.favoriteBlogs)
        }
    }, [currentUser])

    return (
        <div className={`settingPage`} style={{ backgroundColor: THEME.contentColor }}>
            <div className={"overflowAuto"} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <div style={{ flex: 1, width: "80%", padding: '0 20px', marginBottom: SIZE.NormalMargin }}>
                    <ProfileCard />
                    <ExerciseAndBodyMatric />
                    <MyExerciseCard />
                    <Card type={cardType.blog} title={intl.formatMessage({ id: 'app.prf.title.Blog' })} unitDescription={intl.formatMessage({ id: 'app.prf.blogUnit' })}
                        LeftIcon={() => <StarOutlined style={{ fontSize: 36, color: COLORS.white }} />} leftTitle={intl.formatMessage({ id: 'app.prf.label.favouriteBlog' })} leftValue={favoriteBlogs.length}
                        RightIcon={() => <LikeOutlined style={{ fontSize: 36, color: COLORS.white }} />} rightTitle={intl.formatMessage({ id: 'app.prf.label.likedBlog' })} rightValue={likeBlogs.length}
                    />
                </div>
            </div>
        </div >
    )
}



const ExerciseAndBodyMatric = () => {
    const intl = useIntl()
    const navigateTo = useNavigate()
    const theme = useUserTheme()
    const { latestMeasurement } = useMeasurement()
    const THEME = APPTHEME[theme]
    const { durationSum, calorieSum, tutorialCalorieSum } = useRecords()
    return <div style={{ flex: 1, gap: SIZE.NormalMargin, display: 'flex', flexDirection: 'row', backgroundColor: THEME.backgroundColor, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin }}>
        <div style={{ flex: 1, backgroundColor: THEME.contentColor, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, }}>
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>{intl.formatMessage({ id: 'app.prf.label.summary' })}</div>
                <div className='buttonHover' onClick={() => navigateTo('/statistics')}>
                    <RightOutlined />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', }}>
                <div style={{ fontWeight: 'bold', fontSize: 20 }}>{secToSpecificMin(durationSum)}</div>
                <div style={{ fontSize: 14, }}>{intl.formatMessage({ id: 'app.prf.label.summary.timeUnit' })}</div>
            </div>
            <div style={{ color: COLORS.commentText, fontSize: 14 }}>
                {intl.formatMessage({ id: 'app.prf.label.summary.consumption' })}{calorieSum ? calorieSum.toFixed(0) : 0}({tutorialCalorieSum ? tutorialCalorieSum : 0}){intl.formatMessage({ id: 'app.prf.label.summary.calUnit' })}
            </div>
        </div>
        <div style={{ flex: 1, backgroundColor: THEME.contentColor, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, }}>
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>{intl.formatMessage({ id: 'app.prf.label.wt' })}</div>
                <div className='buttonHover' onClick={() => navigateTo('/statistics')}>
                    <RightOutlined />
                </div>
            </div>
            {latestMeasurement?.weight ? <div style={{ display: 'flex', alignItems: 'baseline', }}>
                <div style={{ fontWeight: 'bold', fontSize: 20 }}>{latestMeasurement.weight}</div>
                <div style={{ fontSize: 14, }}>{intl.formatMessage({ id: 'app.prf.label.wt.wtUnit' })}</div>
            </div> : <div style={{ padding: '8px 0', }}>
                {intl.formatMessage({ id: 'app.prf.noRecord' })}
            </div>}
            {latestMeasurement?.date && <div style={{ color: COLORS.commentText, fontSize: 14 }}>
                {intl.formatMessage({ id: 'app.prf.label.wt.recorder' })}{formatTimeForChartSoloItem(new Date(latestMeasurement.date))}
            </div>}
        </div>
    </div >
}

export const Card = ({ type, title, unitDescription, LeftIcon, leftTitle, leftValue, RightIcon, rightTitle, rightValue }) => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const navigateTo = useNavigate()
    return (
        <div style={{ flex: 1, height: 180, display: 'flex', flexDirection: 'column', backgroundColor: THEME.backgroundColor, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, marginBottom: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 6, height: 24, borderRadius: 4, backgroundColor: COLORS.primary }}></div>
                <div style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', gap: SIZE.NormalMargin, backgroundColor: THEME.contentColor, borderRadius: SIZE.CardBorderRadius }}>
                <div onClick={() => type === cardType.blog && navigateTo('/blog/my')} className='buttonHover' style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: SIZE.NormalMargin }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary }}>
                            <LeftIcon />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontWeight: 'bold', }}>{leftTitle}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', }}><div style={{ fontWeight: 'bold', fontSize: 20 }}>{leftValue}</div><div style={{ fontSize: 14, color: COLORS.commentText }}>{unitDescription}</div></div>
                    </div>
                </div>
                <div onClick={() => type === cardType.blog && navigateTo('/blog/my')} className='buttonHover' style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: SIZE.NormalMargin }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.commentText }}>
                            <RightIcon />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontWeight: 'bold', }}>{rightTitle}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', }}><div style={{ fontWeight: 'bold', fontSize: 20 }}>{rightValue}</div><div style={{ fontSize: 14, color: COLORS.commentText }}>{unitDescription}</div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}