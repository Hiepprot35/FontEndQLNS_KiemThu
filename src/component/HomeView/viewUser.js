import { useEffect, useState } from "react"
import blobtoBase64 from "../../function/BlobtoBase64"
import { inputs } from "../../data/data";
import './viewuser.css'
export default function ViewUsers() {
    const [isLoading, setIsLoading] = useState(true)
    const [getUsers, setUsers] = useState("");
    const getUserfromData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/getAllUser`)
            const data = await res.json();
            setUsers(data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getUserfromData()
    }, [])
    useEffect(() => {
        setIsLoading(false)
    }, [getUsers])
    return (
        <>
            {

                isLoading ? <div>
                    Loading
                </div> :
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã nhân viên</th>
                                    {
                                        inputs.map((e, i) => (
                                            <th key={i}>{e.name}</th>
                                        ))
                                    }
                                    <th>Image</th>
                                    <th>Sửa</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    getUsers.length!=0  ? getUsers.map((e, i) => (
                                        <tr>
                                            <td>
                                                {e.MaNhanVien}
                                            </td>
                                            <td>
                                                {e.HoVaTen}
                                            </td>
                                            <td>
                                                {e.NgaySinh}
                                            </td>
                                            <td>
                                                {e.CCCD}
                                            </td>
                                            <td>
                                                {e.SDT}
                                            </td>
                                            <td>
                                                {e.NoiSinh}
                                            </td>
                                            <td>
                                                {e.DiaChiThuongChu}
                                            </td>
                                            <td>
                                                {e.Email}
                                            </td>
                                            <td>
                                                {e.NgayNhanChuc}
                                            </td>

                                            <td>
                                                {e.PhongBan}
                                            </td>
                                            <td>
                                                {e.ChucVu}
                                            </td>
                                            <td>
                                                {e.TrinhDoHocVan}
                                            </td>
                                            <td>
                                                {e.GioiTinh}
                                            </td>
                                            <td>
                                                <img style={{ width: "40px", height: "40px" }} src={blobtoBase64(e.Image)}></img>
                                            </td>
                                        <td>
                                            <a href={`/profile/${e.MaNhanVien}`}>Sửa</a>
                                        </td>
                                        </tr>
                                    )
                                    )
                                        :
                                        <tr>
                                            <td colspan="14">Không tồn tại giá trị</td>
                                        </tr>}
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}