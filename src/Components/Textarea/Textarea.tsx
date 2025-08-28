import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import classes from "./Textarea.module.css";
import "react-quill/dist/quill.snow.css";
import Smiley from "../../Assets/Icons/Smiley";
import EmojiPicker, {
  EmojiClickData,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";

type InputProps = {
  type?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  onKeyup?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  min?: any;
  max?: any;
  emojiObject?: {
    setState: Dispatch<SetStateAction<{ [key: string]: string }>>;
    valueName: string;
    isSimple: boolean;
  };
};

const Textarea = ({
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
  emojiObject,
}: InputProps) => {
  // States
  const [invalid, setInvalid] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  // Ref
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Utils
  const handleEmojiSelect = (emojiData: EmojiClickData, event: MouseEvent) => {
    if (emojiObject) {
      emojiObject.setState((prevState: any) => {
        if (!emojiObject?.isSimple) {
          return {
            ...prevState,
            [emojiObject.valueName]: `${
              prevState[emojiObject.valueName] as any
            }${emojiData?.emoji}`,
          };
        } else {
          return `${prevState}${emojiData?.emoji}`;
        }
      });
    }
  };

  // Effects
  useEffect(() => {
    const handleEmojiContainerDisappear = (e: any) => {
      if (
        containerRef?.current &&
        !containerRef?.current?.contains(e?.target)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleEmojiContainerDisappear);

    return () => {
      document.removeEventListener("mousedown", handleEmojiContainerDisappear);
    };
  });

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
        <textarea
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
        />
        {emojiObject && (
          <Smiley onClick={() => setShowEmoji((prevState) => !prevState)} />
        )}
        {showEmoji && (
          <div className={classes.emojiPicker} ref={containerRef}>
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              height={500}
              width={400}
              theme={"dark" as Theme}
              suggestedEmojisMode={"recent" as SuggestionMode}
            />
          </div>
        )}
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

export default Textarea;
