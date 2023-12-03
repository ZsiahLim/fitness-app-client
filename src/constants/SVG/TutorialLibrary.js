import EXERCISETYPE from '../EXERCISETYPE';
import { ICON } from './ICON';
import COLORS from '../COLORS';
import { exerciseLogo } from './ExerciseLogo';
const TutorialsInLibrary = [
    {
        name: 'All',
        value: "all",
        icon: ICON.all(30, COLORS.white)
    },
    {
        name: 'Star',
        value: "recommand",
        icon: ICON.personalize(30, COLORS.white)
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