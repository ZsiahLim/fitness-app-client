import './index.less';
import { useEffect, useState } from 'react';

import SayHello from '../../components/sayHello'
import Contacts from '../../components/contacts'
import Statistic from '../../components/statistic'
import CompetitionCard from '../../components/competitionCard'

import Trend from '../../components/trend'
import { useParams } from 'react-router-dom';
import RightSidebar from '../../components/rightSidebar';

function Main() {
    let { theme, name } = useParams()
    const contendBoxRightDashboardClassname = theme === 'light' ? 'contendBox-right-light' : ''
    return (
        <div className='contentBox'>
            <div className='contendBox-left'>
                <SayHello theme={theme} userName={name} />
                <div className='contendBox-left-subTop'>
                    <Contacts theme={theme} />
                    <Statistic theme={theme} />
                </div>
                <div className='contendBox-left-subBottom'>
                    <CompetitionCard theme={theme} />
                    <Trend theme={theme} />
                </div>
            </div>
            <div className={`contendBox-right ${contendBoxRightDashboardClassname}`}>
                <RightSidebar theme={theme} />

            </div>
        </div>
    );
}

export default Main;
