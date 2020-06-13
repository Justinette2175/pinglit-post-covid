import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
import NumberFormat from "react-number-format";

const NumberFormatLocal = NumberFormat as any;

interface NumberInputProps {
  name: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  required?: boolean;
  format?: "natural";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
}

interface FormatProps {
  decimalScale?: number;
  allowNegative?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  format,
  startAdornment,
  endAdornment,
  defaultValue,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const [formattedValue, setFormattedValue] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue && formattedValue !== defaultValue) {
      setFormattedValue(defaultValue);
    }
  }, [defaultValue]);

  const getFormatProps = () => {
    const formatProps: FormatProps = {};
    switch (format) {
      case "natural":
        formatProps.allowNegative = false;
        formatProps.decimalScale = 1;
      default:
    }
    return formatProps;
  };

  const handleBlur = () => {
    if (!meta.touched) {
      helpers.setTouched(true);
    }
  };

  return (
    <NumberFormatLocal
      customInput={TextField}
      margin="normal"
      name={field.name}
      {...getFormatProps()}
      value={formattedValue}
      displayType="input"
      variant="filled"
      error={meta.touched && meta.error}
      helperText={(meta.touched && meta.error) || ""}
      allowLeadingZeros={false}
      InputProps={{ startAdornment, endAdornment }}
      InputLabelProps={{ shrink: true }}
      isNumericString
      onValueChange={(val: any) => {
        setFormattedValue(val.formattedValue);
        helpers.setValue(val.value);
      }}
      inputProps={{
        onBlur: handleBlur,
      }}
      {...rest}
    />
  );
};
