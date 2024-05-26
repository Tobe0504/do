import { Dispatch, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import classes from "./Input.module.css";
import "react-quill/dist/quill.snow.css";

type InputProps = {
  type?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange2?: any;
  onBlur?: () => void;
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  inValidCondition?: boolean;
  placeholder?: string;
  tip?: string;
  style?: React.CSSProperties;
  name?: string;
  condition?: boolean;
  readOnly?: boolean;
  state?: string;
  setState?: Dispatch<SetStateAction<string>>;
  onKeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  min?: any;
  max?: any;
};

const Input = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  isRequired,
  errorMessage,
  inValidCondition,
  placeholder,
  tip,
  style,
  name,
  condition,
  readOnly,
  onKeyup,
  onFocus,
  min,
  max,
}: InputProps) => {
  // States
  const [invalid, setInvalid] = useState(false);
  const [passwordIsViewable, setpasswordisViewable] = useState(false);

  return (
    <div className={classes.container} style={style}>
      {label && (
        <>
          <label htmlFor="">{label}</label>
          {"  "}
          {isRequired && <span>*</span>}
        </>
      )}
      <span className={classes.input}>
        <input
          type={
            type === "password" && passwordIsViewable
              ? "text"
              : type === "password" && !passwordIsViewable
              ? "password"
              : type
              ? type
              : "text"
          }
          name={name}
          placeholder={placeholder}
          id={label}
          onChange={onChange}
          readOnly={readOnly}
          onBlur={(e) => {
            if (isRequired && e.target.value === "") {
              setInvalid(true);
            } else {
              setInvalid(false);
            }

            if (condition !== undefined && condition === false) {
              setInvalid(true);
            }
            if (onBlur) onBlur();
          }}
          onFocus={(e) => {
            if (onFocus) {
              onFocus();
            }
          }}
          value={value}
          className={invalid ? classes.invalid : classes.valid}
          onKeyUp={onKeyup}
          min={min}
          max={max}
        />
      </span>
      {(invalid || inValidCondition) && (
        <span className={classes.errorMessage}>
          {errorMessage || "*invalid"}{" "}
        </span>
      )}
      {tip && <span className={classes.tip}>{tip}</span>}
    </div>
  );
};

export const ReactQuillInput = ({
  label,
  isRequired,
  placeholder,
  tip,
  style,
  setState,
  state,
}: InputProps) => {
  // States

  const [text, setText] = useState("");

  const handleChange = (html: string) => {
    if (setState) setState(html);
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];
  return (
    <div className={classes.container} style={style}>
      {label && (
        <>
          <label htmlFor="">{label}</label>
          {"  "}
          {isRequired && <span>*</span>}
        </>
      )}
      <span className={classes.input}>
        <ReactQuill
          theme="snow"
          placeholder={placeholder}
          id={label}
          onChange={handleChange}
          formats={formats}
          className={classes.quill}
          value={state}
        />
      </span>

      {tip && <span className={classes.tip}>{tip}</span>}
    </div>
  );
};

export default Input;
