import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateTodo() {

    const location = useLocation();
    let index = location.state.id;

    const { todos, setTodos } = useContext(TodoContext);
    const selectedTodo = todos[index];

    const [title, setTitle] = useState(selectedTodo.title);
    const [timer, setTimer] = useState(selectedTodo.timer);
    const [completed, setCompleted] = useState(selectedTodo.completed);

    useEffect(() => {
        if (parseInt(timer) === 0) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
    }, [timer]);

    useEffect(() => {
        if (completed) {
            setTimer(0);
        }
        else {
            setTimer(1);
        }
    }, [completed]);

    const navigate = useNavigate();

    return (
        <Container>
            <h1 className="my-3">Update Todos</h1>
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    const updatedTodos = [...todos];
                    updatedTodos[index] = { id: index, title, timer, completed };
                    setTodos(updatedTodos);
                    navigate("/list");
                }}
            >

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        type="text"
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Playtime (Hour)</Form.Label>
                    <Form.Control
                        value={timer}
                        type="number"
                        min={0}
                        onChange={(e) => { setTimer(e.target.value) }}
                        required
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Completed"
                    checked={completed}
                    onChange={(e) => { setCompleted(e.target.checked) }}
                    className="my-3"
                />
                <Button className="me-1" variant="secondary" onClick={() => navigate("/list")}>Cancel</Button>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    )
}