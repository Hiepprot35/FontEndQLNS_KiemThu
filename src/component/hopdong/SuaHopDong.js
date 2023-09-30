import { HopDongInput } from "../../data/data";
import FormInput from "../FormInput/FormInput";
import DateInput from "../FormInput/DateInput";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

import { useState, useEffect } from "react";
import { ConfirmDialog } from "../confirmComponent/confirm";
export default function SuaHopDong() {
    let { MaNV } = useParams();
    const [isChanged, setIsChanged] = useState(true)
    const [HopDongInfor, setHopDongInfor] = useState();
    const getHopDong = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/getHopDong/${MaNV}`
        try {
            const res = await fetch(URL)
            const data = await res.json()
            setHopDongInfor({ ...data, NgayBatDau: format(new Date(data.NgayBatDau), 'yyyy/MM/dd'), NgayKy: format(new Date(data.NgayKy), 'yyyy/MM/dd'), NgayKetThuc: format(new Date(data.NgayKetThuc), 'yyyy/MM/dd') })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getHopDong()
    }, [])
    useEffect(()=>{HopDongInfor && setIsChanged(false)},[HopDongInfor])
    useEffect(()=>{console.log(isChanged)},[isChanged])

    const onChange = (e) => {
        setHopDongInfor({ ...HopDongInfor, [e.target.name]: e.target.value });

    }
    const setDate = (dateTime) => {
        setHopDongInfor({ ...HopDongInfor, [Object.keys(dateTime)]: Object.values(dateTime)[0] });

    }
    const changeHopDong = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/ChangeHopDong`
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(HopDongInfor)

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
        getConFirmSubmit && changeHopDong()

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
                        {HopDongInfor && HopDongInput.map((input, i) =>
                            i <= 6 && (
                                <div key={input.id}>
                                    {input.inputcac === "date" ? (
                                        <DateInput {...input} setDate={setDate}
                                            value={HopDongInfor[input.name]}
                                        />
                                    ) : (
                                        <FormInput {...input}
                                            onChange={onChange}
                                            value={HopDongInfor[input.name]}
                                            readOnly={input.id === 1 || input.id === 2}
                                        />)}
                                </div>
                            )
                        )}
                    </div>
                    <div className="inputForm row2">
                        {HopDongInfor && HopDongInput.map((input, i) =>
                            i > 6 && (
                                <div key={input.id}>
                                    {input.inputcac === "date" ? (
                                        <DateInput {...input}
                                            value={HopDongInfor[input.name]}

                                            setDate={setDate} />
                                    ) : (
                                        <FormInput {...input}
                                            onChange={onChange}
                                            value={HopDongInfor[input.name]}
                                        />
                                    )}
                                </div>
                            )
                        )}
                    </div>

                </div>
                {

                     <input className="submit_Button" disabled={isChanged} type="submit"></input>
                }
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