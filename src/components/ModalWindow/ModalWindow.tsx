import "./ModalWindow.css"
import { IconButton } from "../IconButton/IconButton"

type ModalWindowProps = {
    onCloseModal: () => void;
    children: React.ReactNode;
}

export const ModalWindow = ( props: ModalWindowProps ) => {

    const closeModal = () => {
            props.onCloseModal()
    } 

    return <div className='modalWindow'>
            <div className="modalWindow-wrapper" >
                <div className="modalWindow-block">
                    <IconButton className="modalWindow-close" iconUrl="../images/cross.png" onClick={closeModal}></IconButton>
                    {props.children} 
                </div>
            </div>
    </div>
}