import Input from '../inputs.jsx';
import Checklist from '../cecklists.jsx';
import { languages, frameworks } from '../assets/icons/language_icons.jsx';
import { BsGithub } from 'react-icons/bs';
import { useForm } from '../context/FormContext.jsx';

export default function ProfileSettings() {
  const { formData, handleFetchGitHubData } = useForm();

  return (
    <>
      <div className='inputContainer'>
        <Input field="firstName" type="text" text="Name"/>
        <Input field="email" type="text" text="E-Mail" />

        {/* GitHub URL Input */}
        <Input  
          field="gitHubUrl"
          type="text"
          text={<BsGithub size={24} style={{color: formData.gitHubUsernameValid ? "#00ff8cff" : ""}}/>}
          onBlur={(e) => handleFetchGitHubData(e.target.value)} // API Aufruf beim Verlassen des Feldes
        />
        <p>{`${formData.gitHubUsernameValid ? "connected" : "not connected"}`}</p>
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
      </div>
    </>
  );
}
