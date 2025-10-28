import {useForm} from './context/FormContext.jsx'

export default function Toggle({field}) {
  const { formData, updateToggle } = useForm();
  const isActive = formData[field]

  return (
    <div>
            <div className={`button ${isActive ? 'active' : ''}`}>
                <div className={`toggle ${isActive ? 'active' : ''}`} onClick={()=>updateToggle(field)}></div>
            </div>
    </div>
  );
}

//style={{left: formData[field] ? "100%" : "0", transform: formData[field] ? "translateX(-100%)" : "translateX(0)"}}>
