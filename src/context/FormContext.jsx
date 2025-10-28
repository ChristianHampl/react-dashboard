import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: 'Christian',
    lastName: '',
    email: '',
    languages: [],
    frameworks: [],
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
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? prev[field] : [];

      return {
        ...prev,
        [field]: checked
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value),
      };
    });
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
