import {useForm} from './context/FormContext.jsx'

export default function Input({ field, type = 'text', text, onBlur }) {
  const { formData, updateField } = useForm();

  return (
    <div className='inputItem'>
      <input
        type={type}
        className={`input-${type}` }
        id={field}
        value={formData[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        onBlur={onBlur}
      />
      <label
        className={`label-${type}`}
        htmlFor={field}
        style={{
          transform: (formData[field] || '').trim() === '' ? 'translateY(0)' : 'translateY(-30px)'
        }}
      >
        {text}
      </label>
    </div>
  );
}
