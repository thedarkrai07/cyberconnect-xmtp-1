import { useCallback } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import {
    HiOutlineChevronDoubleDown,
    HiOutlineChevronDoubleUp
} from "react-icons/hi";
import { useNavStates } from "../../context/ChatContext";
import { useGraph } from "../../context/GraphContext";
import styles from "./index.module.css";

interface ContactNavbarInterface {}

const ContactNavbar: React.FC<ContactNavbarInterface> = () => {
    const { isOpen, setIsOpen, setShowModal } = useNavStates();
    const { graphAddress } = useGraph();

    const NavChevron = isOpen
        ? HiOutlineChevronDoubleDown
        : HiOutlineChevronDoubleUp;

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }, [setIsOpen, isOpen]);

    const openModal = useCallback((e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation();
        setShowModal(true);
    }, [setShowModal]);

    return (
        <div className={styles.flexbox} onClick={handleClick}>
            <div>Messages</div>
            <div className={styles.actions}>
                {graphAddress && <BiMessageSquareAdd onClick={openModal} />}
                <NavChevron />
            </div>
        </div>
    );
};

export default ContactNavbar;
