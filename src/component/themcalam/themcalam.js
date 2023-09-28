import FormInput from "../FormInput/FormInput"
import { inputs } from "../../data/data"
import { useEffect, useState } from "react"
import DateInput from "../FormInput/DateInput"

import ClockInput from "../FormInput/ClockInput"
import { ConfirmDialog } from "../confirmComponent/confirm"
export default function ThemCaLam() {
    const [gioVao, setGioVao] = useState("");
    const [gioRa, setGioRa] = useState("");
    const [messRes, setMessRes] = useState(null)
    const [caInfo, setCaInfo] = useState({
        HoVaTen: "",
        MaNhanVien: "",
        GioVao: "",
        GioRa: "",
        NgayLam: ""
    })
    const createCalamviec = async () => {
        console.log(caInfo)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/createCalamviec`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(caInfo)
            })
            if (res.status === 200) {

                const data = await res.json()
                setMessRes(data.message)
                setComfirm(false)
                setConFirmSubmit(false)

            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        messRes && setTimeout(()=>{
            setMessRes(null)
        },1000)
    },[messRes])
    useEffect(() => {
        console.log(caInfo)
    }, [caInfo])
    const MaNhanVienInput = [
        {
            id: 4,
            name: "MaNhanVien",
            type: "text",
            placeholder: "Mã nhân viên",
            label: "Mã nhân viên",
            pattern: "^[0-9]*$",
            required: true,
            value: "", // Giá trị mặc định
        }
    ]
    const onChange = (e) => {
        setCaInfo({ ...caInfo, [e.target.name]: e.target.value })
    }
    const [getConFirmSubmit, setConFirmSubmit] = useState(false)
    const [getConfirm, setComfirm] = useState(false)
    useEffect(() => {
        getConFirmSubmit && createCalamviec()

    }, [getConFirmSubmit])
    const confirmSubmit = (e) => {
        e.preventDefault()
        setConFirmSubmit(true)
    }
    const onCancel = () => {
        setComfirm(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setComfirm(true)
    }
    useEffect(() => {
        setCaInfo({ ...caInfo, GioVao: gioVao })
    }, [gioVao])
    useEffect(() => {
        setCaInfo({ ...caInfo, GioRa: gioRa })
    }, [gioRa])

    return (
        <div className="container">
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="FormInput">
                    {
                        inputs.map((input, i) => (

                            i == 0 &&
                            < FormInput
                                key={input.id}
                                {...input}
                                value={caInfo[input.name]}
                                onChange={onChange}
                            />
                        )
                        )
                    }
                    {
                        MaNhanVienInput.map((input, i) => (
                            < FormInput
                                key={input.id}
                                {...input}
                                value={caInfo[input.name]}
                                onChange={onChange}
                            />
                        )
                        )
                    }
                    <ClockInput
                        label={"Giờ vào"}
                        name={"GioVao"}
                        value={caInfo.GioVao}
                        setTimeClock={setGioVao}
                    />
                    <ClockInput
                        label={"Giờ ra"}
                        name={"GioRa"}
                        value={caInfo.GioRa}
                        setTimeClock={setGioRa}
                    />
                    <label>Ngày làm: </label>
                    <input name="dateWork" type="date" value={caInfo.NgayLam} onChange={(e) => { setCaInfo({ ...caInfo, NgayLam: e.target.value }) }}></input>
                </div>
                <input type="submit" style={{ width: "100%" }}></input>
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