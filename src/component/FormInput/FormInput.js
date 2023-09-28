import { useState, useEffect } from "react";
import "./formInput.css";
import validatorFunction from "../../function/validator";
const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [test, setTest] = useState()
  const { label, errorMessage, onChange, id, placeholder, value, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  useEffect(() => {
    if (value) {
      if (validatorFunction.isLength(value) && inputProps.length) {
        setTest("Độ dài không phù hợp")
      }
      else if (validatorFunction.isNumeric(value)) {
        setTest("Giá trị là số.");
      } else if (validatorFunction.containsSpecialCharacter(value)) {
        setTest("Giá trị chứa ký tự đặc biệt.");
      }
      else if (validatorFunction.isCharacter(value)) {

        if (inputProps.viethoa && !validatorFunction.isFirstLetterUpperCase(value)) {
          setTest("Viết hoa chữ đầu tiên")

        }
        else {

          setTest("Giá trị là chữ")
        }
      }
      else {
        setTest("Không hợp lệ yêu cầu nhập lại"); // Không có lỗi
      }
    }
    if(!value) {
      setTest("Không được phép để trống"); // Reset thông báo lỗi nếu giá trị rỗng
    }
  }, [value]);

  return (
    <div className="formInput">
      <label>{label}</label>
      <input

        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        // pattern={"^[A-Za-z]{3,16}$"}

        value={value}
        focused={focused.toString()}
        placeholder={placeholder}
      />
      <span className={inputProps.viethoa && !validatorFunction.isFirstLetterUpperCase(value) ? "Invalid" : ''}>{test}</span>
    </div>
  );
};

export default FormInput;