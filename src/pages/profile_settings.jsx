import Input from '../inputs.jsx';
import Checklist from '../cecklists.jsx';
import { languages, frameworks } from '../assets/icons/language_icons.jsx';
import { useForm } from '../context/FormContext.jsx';
import ImageUpload from '../imageUpload.jsx'
import {Instagram, Github, Linkedin} from 'lucide-react'

export default function ProfileSettings() {
  const { formData, handleFetchGitHubData } = useForm();

  return (
    <>
      <div className='inputContainer'>
        <ImageUpload field="profileImg" cover={formData.profileImg.url}/>
        <Input field="firstName" type="text" text="First Name"/>
        <Input field="lastName" type="text" text="Last Name"/>
        <Input field="email" type="text" text="E-Mail" />
        <Input field="country" type="text" text="Country" />
        <Input field="city" type="text" text="City" />
        <Input field="language" type="text" text="Language/s" />
      </div>

    <div className='checklistContainerWrapper'>
      <div className='checklistContainer'>
        <div className='checklistItem'>
          <h2>Languages</h2>
          <Checklist field="languages" values={languages}/>
        </div>
        <div className='checklistItem'>
          <h2>Frameworks</h2>
          <Checklist field="frameworks" values={frameworks}/>
        </div>
        {/* <div className='checklistItem'>
          <h2>Frameworks</h2>
          <Checklist field="databases" values={databases}/>
        </div> */}
      </div>
      <div className='inputContainerSocials'>
        
        {/* GitHub URL Input */}
        <div title={`${formData.gitHubUsernameValid ? "connected" : "not connected"}`}>
        <Input  
          field="gitHubUrl"
          type="text"
          text={<Github size={24} style={{color: formData.gitHubUsernameValid ? "#00ff8cff" : ""}}/>}
          onBlur={(e) => handleFetchGitHubData(e.target.value)} // API Aufruf beim Verlassen des Feldes
        /> </div>
        <Input field="instagram" type="text" text={<Instagram size={24}/>} />
        <Input field="linkedin" type="text" text={<Linkedin size={24}/>} />
      </div>
    </div>
    </>
  );
}
