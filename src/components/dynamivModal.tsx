import React from 'react'
import Modal from 'react-bootstrap/Modal';

interface DynamicModalProps{
    show?:boolean,
    onHide?:()=>void,
    title?:string,
    children?:React.ReactNode
}

const DynamicModal:React.FC<DynamicModalProps>= ({ show, onHide, title, children }) => {
    return (
        <>
            <Modal show={show} onHide={onHide} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{children}</Modal.Body>
            </Modal>

        </>
    );


}

export default DynamicModal


