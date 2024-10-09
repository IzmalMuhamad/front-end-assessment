import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import useLocalStorage from 'use-local-storage';
import AddTodo from './pages/AddTodo';
import TodoList from './pages/TodoList';
import UpdateTodo from './pages/UpdateTodo';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';

export const TodoContext = createContext(null);

function Layout() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/list">Todos</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Add Todo</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route
              element={
                <RequireAuth>
                  <TodoList />
                </RequireAuth>
              }
              path="/list"
            />
            <Route
              element={
                <RequireAuth>
                  <AddTodo />
                </RequireAuth>
              }
              path="/add"
            />
            <Route
              element={
                <RequireAuth>
                  <UpdateTodo />
                </RequireAuth>
              }
              path="/update"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App;
