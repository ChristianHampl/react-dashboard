import {useForm} from './context/FormContext'

export default function ImageUpload({field, cover}) {

    const {formData, handleImageUpload} = useForm(); 

    function handleCover() {
        if (!cover) return {};
        
        return {
            backgroundImage: `url(${cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };
    }

    if (field === "profileImg") return (
        <>
                <input type="file" id={`imgUpload-${field}`} accept="image/*" hidden onChange={(e)=>{handleImageUpload(field, e.target.files)}}></input>
                <label htmlFor={`imgUpload-${field}`} className='profileImgUpload' style={handleCover()}></label>
        </>
    )
    else
    return (
        <>
                <input type="file" id={`imgUpload-${field}`} className='imgUploadInput' accept="image/*" multiple hidden onChange={(e)=>{handleImageUpload(field, e.target.files)}}></input>
                <label htmlFor={`imgUpload-${field}`} className='imgUpload'></label>
        </>
    )




}