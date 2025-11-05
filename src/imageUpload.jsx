import {useForm} from './context/FormContext'

export default function ImageUpload({field}) {

    const {formData, handleImageUpload} = useForm(); 

    return (

        <>
                <input type="file" id="imgUpload" accept="image/*" multiple hidden onChange={(e)=>{handleImageUpload(field, e.target.files)}}></input>
                <label htmlFor="imgUpload" className='imgUpload'></label>
        </>
    )




}