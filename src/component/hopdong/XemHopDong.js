import { useEffect, useState } from "react"
import blobtoBase64 from "../../function/BlobtoBase64"
import { HopDongInput } from "../../data/data";
export default function XemHopDong() {
    const [isLoading, setIsLoading] = useState(true)
    const [getUsers, setUsers] = useState("");
    const getUserfromData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/getAllHopDong`)
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
                        <div>
                            <div style={{display:"flex"}}>

                                <a href="/themhopdong"><span className="spanLikeLogOut">Thêm hợp đồng</span></a>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã hợp đồng</th>
                                    {
                                        HopDongInput.map((e, i) => (
                                            <th key={i}>{e.name}</th>
                                        ))
                                    }
                                    <th>Sửa</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    getUsers.length != 0 ? getUsers.map((e, i) => (
                                        <tr>
                                            <td>
                                                {e.HopDongID}
                                            </td>
                                            <td>
                                                {e.MaNhanVien}
                                            </td>
                                            <td>
                                                {e.HoVaTen}
                                            </td>

                                            <td>
                                                {e.LoaiHopDong}
                                            </td>
                                            <td>
                                                {e.NgayKy}
                                            </td>
                                            <td>
                                                {e.NgayBatDau}
                                            </td>
                                            <td>
                                                {e.NgayKetThuc}
                                            </td>
                                            <td>
                                                {e.DiaDiemLam}
                                            </td>
                                            <td>
                                                {e.ChuyenMon}
                                            </td>
                                            <td>
                                                {e.PhapNhan}
                                            </td>
                                            <td>
                                                {e.LuongCoBan}
                                            </td>

                                            <td>
                                                {e.HeSoLuong}
                                            </td>

                                            <td>
                                                <a href={`/hopdong/${e.MaNhanVien}`}>Sửa</a>
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