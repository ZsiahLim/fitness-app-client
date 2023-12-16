import EXERCISETYPE from '../EXERCISETYPE';
import { ICON } from './ICON';
import COLORS from '../COLORS';
import { exerciseLogo } from './ExerciseLogo';
import { FolderOpenOutlined, StarOutlined } from '@ant-design/icons';
const TutorialsInLibrary = [
    {
        name: 'All',
        value: "all",
        icon: <FolderOpenOutlined style={{ fontSize: 30, color: COLORS.white }} />
    },
    {
        name: 'Star',
        value: "recommand",
        icon: <StarOutlined style={{ fontSize: 30, color: COLORS.white }} />
    },
    {
        name: 'Rope',
        value: EXERCISETYPE.rope.value,
        icon: exerciseLogo.rope(30)
    },
    {
        name: 'Yoga',
        value: EXERCISETYPE.yoga.value,
        icon: exerciseLogo.yoga(30)
    },
    {
        name: 'Cycling',
        value: EXERCISETYPE.spinning.value,
        icon: exerciseLogo.cycling(30)
    },
    {
        name: 'Burning',
        value: EXERCISETYPE.burning.value,
        icon: exerciseLogo.lose(24)
    },
    {
        name: 'Strength',
        value: EXERCISETYPE.strength.value,
        icon: exerciseLogo.strength(30)
    },
    {
        name: 'Stretch',
        value: EXERCISETYPE.warmup.value,
        icon: exerciseLogo.warmup(24)
    },
    {
        name: 'Relax',
        value: EXERCISETYPE.cooldown.value,
        icon: exerciseLogo.cooldown(24)
    },

]
export default TutorialsInLibrary