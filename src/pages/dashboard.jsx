import {useForm} from '../context/FormContext.jsx'

export default function Dashboard() {
    const {formData} = useForm();

    return(
        <h1>Willkommen {formData.firstName}</h1>
    )
}