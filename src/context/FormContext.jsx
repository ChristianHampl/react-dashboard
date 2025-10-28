import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: 'Christian',
    lastName: '',
    email: '',
    languages: [],
    showCard1: true,
    showCard2: true,
    showCard3: true,
  });

  function updateField(name, value) {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function updateArrayField(field, value, checked) {
  setFormData(prev => ({
    ...prev,
    [field]: checked
      ? [...prev[field], value]
      : prev[field].filter(item => item !== value),
  }));
}

function updateToggle(field) {
  setFormData(prev => ({
    ...prev, 
    [field]:!prev[field]
  }))
}


  return (
    <FormContext.Provider value={{ formData, updateField, updateArrayField, updateToggle }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
