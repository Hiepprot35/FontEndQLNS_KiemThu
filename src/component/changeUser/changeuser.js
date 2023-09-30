import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { inputs } from "../../data/data";
import DateInput from "../FormInput/DateInput";
import blobtoBase64 from "../../function/BlobtoBase64";
import FormInput from "../FormInput/FormInput"
import { ConfirmDialog } from "../confirmComponent/confirm";
import { ResizeImg } from "../../function/ResizeImg";
import blobToBuffer from "../../function/BlobtoBuffer";
import useToken from "../../hook/useToken";
import { format } from 'date-fns';

export default function ChangeUser(props) {
    let { userID } = useParams();
    const { Token } = useToken()
    const fileInputRef = useRef()
    const [userInfo, setUserInfo] = useState()
    const [avatarURL, setAvatarURL] = useState();
    const [BufferImgInput, setBufferImgInput] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [isChanged, setIsChanged] = useState(true)
    const [getConFirmSubmit, setConFirmSubmit] = useState(false)
    const [getConfirm, setConfirm] = useState(false)
    const onCancel = () => {
        setConfirm(false)
    }
    const ChangeUser = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/changeUser`
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)

            })
            const data = await res.json();
            setMesRes(data.message)
            setConFirmSubmit(false)
            setConfirm(false)

        } catch (error) {
            console.log(error)
        }
    }
    const getUser = async () => {
        const URL = props.userID ? `${process.env.REACT_APP_API_HOST}/api/getUserByMaNV/${props.userID}` : `${process.env.REACT_APP_API_HOST}/api/getUserByMaNV/${userID}`
        try {
            const res = await fetch(URL)
            const data = await res.json()
            setUserInfo({ ...data, NgaySinh: format(new Date(data.NgaySinh), 'yyyy/MM/dd'), NgayNhanChuc: format(new Date(data.NgayNhanChuc), 'yyyy/MM/dd') })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    useEffect(() => {

        getConFirmSubmit && ChangeUser()

    }, [getConFirmSubmit])
    const confirmSubmit = (e) => {
        e.preventDefault()
        setConFirmSubmit(true)
        setConfirm(false)

        // window.location.reload()
    }
    const [messRes, setMesRes] = useState("");
    useEffect(() => {
        messRes && setTimeout(() => {
            setMesRes(null)
        }, 1000)
    }, [messRes])
    useEffect(() => { console.log(userInfo) }, [userInfo])
    const onSubmit = (e) => {
        e.preventDefault();
        setConfirm(true)
    }
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
                    setUserInfo({ ...userInfo, Image: imgBufer });
                })
            };

            fetchData();
        }
    }, [BufferImgInput]);
    // useEffect(()=>{console.log(userInfo)},[userInfo])
    const onChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        setIsChanged(false)
    }

    const setDate = (dateTime) => {
        setUserInfo({ ...userInfo, [Object.keys(dateTime)]: Object.values(dateTime)[0] });
        setIsChanged(false)
    }
    return (
        <>
            {
                userInfo &&

                <div className="container">
                    <form onSubmit={(e) => onSubmit(e)} >
                        <div className="container create_container" >

                            <div className="inputForm row1">
                                {userInfo && inputs.map((input, index) => (
                                    index < 6 &&

                                    (input.inputcac !== "date" ? <FormInput
                                        {...input}
                                        key={input.id}

                                        value={userInfo[input.name]}
                                        onChange={onChange}

                                        readOnly={Token.Role === 2}
                                    >
                                    </FormInput> :
                                        <DateInput
                                            key={input.id}
                                            {...input}
                                            value={userInfo[input.name]}
                                            setDate={setDate}
                                            readOnly={Token.Role === 2}
                                        // onChange={onChange}
                                        ></DateInput>
                                    )
                                ))
                                }

                            </div>
                            <div className="inputForm row2">
                                {userInfo && inputs.map((input, index) => (
                                    index >= 6 && index <= 7 &&

                                    (input.inputcac !== "date" ? <FormInput
                                        {...input}
                                        key={input.id}

                                        value={userInfo[input.name]}
                                        onChange={onChange}
                                        readOnly={Token.Role === 2}

                                    >
                                    </FormInput> :
                                        <DateInput
                                            key={input.id}
                                            {...input}
                                            value={userInfo[input.name]}
                                            setDate={setDate}
                                            readOnly={Token.Role === 2}
                                        ></DateInput>
                                    )
                                ))
                                }
                                <div className="formInput select_column">
                                    {inputs.map((input, index) => (
                                        index >= 8 &&
                                        <div key={input.id }
                                        style={{margin:"5px"}}
                                        >
                                            <label style={{ color: "black" }} htmlFor={input.name}>{input.label}:     </label>

                                                <select className="select" name={input.name} onChange={onChange} value={userInfo[input.name]}>
                                                    <option disabled value={""} selected>Chọn Giá Trị</option>
                                                    {
                                                        input.value.map((element, i) =>
                                                        (
                                                            <option key={i}
                                                                value={element}>{element}</option>
                                                        ))
                                                    }
                                                </select>
                                        </div>

                                    ))}
                                </div>
                            </div>
                            <div className="avatar_field"
                                style={{ margin: "20px" }}
                            >
                                <span
                                    className="spanLikeLogOut"
                                    type="button"
                                    onClick={() => { fileInputRef.current.click() }}
                                >
                                    Chọn ảnh
                                </span>
                                <input
                                    type="file"
                                    onChange={imgInput}
                                    ref={fileInputRef}
                                    accept="image/png, image/jpeg, image/webp"
                                    hidden
                                >
                                </input>
                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                                {
                                    <div style={{ backgroundColor: "gray", borderRadius: "20px" }}>

                                        <img className="avatarImage"
                                            src={avatarURL ? avatarURL : blobtoBase64(userInfo.Image)} style={{ backgroundColor: "black", margin: "20px", width: "150px", height: "200px" }} alt="Avatar"></img>
                                    </div>
                                }

                            </div>

                        </div>
                        {

                            Token.Role == 1 && <input type="submit" className="submit_Button" disabled={isChanged} ></input>
                        }
                    </form>

                </div>

            }
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
        </>
    )
}