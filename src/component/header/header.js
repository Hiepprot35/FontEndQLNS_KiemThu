import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './header.css'
import useToken from "../../hook/useToken";
import validatorFunction from "../../function/validator";
import blobtoBase64 from "../../function/BlobtoBase64";
import { links } from '../../data/data'
export default function Header() {
    const navigate=useNavigate()
    const [user,setUser]=useState();
    const logOut = () => {
        localStorage.clear()
        window.location.reload()
        navigate("/")
        // window.location.href = "/"; // Điều hướng đến trang chính (hoặc trang khác)

    }
    const getUser = async () => {
        const URL = validatorFunction.isNumeric(Token.Username) &&`${process.env.REACT_APP_API_HOST}/api/getUserByMaNV/${Token.Username}`
        try {
            const res = await fetch(URL)
            const data = await res.json()
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }
    const { Token } = useToken()
    useEffect(() => {getUser()}, [])
    return (
        <header>
            <motion.div
                className="Header_homepage"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <nav>
                    <ul>
                        {links.map((link) => (
                            parseInt(Token.Role) === link.role &&
                            <li key={link.hash}

                            >
                                <motion.a
                                     duration={500}
                                    offset={-100}
                                    href={link.hash}
                                >
                                    {link.name}
                                    {/* {link.name === activeSection && (
                                        <motion.span
                                            style={{ backgroundColor: "gray", position: "absolute", inset: "1rem", borderRadius: "0.4rem", zIndex: "-2" }}
                                            layoutId="activeSection"
                                            transition={{
                                                type: "tween",
                                                stiffness: 300,
                                                damping: 60,
                                            }}
                                        ></motion.span>
                                    )} */}

                                </motion.a>
                            </li>

                        ))}
                    </ul>
                </nav>
                <div className="left-header">
                    <p>Hello {user? user.HoVaTen:"admin"}</p>
                    {
                     Token.Username!="admin"&&   <img className="Avatar" src={user&&blobtoBase64(user.Image)} alt="Avatar User"></img>
                    }
                        
                <span className="spanLikeLogOut" onClick={() => logOut()}>Log out</span>
                </div>
            </motion.div>
        </header>
    );
}
