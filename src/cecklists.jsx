import { useForm } from './context/FormContext.jsx';
import { languageIcons, frameworkIcons }  from './assets/icons/language_icons.jsx'


export default function Checklist({ field, values }) {
  const { formData, updateArrayField } = useForm();
  const IconMapping = field === "languages" ? languageIcons : frameworkIcons;

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

        return (
          <li key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${field}-${index}`}
              value={value}
              checked={isChecked}
              hidden
              onChange={(e) =>
                updateArrayField(field, value, e.target.checked)
              }
            />
            <DynamicLabel/>
          </li>
        );
      })}
    </ul>
  );
}
