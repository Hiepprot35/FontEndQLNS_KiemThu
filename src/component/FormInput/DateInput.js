import { useState, useEffect } from "react";
import "./formInput.css";
import { isValid, parse } from 'date-fns';
import DateExist from "../../function/DateExist";
import validatorFunction from "../../function/validator";
const DateInput = (props) => {

    const [focused, setFocused] = useState(false);
    const [test, setTest] = useState(null)
    const { label, errorMessage, onChange, id, placeholder, value, ...inputProps } = props;
    const dateParts = value.split("/");

    const [date, setDateValue] = useState(value?`${dateParts[2]}`:"")
    const [month, setMonthValue] = useState(value?`${dateParts[1]}`:"")
    const [year, setYearValue] = useState(value?`${dateParts[0]}`:"")
    const [dateTime, setDateTime] = useState()
    const handleFocus = (e) => {
        setFocused(true);
    };
    const ngay = "Ngày";
    const thang = "Tháng";
    const nam = "Năm"

    function isDateValid(data, bien1, bien2, bien) {
        if (focused) {
            if (data) {
                if (bien == "Ngày") {
                    if (!validatorFunction.isDay(data)) {
                        if (!validatorFunction.isNumeric(data)
                        ) {
                            return `${bien} chứa kí tự không hợp lệ. Kí tự phải là số`
                        }
                        return `${bien} không hợp lệ. Lớn hơn ${bien1} và nhỏ hơn ${bien2}`;
                    }
                }
                else if (bien == "Tháng") {
                    if (!validatorFunction.isMonth(data)) {

                        if (!validatorFunction.isNumeric(data)
                        ) {

                            return `${bien} chứa kí tự không hợp lệ. Kí tự phải là số`
                        }
                        return `${bien} không hợp lệ. Lớn hơn ${bien1} và nhỏ hơn ${bien2}`;   }  }
                else if (bien == "Năm") {
                    if (!validatorFunction.isYear(data)) {

                        if (!validatorFunction.isNumeric(data)
                        ) {
                            return `${bien} chứa kí tự không hợp lệ. Kí tự phải là số`
                        }
                        return `${bien} không hợp lệ. Lớn hơn ${bien1} và nhỏ hơn ${bien2}`;    }   }  }
            else {

                return `${bien} không được phép rỗng`
            }
        }
        return null;
    }
    useEffect(() => {
        validatorFunction.isYear(year) &&
            validatorFunction.isMonth(month) &&
            validatorFunction.isDay(date) &&

            setDateTime({ [inputProps.name]: `${year}/${month}/${date}` })
    },
        [date, month, year])
    useEffect(() => {
        if (dateTime) {
            if (DateExist(dateTime).length == 0) {

                inputProps.setDate(dateTime)
                setTest()
            }

            setTest("Ngày tháng năm không tồn tại")
        }

    }, [dateTime])

    return (
        <div className="formInput">
            <label>{label}</label>
            <div className="dateInput">

                <input
                    className={!isDateValid(date, 1, 31, ngay, 1) ? "TEXTDATE date1" : "TEXTDATE date1 dataInvalid"}
                    onChange={(e) => { setDateValue(e.target.value) }}
                    onBlur={handleFocus}
                    pattern="^(0?[1-9]|1\d|2\d|3[0-1])$"
                    value={date}

                    focused={focused.toString()}
                    placeholder="Ngày"
                    required
                />
                <input
                    className={!isDateValid(month, 1, 12, thang, 2) ? "TEXTDATE date1" : "TEXTDATE date1 dataInvalid"}
                    onChange={(e) => { setMonthValue(e.target.value) }}
                    onBlur={handleFocus}
                    pattern="^(0?[1-9]|1[0-2])$"

                    value={month}

                    focused={focused.toString()}
                    placeholder="Tháng"
                    required
                />
                <input
                    className={!isDateValid(year, 1000, 9999, nam, 3) ? "TEXTDATE date1" : "TEXTDATE date1 dataInvalid"}
                    onChange={(e) => { setYearValue(e.target.value) }}
                    onBlur={handleFocus}
                    value={year}
                    focused={focused.toString()}
                    placeholder="Năm"
                    required
                />
            </div>

            <span className={isDateValid(date, 1, 31, ngay, 1) ? "Invalid" : ""}>{isDateValid(date, 1, 31, ngay)}</span>
            <span className={isDateValid(month, 1, 12, thang, 2) ? "Invalid" : ""}>{isDateValid(month, 1, 12, thang)}</span>
            <span className={isDateValid(year, 1000, 9999, nam, 3) ? "Invalid" : ""}>{isDateValid(year, 1000, 9999, nam)}</span>
            <span className={DateExist(dateTime) ? "Invalid" : ""}>{DateExist(dateTime)}</span>

        </div>
    );
};

export default DateInput;