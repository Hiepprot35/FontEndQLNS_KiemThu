import { HopDongInput } from "../../data/data";
import FormInput from "../FormInput/FormInput";
import DateInput from "../FormInput/DateInput";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "../confirmComponent/confirm";
export default function HopDong() {
    const [values, setValues] = useState({
        HoVaTen: "",
        MaNhanVien: "",
        LoaiHopDong: "",
        NgayKy: "",
        NgayBatDau: "",
        NgayKetThuc: "",
        DiaDiemLam: "",
        ChuyenMon: "",
        PhapNhan: "",
        LuongCoBan: "",
        HeSoLuong: "",
    })
    useEffect(() => { getUser() }, [values.MaNhanVien])
    const getUser = async () => {
        if (values.MaNhanVien) {


            const URL = `${process.env.REACT_APP_API_HOST}/api/getUserByMaNV/${values.MaNhanVien}`
            try {
                const res = await fetch(URL)
                const data = await res.json();
                console.log(data)
                if (res.status === 200) {

                    setValues({ ...values, HoVaTen: data.HoVaTen })
                }
                
            } catch (error) {
                setValues({ ...values, HoVaTen: "" })
            }
        }

    }
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const setDate = (dateTime) => {
        setValues({ ...values, [Object.keys(dateTime)]: Object.values(dateTime)[0] });
    }
    const createStudent = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/themhopdong`
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)

            })

            const data = await res.json();
            setMesRes(data.message)
            setComfirm(false)
        } catch (error) {
            console.log(error)
        }

    }
    const [messRes, setMesRes] = useState("");

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
                <div className="container create_container">

                    <div className="inputForm row1">
                        {HopDongInput.map((input, i) =>
                            i <= 6 && (
                                <div key={input.id}>
                                    {input.inputcac === "date" ? (
                                        <DateInput {...input} setDate={setDate}
                                            value={values[input.name]}
                                        />
                                    ) : (
                                        <FormInput {...input}
                                            onChange={onChange}
                                            value={values[input.name]}
                                        />)}
                                </div>
                            )
                        )}
                    </div>
                    <div className="inputForm row2">
                        {HopDongInput.map((input, i) =>
                            i > 6 && (
                                <div key={input.id}>
                                    {input.inputcac === "date" ? (
                                        <DateInput {...input}
                                            value={values[input.name]}

                                            setDate={setDate} />
                                    ) : (
                                        <FormInput {...input}
                                            onChange={onChange}
                                            value={values[input.name]}
                                        />
                                    )}
                                </div>
                            )
                        )}
                    </div>

                </div>
                <input type="submit"></input>
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