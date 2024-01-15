import useUserTheme from "../../hooks/useUserTheme"
import ContactDetail from "../chatPage/pages/contactPage/contactDetail"

export default function SpecificUserPage() {
    const currentTheme = useUserTheme()
    const lightTutorialPageClassname = currentTheme === 'light' ? 'tutorialPage-light' : ''
    return (
        <div className={`tutorialPage ${lightTutorialPageClassname}`}>
            <ContactDetail />
        </div>
    )
}
