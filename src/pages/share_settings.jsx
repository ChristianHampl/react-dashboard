
import Toggle from '../toggles.jsx';
import ImageUpload from '../imageUpload.jsx'
import {useForm} from '../context/FormContext.jsx'
import {useMemo, useState} from 'react'

export default function ShareSettings() {
    const {formData, handleImageHref} = useForm();
    const [showPopup, setShowPopup] = useState(null);

const Repos = () => {
    if (!formData.showRepos) return; 
    else return (
        <>
        <div>
            <ul>
                {formData.repos.map((repo, i)=>(
                    <li key={i}>
                        <a href={repo.url}>
                            <p>{repo.name}</p>
                        </a>
                        <p>{repo.description}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

function handlePopupDisplay(i) {
    setShowPopup(prev => (prev===i ? null : i ));
}

const ImagePopup = ({i, value}) => {
    const [localValue, setLocalValue] = useState(value || "https://");

    const isOpen = showPopup === i;

    function handleBlur() {
    handleImageHref("projectImages", localValue, i);
    }

    if (isOpen) return (
        <>
        <div className='popupContainer'>
             <div className='popupButtonClose' onClick={() => handlePopupDisplay(i)}></div>
             <input type="text" placeholder="https://" value={localValue} onChange={(e) => setLocalValue(e.target.value)}
             onBlur={handleBlur}></input>

        </div>
        </>
    ) 
    else return
}

const Images = () => (
    <div className='imgPreview'>
    {formData.projectImages.map((img, i)=>(
        <li key={img.id}>
            <img src={img.url} height="50px" width="100px" onClick={() => handlePopupDisplay(i)}></img>
            <ImagePopup i={i} value={img.link}/>
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
       

        <div className='imgContainer'>
            <ImageUpload field="projectImages"/>
            <Images />
        </div>
         </div>

        <Repos />
        </>
    );
}