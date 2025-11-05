
import Toggle from '../toggles.jsx';
import ImageUpload from '../imageUpload.jsx'
import {useForm} from '../context/FormContext.jsx'

export default function ShareSettings() {
    const {formData} = useForm();

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

const Images = () => (
    <div className='imgPreview'>
    {formData.projectImages.map((url, i)=>(
        <li key={i}>
            <img src={url} height="50px" width="100px"></img>
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