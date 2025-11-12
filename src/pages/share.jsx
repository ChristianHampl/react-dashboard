import { useState, useRef, useEffect } from 'react';
import {useForm} from '../context/FormContext'
import {Instagram, Github, Linkedin, ArrowDownToLine, SendHorizontal, ChevronsLeftRight, ChevronRight, ChevronLeft} from 'lucide-react'

export default function Share() {
    const { formData } = useForm();
    const [sliderCount, setSliderCount] = useState(0);
    const [imgSliderCounts, setImgSliderCounts] = useState({});
    
    // Refs für Scroll-Container, um Scroll-Position zu speichern
    const repoContainerRef = useRef(null);
    const projectsContainerRef = useRef(null);

    function handleSlider(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Scroll-Position speichern
        const scrollTop = repoContainerRef.current?.scrollTop || 0;
        
        setSliderCount(prev => (prev + 1) % formData.repos.length);
        
        // Scroll-Position nach State-Update wiederherstellen
        setTimeout(() => {
            if (repoContainerRef.current) {
                repoContainerRef.current.scrollTop = scrollTop;
            }
        }, 0);
    }

    const ReposSlider = ()=> {
        const slideritem = formData.repos.filter((_,i)=>sliderCount===i)

        if (!formData.showRepos) return; 

        if (!formData.repos?.length) return (
            <div className='projectRepos'>
                    <div className='gitLogo'>
                    <Github size={100}/> 
                    <h2>Repos</h2> 
                    </div>
                    <div className='repoContainer' ref={repoContainerRef}>
                        <div className='repoItem'>
                        <p>No Github Profile connected.</p>
                        </div>
                    </div>
            </div>
        )
        else 
        return (
            <>
                {slideritem.map((item)=>(
                    <div key={`repo-${item.name}`} className='projectRepos'>
                    <div className='gitLogo'>
                    <Github size={100}/> 
                    <h2>Repos</h2> 
                    </div>
                    <div className='repoContainer' ref={repoContainerRef}>
                        <div className='repoItem' key={`id-${item.name}`}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <p>{item.name}</p>
                        </a>
                        <p>{item.description}</p>
                        </div>
                    </div>
                    <div className='repoNextButton' onClick={handleSlider}><ChevronsLeftRight className='nextSliderIcon' size={30}/></div>
                    </div>
                ))}
                </>
        )
    }

function handleImgSlider(projectIndex, field, direction, e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Scroll-Position speichern
    const scrollTop = projectsContainerRef.current?.scrollTop || 0;
    
    setImgSliderCounts(prev => {
        const screenshots = formData[field] || [];
        const total = screenshots.length;
        if (total === 0) return prev;

        const currentCount = prev[projectIndex] || 0;

        let newCount;
        if (direction === "next") {
            newCount = (currentCount + 1) % total;
        } else if (direction === "prev") {
            newCount = (currentCount - 1 + total) % total; 
        } else {
            return prev;
        }

        return {
            ...prev,
            [projectIndex]: newCount
        };
    });
    
    // Scroll-Position nach State-Update wiederherstellen
    setTimeout(() => {
        if (projectsContainerRef.current) {
            projectsContainerRef.current.scrollTop = scrollTop;
        }
    }, 0);
}


const ProjectScreenshots = ({field, projectIndex}) => {
    const screenshots = formData[field] || [];
    const currentCount = imgSliderCounts[projectIndex] || 0;
    const screenshot = screenshots.filter((_,i)=>currentCount===i)

    if (!screenshots.length) {
        return <div style={{width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)'}}></div>;
    }

    return (
        <div>
            {screenshot.map((img, i) => (
                <img key={`${field}-${currentCount}-${i}`} src={img.url} alt="" />
            ))}
        </div>
    )
}

const Projects = () => {
    return (
        <div className='projectProjectsContainer' ref={projectsContainerRef}>
        {formData.projects.map((project, i)=> {
            const isEven = i % 2 === 0;
            // WICHTIG: screenshots${i} statt screenshots${i+1} (0-basiert!)
            const screenshotField = `screenshots${i}`;
            
            return (
            <div key={`project${i}`} className={isEven ? "projectProjectsLeft" : "projectProjectsRight"}>
                <div className='projectScreenshots'>
                    <ProjectScreenshots field={screenshotField} projectIndex={i}/>
                    <div 
                        className='screenshotNext' 
                        onClick={(e)=>handleImgSlider(i, screenshotField, "next", e)}
                        onMouseDown={(e) => e.preventDefault()}
                    ><ChevronRight className='nextSliderIcon' size={30}/></div>
                    <div 
                        className='screenshotPrev' 
                        onClick={(e)=>handleImgSlider(i, screenshotField, "prev", e)}
                        onMouseDown={(e) => e.preventDefault()}
                    ><ChevronLeft className='nextSliderIcon' size={30} /></div>
                </div>
                <div className='projectData'>
                    <h2>{project.name}</h2>
                    <p>{project.desc}</p>
                </div>
            </div>
        )}
        )}
        </div>
    )
}

    return(
    <>
        <div className='pageContainer'>
        <div className='pageTitle'><h1>Profile</h1></div>
        <div className='projectContainer'>                
                <ReposSlider />
                <Projects />
        </div>
        </div>
        </>
    )
}