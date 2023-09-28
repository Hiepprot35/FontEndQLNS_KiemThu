import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { inputs } from "../../data/data";
import DateInput from "../FormInput/DateInput";
import blobtoBase64 from "../../function/BlobtoBase64";
import FormInput from "../FormInput/FormInput"
import { ConfirmDialog } from "../confirmComponent/confirm";
import { ResizeImg } from "../../function/ResizeImg";
import blobToBuffer from "../../function/BlobtoBuffer";
export default function ChangeUser() {
    let { userID } = useParams();
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
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }
    const getUser = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/getUserByMaNV/${userID}`)
            const data = await res.json()
            setUserInfo(data)
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
                                        value={userInfo[input.name]}
                                        onChange={onChange}
                                    >
                                    </FormInput> :
                                        <DateInput
                                            key={input.id}
                                            {...input}
                                            value={userInfo[input.name]}
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
                                        value={userInfo[input.name]}
                                        onChange={onChange}
                                    >
                                    </FormInput> :
                                        <DateInput
                                            key={input.id}
                                            {...input}
                                            value={userInfo[input.name]}
                                        // onChange={onChange}
                                        ></DateInput>
                                    )
                                ))
                                }
                                <div className="formInput">
                                    {inputs.map((input, index) => (
                                        index >= 8 &&
                                        < >
                                            <label htmlFor={input.name}>{input.label}:</label>
                                            <select className="select" name={input.name} onChange={onChange} value={userInfo[input.name]}>
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
                                style={{ height: "200px",margin:"20px" }}
                            >
                                <button
                                    style={{ margin: "20px",backgroundColor:"blue",color:"white" }}
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
                                >
                                </input>
                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                                {
                                    <div style={{backgroundColor:"gray",borderRadius:"20px"}}>

                                        <img className="avatarImage"
                                            src={avatarURL ? avatarURL : blobtoBase64(userInfo.Image)} style={{ backgroundColor: "black", margin: "20px", width: "150px", height: "200px" }} alt="Avatar"></img>
                                    </div>
                                }

                            </div>

                        </div>
                        <input type="submit" className="submit_Button" disabled={isChanged} ></input>
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
        </>
    )
}