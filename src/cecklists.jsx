import { useForm } from './context/FormContext.jsx';
import { languageIcons, frameworkIcons }  from './assets/icons/language_icons.jsx'


export default function Checklist({ field, values }) {
  const { formData, updateArrayField } = useForm();
  const IconMapping = field === "languages" ? languageIcons : frameworkIcons;
  let currentArray = [];

  return (
    <ul className='checklist'>
      {values.map((value, index) => {
        const Icon = IconMapping[value];
        const isChecked = formData[field]?.includes(value);

        const DynamicLabel = () => {
            if (field === "languages")
                return (
                    <label htmlFor={`${field}-${index}`}>{Icon && <Icon title={value} className={`icon ${isChecked ? 'activeL' : ''}`} size={34}/>}</label>
            )

            if (field === "frameworks")
                return (
                    <label htmlFor={`${field}-${index}`}>{Icon && <Icon title={value} className={`icon ${isChecked ? 'activeF' : ''}`} size={34}/>}</label>
            )
        }

          function handleLimit(e) {
            if (formData[field].length <=4 ) // Limit: 5
            updateArrayField(field, value, e.target.checked)
            else {currentArray=formData[field]; console.log(currentArray)
            }
            if (currentArray.includes(value)) {updateArrayField(field, value, e.target.checked)}
          }

        return (
          <li key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${field}-${index}`}
              value={value}
              checked={isChecked}
              hidden
              onChange={(e)=> {handleLimit(e)}}
            />
            <DynamicLabel/>
          </li>
        );
      })}
    </ul>
  );
}
