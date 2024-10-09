import { Badge, Button, Card, Col, Container, Modal, Row } from "react-bootstrap"
import { useContext, useState } from "react"
import { TodoContext } from "../App"
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

export default function TodoList() {
    return (
        <Container>
            <h1 className="my-3">Games Todos</h1>
            <Row>
                <CardList />
            </Row>
        </Container>
    );
}

function CardList() {
    const { todos, setTodos } = useContext(TodoContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);

    const navigate = useNavigate();

    const handleShowModal = (index) => {
        setSelectedTodoIndex(index);
        setShowModal(true);
    };

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

    const navigatePage = (index) => {
        navigate("/update", {
            state: { id: index }
        });
    };

    return (
        <>
            {todos.map((todo, index) => {
                const bg = todo.completed ? "success" : "danger";

                return (
                    <Col md={4} key={index}>
                        <Card className="my-3">
                            <Card.Body>
                                <Card.Title>{todo.title}</Card.Title>
                                <Timer time={todo.timer} index={index} />
                                <Badge bg={bg}>{!todo.completed && "Not"} Completed</Badge>
                            </Card.Body>
                        </Card>
                        <Button variant="primary" className="me-2" onClick={() => navigatePage(index)}>
                            <i className="bi bi-gear-fill"></i>
                        </Button>
                        <Button variant="danger" onClick={() => handleShowModal(index)}>
                            <i className="bi bi-trash-fill"></i>
                        </Button>
                    </Col>
                );
            })}

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

