import { useState, useEffect } from "react";
import './formInput.css'
import validatorFunction from "../../function/validator";
export default function ClockInput(props) {
    const { label, errorMessage, onChange, id, placeholder, value, ...inputProps } = props;
    const [focused, setFocused] = useState(false);
    const [test, setTest] = useState()
    const [time, setTime] = useState({ Gio: "", Phut: "" })
    const gio = "Giờ";
    const phut = "Phút"
    const handleFocus = (e) => {
        setFocused(true);
    };
    function isDateValid(date, bien1, bien2, bien, check) {
        if (focused) {


            if (date) {

                if (check == 1) {

                    if (!validatorFunction.isHour(date)) {

                        if (!validatorFunction.isNumeric(date)
                        ) {
                            return `${bien} chứa kí tự không hợp lệ. Kí tự phải là số`

                        }

                        return `${bien} không hợp lệ. Lớn hơn ${bien1} và nhỏ hơn ${bien2}`;

                    }

                }
                else if (check == 2) {
                    if (!validatorFunction.isMinute(date)) {

                        if (!validatorFunction.isNumeric(date)
                        ) {
                            return `${bien} chứa kí tự không hợp lệ. Kí tự phải là số`

                        }
                        return `${bien} không hợp lệ. Lớn hơn ${bien1} và nhỏ hơn ${bien2}`;

                    }
                }

            }
            else {
                return `${bien} không được phép rỗng`
            }
        }
        return null;

    } useEffect(() => { inputProps.setTimeClock && inputProps.setTimeClock(`${time.Gio}:${time.Phut}`) }, [time])
    return (
        <div className="formInput">
            <label>{label}</label>
            <div className="dateInput">

                <input
                    style={{ width: "45%" }}
                    name="Gio"
                    placeholder="Giờ"
                    type="text"
                    onBlur={handleFocus}
                    required
                    pattern="^(0|1?[0-9]|2[0-3])$"
                    className={isDateValid(time.Gio, 0, 23, gio, 1) ? "dataInvalid" : ""}
                    onChange={(e) => { setTime({ ...time, Gio: e.target.value }) }}
                ></input>
                <input
                    style={{ width: "45%" }}
                    required
                    pattern="^([0-5]?[0-9])$"

                    name="Phut"
                    onChange={(e) => { setTime({ ...time, Phut: e.target.value }) }}
                    onBlur={handleFocus}
                    placeholder="Phút"
                    className={isDateValid(time.Phut, 0, 59, phut, 2) ? "dataInvalid" : ""}
                    type="text">
                </input>
            </div>
            <span className={isDateValid(time.Gio, 0, 23, gio, 1) ? "Invalid" : ""}>{isDateValid(time.Gio, 0, 23, gio, 1)}</span>
            <span className={isDateValid(time.Phut, 0, 59, phut, 2) ? "Invalid" : ""}>{isDateValid(time.Phut, 0, 59, phut, 2)}</span>
        </div>

    )

}