import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import './header.css'
import useToken from "../../hook/useToken";
import { links } from '../../data/data'
import { click } from "@testing-library/user-event/dist/click";
// import { useActiveSectionContext } from "../../context/ActiveSectionContextProvider";
export default function Header() {
    const navigate=useNavigate()
    const logOut = () => {
        localStorage.clear()
        window.location.reload()
        navigate("/")
    }


    const { Token } = useToken()
    const [clicked, setClicked] = useState()
    useEffect(() => { console.log(Token) }, [])
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
                                    smooth={true} duration={500}
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
                <button style={{backgroundColor:"grey"}} onClick={() => logOut()}>Log out</button>
            </motion.div>
        </header>
    );
}
