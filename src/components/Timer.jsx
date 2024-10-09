import { useContext, useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { TodoContext } from "../App";

export default function Timer({ time, index }) {
    const timerInHour = Math.floor(time * (1000 * 60 * 60));
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(timerInHour);
    const intervalIdRef = useRef(null);

    const { todos, setTodos } = useContext(TodoContext);
    const selectedTodo = todos[index];

    const title = selectedTodo.title;
    const [completed, setCompleted] = useState(selectedTodo.completed);
    const [timer, setTimer] = useState(time);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isRunning && elapsedTime > 0) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime((prevTime) => prevTime - 10);
            }, 10);
        } else if (elapsedTime === 0) {
            setCompleted(true);
            pause();
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning, elapsedTime]);

    function start() {
        setIsPlaying(true);
        setIsRunning(true);
    }

    function pause() {
        setIsPlaying(false);
        setIsRunning(false);
        const updatedTimer = Math.floor(elapsedTime / (1000 * 60 * 60));
        setTimer(updatedTimer);
        const updatedTodos = [...todos];
        updatedTodos[index] = { id: index, title, timer, completed };
        setTodos(updatedTodos);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div>
            <Card.Text>{formatTime()}</Card.Text>
            <div className="mb-2">
                {!isPlaying ? (
                    <Button onClick={start}><i className="bi bi-caret-right-fill"></i></Button>
                ) : (
                    <Button variant="secondary" onClick={pause}><i className="bi bi-pause-fill"></i></Button>
                )}
            </div>
        </div>
    );
}
