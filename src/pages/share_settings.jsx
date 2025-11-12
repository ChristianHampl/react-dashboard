
import Toggle from '../toggles.jsx';
import ImageUpload from '../imageUpload.jsx'
import {useForm} from '../context/FormContext.jsx'
import {useMemo, useState} from 'react'
import {Pen, Trash} from 'lucide-react'

export default function ShareSettings() {
    const {formData, handleImageData, handleProjects, resetProjectsAndScreenshots, deleteScreenshot} = useForm();
    const [showPopup, setShowPopup] = useState(null);

function handlePopupDisplay(i) {
    setShowPopup(prev => (prev===i ? null : i ));
}

const PopupName = ({name, isEdit, onEdit, onChange, onBlur, isSaved}) => {
        if (!isEdit) return (<><h2 onClick={onEdit}>{name || "Title"}</h2></>); 
        return (<>
        <Pen className='editIcon' color={isSaved? "#ededed" : "#00ff8cff"}/> 
        <input className='popupEditName' type="text" maxlength="20" placeholder='Title' value={name} onChange={onChange} onBlur={onBlur} /> 
        </>)
    }

const ProjectImages = ({i})=>{

    const fieldName = `screenshots${i}`;

    if (!formData[fieldName] || formData[fieldName].length === 0) 
        return (
            <>
             <div className='previewContainer'>
            <ImageUpload field={fieldName}/>
            <p>No Screenshots uploaded yet.</p>
            </div>
            </>
        )

    if (formData[fieldName]?.length >= 3) {
        return (
            <>
            <div className='previewContainer'>
            {formData[fieldName]?.map((img, i)=>{
                return <div className='screenshot' onClick={()=>deleteScreenshot(fieldName, i)}><img key={`screenshot-${i}`} src={img.url} width={100}></img></div>
            })}
            </div>
            </>
        )
    } else 
    return (
        <>
        <div className='previewContainer'>
            <ImageUpload field={fieldName}/>
            {formData[fieldName]?.map((img, i)=>{
               return <div className='screenshot' onClick={()=>deleteScreenshot(fieldName, i)}><img key={`screenshot-${i}`} src={img.url} width={100}></img></div>
            })}
        </div>
        </>
    )
}

const ImagePopup = ({i, value, description, name}) => {
    const [localValue, setLocalValue] = useState(value || "https://");
    const [localDesc, setLocalDesc] = useState(description || "");
    const [localName, setLocalName] = useState(name || "");
    const [isEdit, setIsEdit] = useState(false);
    const [isSaved, setIsSaved] = useState(false); 

    const isOpen = showPopup === i;

    function handleChange(e) {
        setLocalName(e.target.value); 
        setIsSaved(true);
        setTimeout(()=>{
            setIsSaved(false)
        },1000)
    }

    function handleBlur() {
    handleImageData("projects", localValue, localDesc, localName, i);
    }

    // function handlePopupCover(i) {

    //     const popupCover = formData.projectImages[i].url
        
    //     return {
    //         backgroundImage: `url(${popupCover})`,
    //         backgroundSize: 'cover',
    //         backgroundPosition: 'center',
    //     };
    // }

    if (isOpen) return (
        <>
        <div className='popupOvelay'></div>
        <div className='popupContainer'>
            <div className='popupHeader'>
            <div className='popupName'>
            <PopupName
            name={localName}
            isEdit={isEdit}
            onEdit={()=>setIsEdit(true)}
            onChange={handleChange}
            onBlur={handleBlur}
            isSaved={isSaved}
            />
            </div>
             <div className='popupButtonClose' onClick={() => handlePopupDisplay(i)}></div>
             </div>
             <div className='popupInputs'>
            <ProjectImages i={i} />
             <input type="text" placeholder="https://" value={localValue} onChange={(e) => setLocalValue(e.target.value)}
             onBlur={handleBlur}></input>
             </div>
             <textarea name="Description" id="projectDesc" placeholder='Description' value={localDesc} onChange={(e) => setLocalDesc(e.target.value)}
             onBlur={handleBlur}></textarea>

        </div>
        </>
    ) 
    else return
}

const Images = () => (
    <div className='imgPreview'>
    {formData.projectImages.map((img, i)=>(
        <li className='projectImgWrapper' key={img.id}>
            <img className='projectImg' src={img.url} width="300" onClick={() => handlePopupDisplay(i)}></img>
            <p className='projectTitle'>{img.name.toUpperCase()}</p>
            <ImagePopup i={i} value={img.link} description={img.desc} name={img.name}/>
        </li>
    ))} 
    </div>
)

const Projects = () => (
    <div className='projectPreview'>
    {formData.projects.map((project, i)=>(
        <li className='projectWrapper' key={project.id}>
            <div className="project" id={`project-${i}`} onClick={()=> handlePopupDisplay(i)}></div>
            <p className='projectTitle'>{project.name.toUpperCase()}</p>
            <ImagePopup i={i} value={project.link} description={project.desc} name={project.name}/>
        </li>
    ))} 
    </div>
)

    return (
        <>
        <div className='projectContainer'>
            <div className='togglesItems'>
                <h2>{formData.showRepos ? "Repos ausblenden" : "Repos einblenden"}</h2>
                <Toggle field="showRepos"/>
                
            </div>
       {/* <Repos /> */}

        <div className='projectPreviewContainer'>
            <Projects />
            <div className='projectsSettingContainer'>
            <div className='addProject' onClick={()=>handleProjects("projects")}></div>
            <div className='resetProject' title='reset all Projects' onClick={()=>resetProjectsAndScreenshots()}><Trash className="resetIcon" size={40}/></div>
            </div>

        </div>

         </div>

        </>
    );
}