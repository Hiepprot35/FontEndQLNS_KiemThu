import FormInput from "../FormInput/FormInput"
import { useEffect, useRef, useState } from "react";
import validator from 'validator';
import { ConfirmDialog } from "../confirmComponent/confirm";
import { inputs } from '../../data/data'
import DateInput from "../FormInput/DateInput";
import './createUser.css'
import { ResizeImg } from "../../function/ResizeImg";
import DateExist from "../../function/DateExist";
import validatorFunction from "../../function/validator";
import blobToBuffer from "../../function/BlobtoBuffer";
export default function CreateUser() {
    document.title ="Create User"
    const [avatarURL, setAvatarURL] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null)
    const [BufferImgInput, setBufferImgInput] = useState("")
    const [ngaySinh,setNgaySinh]=useState()
    const [ngayNhanChuc,setNgayNhanChuc]=useState()

    const [values, setValues] = useState({
        HoVaTen: "Đoàn Văn A",
        GioiTinh: "Nam",
        Image: "",
        NgaySinh: "",
        CCCD: "12434756",
        SDT: "1243475624",
        NoiSinh: "Nam Định",
        DiaChiThuongChu: "Nam Định",
        Email: "langnamngu@gmail.com",
        PhongBan: "",
        ChucVu: "",
        TrinhDoHocVan: "",
        NgayNhanChuc: "",
    });
    const imgInput = (e) => {
        const img = e.target.files[0];
        if (img) {

            if (img.type.startsWith("image/")) {

                const imgLink = URL.createObjectURL(img);
                setAvatarURL(imgLink);
                setErrorMessage("");
                setBufferImgInput(img);
            }
            else {
                setAvatarURL(null);
                setErrorMessage("Vui lòng chọn một tệp ảnh hợp lệ.");
            }
        }
    };
    useEffect(() => {
        if (BufferImgInput) {

            const fetchData = async () => {
                ResizeImg(BufferImgInput, async (newBlob) => {
                    const imgBufer = await blobToBuffer(newBlob)
                    setValues({ ...values, Image: imgBufer });
                })
            };

            fetchData();
        }
    }, [BufferImgInput]);
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const setDate = (dateTime) => {
        setValues({ ...values, [Object.keys(dateTime)]: Object.values(dateTime)[0] });
    }
    const createStudent = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/createUser`
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
                <div className="container create_container" >

                    <div className="inputForm row1">
                        {inputs.map((input, index) => (
                            index < 6 &&
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
                        ))}

                    </div>

                    <div className="inputForm row2">
                        {inputs.map((input, index) => (
                            index >= 6 && index <= 7 &&
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


                        ))}
                        <div className="formInput">
                            {inputs.map((input, index) => (
                                index >= 8 &&
                                < >
                                    <label htmlFor={input.name}>{input.label}:</label>
                                    <select className="select" name={input.name} onChange={(e) => setValues({ ...values, [input.name]: e.target.value })}>
                                        <option selected disabled>Chọn Giá Trị</option>
                                        {
                                            input.value.map((element, i) =>
                                            (


                                                <option value={element}>{element}</option>
                                            ))
                                        }
                                    </select>

                                </>

                            ))}
                        </div>

                    </div>
                    <div className="avatar_field"
                        style={{ height: "200px" }}
                    >
                        <button
                            type="button"
                            onClick={() => { fileInputRef.current.click() }}

                        >
                            Chọn ảnh
                        </button>
                        <input
                            type="file"
                            onChange={imgInput}
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/webp"
                            hidden
                            required
                        >
                        </input>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                        {avatarURL && <img className="avatarImage" src={avatarURL} style={{ width: "100px", height: "100px" }} alt="Avatar"></img>
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