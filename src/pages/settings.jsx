import {useForm} from '../context/FormContext';
import {Instagram, Github, Linkedin, ArrowDownToLine, SendHorizontal} from 'lucide-react'
import { languageIcons, frameworkIcons }  from '../assets/icons/language_icons.jsx'

export default function Settings() {
    const {formData, handleFetchGitHubData} = useForm(); 

const StackIcons = ({field, values}) => {
    const IconMapping = field === "languages" ? languageIcons : frameworkIcons;

    if (!values?.length) return null;

    return (
    <>
        {values?.map((value, i) => {
            const Icon = IconMapping[value]
            if (!Icon) return null;
            return(
            <Icon key={value} size={40} title={value}/>
            )
        })
        }
    </>
    )
}

function IconLink({ Icon, href, size = 40 }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="socialButton"
    >
      <Icon size={size} />
    </a>
  );
}

const teaser = `
#RoadToFullStack learner ${formData.firstName} ${formData.lastName} from ${formData.city}, ${formData.country} with a media background. 
Currently deepening my skills in JavaScript and React, fluent in ${formData.language}, and enjoying every line of code that makes me better.
`;

const paragraph = `
I built this dynamic portfolio dashboard to showcase my projects, design skills, and progress on my #RoadToFullStack journey. 
Feel free to explore my work, download my CV, or just send me a message — I love connecting with fellow developers and learning new things along the way!
`;



    return(
        <>
        <div className='pageContainer'>
        <div className='pageTitle'><h1>Profile</h1></div>
        <div className='profileContainer'>
            <div className='profileItemCV'>
                <p>{teaser}</p>
                <p>{paragraph}</p>
                <div className='profileItemExtras'>
                    <a href={`mailto:${formData.email}?subject=Send%20from%20Dashboard`} rel="noopener noreferrer"><div><SendHorizontal /> Mail</div></a>
                    <a href="/christian_hampl_cv.pdf" target='_blank' rel="noopener noreferrer"><div><ArrowDownToLine />CV</div></a>
                </div>
            </div>
            <div className='profileItemData'>
                <div className='profileImg'>
                <div className='profileSocials'>
                    <IconLink Icon={Instagram} href={formData.instagram}/>
                    <IconLink Icon={Github} href={formData.gitHubUrl} />
                    <IconLink Icon={Linkedin} href={formData.linkedin} />
                </div>
                    <div className='profileImgWrapper'>
                    <img src={formData.profileImg.url} alt="" />
                    </div>
                </div>
                <div className='profileStack'>
                    <div className='profileStackLang'>
                    <StackIcons field="languages" values={formData.languages}/>
                    </div>
                    <div className='profileStackFrame'>
                    <StackIcons field="frameworks" values={formData.frameworks}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>

    )
}