import { React } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from "react";

function ModalDialog() {
    const [isShow, invokeModal] = useState(false)
    console.log("dskds", isShow)

    const initModal = () => {
        console.log("modal")
        return invokeModal(!isShow)
    }
    return (
        <>
            <Button variant="success" onClick={initModal}>
                Open Modal
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>React Modal Popover Example</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={initModal}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={initModal}>
                        Store
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalDialog