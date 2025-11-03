import { useForm } from '../context/FormContext.jsx';
import { useState } from 'react';

export default function AnalyticsSettings() {
  const { formData, updateRatings } = useForm();

  const RatingItem = ({ field, array, name, i }) => {
    const value = formData[field]?.[name] || 0;
    const [hoverValue, setHoverValue] = useState(null);

    const handleMouseEnter = (num) => setHoverValue(num);
    const handleMouseLeave = () => setHoverValue(null);

    return (
      <div key={`${array}-${i}`} className="ratingItem">
        <li>{name}</li>
        <div className="rangeContainer">
          {[1, 2, 3, 4, 5].map((num) => {
            let classes = '';
            if (num === 1) classes += ' rangeBoxStart';
            if (num === 5) classes += ' rangeBoxEnd';

            // Aktiv
            if (num <= value) classes += array === 'languages' ? ' activeLang' : ' activeFrame';

            if (hoverValue !== null) {
              // Hover über Wert
              if (hoverValue > value && num > value && num <= hoverValue)
                classes += array === 'languages' ? ' hoverUpLang' : ' hoverUpFrame';
              // Hover unter Wert
              if (hoverValue < value && num > hoverValue && num <= value)
                classes += array === 'languages' ? ' hoverDownLang' : ' hoverDownFrame';
            }

            return (
              <div
                key={num}
                className={`rangeBox${classes}`}
                onClick={() => updateRatings(field, array, i, num)}
                onMouseEnter={() => handleMouseEnter(num)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const RatingList = ({ field, array }) => {
    if (!Array.isArray(formData[array]) || formData[array].length === 0) {
      return <div><h2>{`Keine ${field} ausgewählt.`}</h2></div>;
    }

    return (
      <div className="ratingContainer">
        <ul>
          {formData[array].map((name, i) => (
            <RatingItem key={i} field={field} array={array} name={name} i={i} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="ratingoverhead">
      <RatingList field="langRatings" array="languages" />
      <RatingList field="frameRatings" array="frameworks" />
    </div>
  );
}
