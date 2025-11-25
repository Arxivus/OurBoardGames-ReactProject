import "./ModalWindow.css"

type ModalWindowProps = {
    showAnimate: boolean;
    onCloseModal: () => void;
    children: React.ReactNode;
}

export const ModalWindow = ( props: ModalWindowProps ) => {

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            console.log(e.currentTarget);
            props.onCloseModal()
        }
    } 

    return <div className='modalWindow'>
            <div className="modalWindow-wrapper" onClick={closeModal}>
                {props.children}
            </div>
    </div>
}