import FormInput from "../FormInput/FormInput"
import { useEffect, useRef, useState } from "react";
import validator from 'validator';
import { ConfirmDialog } from "../confirmComponent/confirm";
import { inputs2 } from '../../data/data'
import DateInput from "../FormInput/DateInput";
import { ResizeImg } from "../../function/ResizeImg";
import DateExist from "../../function/DateExist";
import validatorFunction from "../../function/validator";
import blobToBuffer from "../../function/BlobtoBuffer";
export default function DanhGiaNhanVien() {
    document.title = "Create User"
    const [messRes, setMesRes] = useState("");
    const [focusedNoiDung, setFocusedNoiDung] = useState(false)

    const [values, setValues] = useState({
        HoVaTen: "Đoàn Văn A",
        MaNhanVien: "",
        NgayQuyetDinh: "",
        PhanLoai: "",
        NoiDung: ""

    });
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const setDate = (dateTime) => {
        console.log(dateTime)
        setValues({ ...values, [Object.keys(dateTime)]: Object.values(dateTime)[0] });
    }
    const createStudent = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/themdanhgia`
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)

            })
            if (res.status === 200) {

                const data = await res.json();
                setMesRes(data.message)
                setComfirm(false)

            }
        } catch (error) {
            console.log(error)
        }

    }
    const [getConFirmSubmit, setConFirmSubmit] = useState(false)
    const [getConfirm, setComfirm] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault();
        setComfirm(true)
    }
    useEffect(() => {
        getConFirmSubmit && createStudent()

    }, [getConFirmSubmit])
    const confirmSubmit = (e) => {
        e.preventDefault()
        setConFirmSubmit(!getConFirmSubmit)
    }
    const onCancel = () => {
        setComfirm(false)
    }
    useEffect(() => {
        messRes && setTimeout(() => {
            setMesRes(null)
        }, 1000)
    }, [messRes])
    return (
        <div>

            <form onSubmit={(e) => onSubmit(e)} >
                <div className="container create_container" >

                    <div className="inputForm row1">
                        {inputs2.map((input, index) => (
                            index < 3 ?
                                (input.inputcac == "date" ?
                                    <DateInput
                                        key={input.id}
                                        {...input}
                                        value={values[input.name]}
                                        setDate={setDate}
                                    ></DateInput> :
                                    < FormInput
                                        key={input.id}
                                        {...input}
                                        value={values[input.name]}
                                        onChange={onChange}
                                    />
                                )
                                : (
                                    index == 3 ? <div>
                                        <label htmlFor={input.name}>{input.label}:</label>
                                        <select
                                            style={{ margin: "40px" }}
                                            className="select" name={input.name} onChange={(e) => setValues({ ...values, [input.name]: e.target.value })}>
                                            <option selected disabled>Chọn Giá Trị</option>
                                            {
                                                input.value.map((element, i) =>
                                                (
                                                    <option value={element}>{element}</option>
                                                ))
                                            }
                                        </select>

                                    </div> :
                                        <div style={{ display: "inline-grid" }}>
                                            <textarea className={focusedNoiDung && !values.NoiDung ? "focused" : ""} id="5" name="NoiDung" rows="10" cols="40" placeholder="Nội dung"
                                                required
                                                onBlur={(e) => setFocusedNoiDung(true)}
                                                onChange={(e) => { setValues({ ...values, NoiDung: e.target.value }) }}

                                            ></textarea>
                                            <span className={focusedNoiDung && !values.NoiDung ? "Invalid" : ""} style={{ margin: "20px", display: "none" }}>Vui lòng không để trống nội dung</span>
                                        </div>
                                )
                        ))
                        }

                    </div>




                </div>
                <input type="submit" ></input>
            </form>
            {getConfirm && (
                <ConfirmDialog
                    message="Bạn có chắc chắn muốn thực hiện hành động này?"
                    onConfirm={confirmSubmit}
                    onCancel={onCancel}
                />
            )}
            {messRes && (
                <div className="confirm-dialog noti">
                    <div className='confirm_layout'>
                        <p>
                            {messRes}

                        </p>
                    </div>
                </div>

            )}
        </div>

    )
}