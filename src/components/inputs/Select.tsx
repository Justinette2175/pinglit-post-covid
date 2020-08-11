import * as React from "react";
import {
  Select as MuiSelect,
  SelectProps,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  ListItemIcon,
  Chip,
  Typography,
} from "@material-ui/core";
import { Plus, X } from "react-feather";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: { margin: "2px" },
  chips: { minHeight: "36px", display: "flex", flexWrap: "wrap" },
}));

export interface SelectPropsCustom extends SelectProps {
  options: Array<{ label: string; value: string | number }>;
  helperText?: string;
  labelKey?: string;
  margin?: "none" | "dense";
}

const Select: React.FC<SelectPropsCustom> = ({
  options,
  label,
  helperText,
  required,
  disabled,
  fullWidth,
  multiple,
  name,
  onChange,
  error: propsError,
  margin,
  ...rest
}) => {
  const classes = useStyles();

  const [field, meta, helpers] = useField(name);
  const value = field.value;

  const makeOptions = () =>
    options
      ? options.map(({ label: l, value: v }, i) => {
          const isSelected = multiple && value.indexOf(v) > -1;
          return (
            <MenuItem key={`option-${i}`} value={v}>
              {multiple ? (
                <>
                  <ListItemIcon>{isSelected ? <X /> : <Plus />}</ListItemIcon>
                  <Typography variant="inherit">{l}</Typography>
                </>
              ) : (
                l
              )}
            </MenuItem>
          );
        })
      : null;

  const makeChips = () => (
    <div className={classes.chips}>
      {value && Array.isArray(value)
        ? value.map((v: any, i: number) => {
            const selectedOption = options.find((opt) => opt.value === v);
            const l = selectedOption ? selectedOption.label : "";
            if (l && typeof l === "string") {
              return (
                <Chip key={`${l}-${i}`} label={l} className={classes.chip} />
              );
            }
            return <div />;
          })
        : []}
    </div>
  );

  const handleBlur = () => {
    if (!meta.touched) {
      helpers.setTouched(true);
    }
  };

  return (
    <FormControl
      error={(meta.touched && !!meta.error) || propsError}
      disabled={disabled}
      fullWidth={fullWidth}
      required={required}
      margin={"none"}
    >
      {label && (
        <InputLabel id={name} shrink>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        labelId={field.name}
        displayEmpty
        value={value || (multiple ? [] : "")}
        multiple={multiple}
        renderValue={multiple ? makeChips : null}
        onChange={onChange || field.onChange}
        onBlur={handleBlur}
        inputProps={{ name: field.name, id: field.name }}
        {...rest}
      >
        {makeOptions()}
      </MuiSelect>
      <FormHelperText>
        {(meta.touched && meta.error) || helperText || ""}
      </FormHelperText>
    </FormControl>
  );
};

export { Select };
