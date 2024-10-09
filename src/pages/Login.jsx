import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToken, deleteToken } from "../redux/authToken";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(deleteToken());
    });

    function login(e) {
        e.preventDefault();

        const isCorrectUsername = username === 'izmal@gmail.com';
        const isCorrectPassword = password === '1234567';

        if (isCorrectPassword && isCorrectUsername) {
            dispatch(addToken());
            navigate("/list");
        } else { setShowError(true); }
    }

    return (
        <Container>
            <h1 className="my-3">Login</h1>
            <Form
                onSubmit={login}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="email"
                        value={username}
                        placeholder="Enter your email..."
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter your password..."
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setShowError(false);
                        }}
                    />
                </Form.Group>
                {showError && (
                    <div>
                        <span style={{ color: "red" }}>Incorrect username/password</span><br />
                    </div>
                )}
                <Button className="my-3" variant="primary" type="submit">Login</Button>
            </Form>
        </Container>
    )
}