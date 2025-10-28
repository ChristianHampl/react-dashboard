import Input from '../inputs.jsx'
import Checklist from '../cecklists.jsx';
import { languages, frameworks } from '../assets/icons/language_icons.jsx';



export default function ProfileSettings() {

    return (
        <>
        <Input field="firstName" type="text" text="Name"/>
        <div className='checklistContainer'>
            <div className='checklistItem'>
                <h2>Languages</h2>
                <Checklist field="languages" values={languages}/>
            </div>
            <div className='checklistItem'>
                <h2>Frameworks</h2>
                <Checklist field="frameworks" values={frameworks}/>
            </div>
        </div>
        </>
    );
}