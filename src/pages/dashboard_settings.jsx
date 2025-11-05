import {useForm} from '../context/FormContext.jsx'
import Toggle from '../toggles.jsx'



export default function DashboardSettings() {

     const {formData, updateField} = useForm();

    return (
        <div>

        <div className='dashTogglesContainer'>
            <div className='togglesItems'>
                <h2>{formData.showCard1 ? "Card 1 ausblenden" : "Card 1 einblenden"}</h2>
                <Toggle field="showCard1" />
            </div>
            <div className='togglesItems'>
                <h2>{formData.showCard2 ? "Card 2 ausblenden" : "Card 2 einblenden"}</h2>
                <Toggle field="showCard2" />
            </div>
            <div className='togglesItems'>
                <h2>{formData.showCard3 ? "Card 3 ausblenden" : "Card 3 einblenden"}</h2>
                <Toggle field="showCard3" />
            </div>
        </div>
        
        </div>
    );
}