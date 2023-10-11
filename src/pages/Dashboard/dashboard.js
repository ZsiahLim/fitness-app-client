import './index.less';
import SayHello from './components/sayHello'
import Contacts from './components/contacts'
import Statistic from './components/statistic'
import CompetitionCard from '../../components/competitionCard'
import Trend from './components/trend'
import RightSidebar from './components/rightSidebar';
import { useSelector } from 'react-redux';

function Main() {
    const { currentUser, currentTheme } = useSelector(state => state.user)
    const contendBoxRightDashboardClassname = currentTheme === 'light' ? 'contendBox-right-light' : ''
    return (
        <div className='contentBox'>
            <div className='contendBox-left'>
                <SayHello />
                <div className='contendBox-left-subTop'>
                    <Contacts />
                    <Statistic />
                </div>
                <div className='contendBox-left-subBottom'>
                    <CompetitionCard />
                    <Trend />
                </div>
            </div>
            <div className={`contendBox-right ${contendBoxRightDashboardClassname}`}>
                <RightSidebar />
            </div>
        </div>
    );
}

export default Main;
