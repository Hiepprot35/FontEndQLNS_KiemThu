import { useEffect, useState } from "react";
import { DonNghiInput } from "../../data/data";
import DateInput from "../FormInput/DateInput";
import useToken from "../../hook/useToken";
import { ConfirmDialog } from "../confirmComponent/confirm";
export default function ThemDonNghi() {
    const { Token } = useToken()
    const [focusedNoiDung, setFocusedNoiDung] = useState(false)

    const [values, setValues] = useState({
        NgayBatDau: "",
        NgayKetThuc: "",
        LiDoNghi: "",
        NhanVien: Token.Username,
    })
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const setDate = (dateTime) => {
        setValues({ ...values, [Object.keys(dateTime)]: Object.values(dateTime)[0] });
    }
    useEffect(() => {
        console.log(values)
    }, [values])
    const createDonNghi = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/themdonnghi`
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
    const [messRes, setMesRes] = useState("");

    const [getConFirmSubmit, setConFirmSubmit] = useState(false)
    const [getConfirm, setComfirm] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault();
        setComfirm(true)
    }
    useEffect(() => {
        getConFirmSubmit && createDonNghi()

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
        <div className="container">
            <form onSubmit={(e) => onSubmit(e)}>

                {
                    DonNghiInput.map((input, i) =>
                    (
                        i != 2 ?
                            input.inputcac == "date" && <DateInput
                                {...input}
                                value={values[input.name]}
                                setDate={setDate}
                            >
                            </DateInput> :
                            <div >
                                <textarea className={focusedNoiDung && !values.LiDoNghi ? "focused" : ""} id="5" name="NoiDung" rows="10" cols="40" placeholder="Nội dung"
                                    required
                                    onBlur={(e) => setFocusedNoiDung(true)}
                                    onChange={(e) => { setValues({ ...values, LiDoNghi: e.target.value }) }}

                                ></textarea>
                                <span className={focusedNoiDung && !values.LiDoNghi ? "Invalid" : ""} style={{ margin: "20px", display: "none" }}>Vui lòng không để trống nội dung</span>
                            </div>
                    )
                    )
                }
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