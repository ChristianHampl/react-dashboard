import Input from '../inputs.jsx'
import Checklist from '../cecklists.jsx';
import { languages, frameworks } from '../assets/icons/language_icons.jsx';
import { BsGithub } from 'react-icons/bs';



export default function ProfileSettings() {

    return (
        <>
        <div className='inputContainer'>
        <Input field="firstName" type="text" text="Name"/>
        <Input field="email" type="text" text="E-Mail" />
        <Input field="gitHubUmairl" type="text" text={<BsGithub size={24}/>} />
        </div>
        <div className='checklistContainer'>
            <div className='checklistItem'>
                <h2>Languages</h2>
                <Checklist field="languages" values={languages}/>
            </div>
            <div className='checklistItem'>
                <h2>Frameworks</h2>
                <Checklist field="frameworks" values={frameworks}/>
            </div>
                        <div className='checklistItem'>
                <h2>Frameworks</h2>
                <Checklist field="frameworks" values={frameworks}/>
            </div>
        </div>
        </>
    );
}