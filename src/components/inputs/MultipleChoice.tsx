import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

interface MultipleChoiceProps {
  name: string;
  label?: string;
  options: Array<{ label: string; value: string }>;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  label,
  name,
  options,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const indexInValue = field.value.indexOf(value);
    if (indexInValue > -1) {
      const newValue = [...field.value];
      newValue.splice(indexInValue, 1);
      helpers.setValue(newValue);
    } else {
      helpers.setValue([...field.value, value]);
    }
  };
  return (
    <FormControl component="fieldset">
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup>
        {options.map((o) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                value={o.value}
                name={o.value}
              />
            }
            label={o.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MultipleChoice;
