import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../App";

export default function AddTodo() {

    const [title, setTitle] = useState('');
    const [timer, setTimer] = useState(1);
    const completed = false;

    const { todos, setTodos } = useContext(TodoContext);

    const navigate = useNavigate();

    return (
        <Container>
            <h1 className="my-3">Add Todos</h1>
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    const newTodo = { id: Date.now(), title, timer, completed };
                    const updatedTodos = [...todos, newTodo];
                    setTodos(updatedTodos);
                    navigate("/list");
                }}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        type="text"
                        placeholder="Enter your title here..."
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Playtime (Hour)</Form.Label>
                    <Form.Control
                        value={timer}
                        type="number"
                        min={1}
                        onChange={(e) => { setTimer(e.target.value) }}
                        required
                    />
                </Form.Group>
                <Button className="me-1" variant="secondary" onClick={() => navigate("/list")}>Cancel</Button>
                <Button className="my-3" variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}