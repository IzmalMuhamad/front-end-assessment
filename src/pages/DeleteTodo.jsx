import { Button, Modal } from "react-bootstrap"
import { useContext, useState } from "react"
import { TodoContext } from "../App"
// import ModalUi from "../components/ModalUi";

export default function DeleteTodo({ index, show }) {
    const { todos, setTodos } = useContext(TodoContext);
    const [showModal, setShowModal] = useState(show);
    const [selectedTodoIndex, setSelectedTodoIndex] = useState(index); //save selected index during delete process

    console.log("DeleteTodo Accessed");

    // setShowModal(show);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTodoIndex(null);
    };

    const handleDeleteTodo = () => {
        if (selectedTodoIndex !== null) {
            const updatedTodos = todos.filter((_, i) => i !== selectedTodoIndex);
            setTodos(updatedTodos);
            handleCloseModal();
        }
    };

    return (
        <>
            {/* Modal for deleting todo */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this Todo?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The selected Todo will be deleted forever. Do you wish to proceed?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleDeleteTodo}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
