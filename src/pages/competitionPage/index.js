import './index.less'
import CompetitionCard from './competitionCard'
import { useSelector } from 'react-redux'

export default function CompetitionPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const lightCompetitionPageClassname = currentTheme === 'light' ? 'competitionPage-light' : ''
    return (
        <div className={`competitionPage ${lightCompetitionPageClassname}`}>
            <div className='competitionEvents'>
                <div className='title'><h1>June competitions</h1></div>
                <div className='competitionList'>
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                </div>
            </div>
        </div >
    )
}
