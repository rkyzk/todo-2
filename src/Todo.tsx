import "./Todo.css";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { CompletedTodoList } from "./components/CompletedTodoList";
import { Box, Text } from "@chakra-ui/react";

export const Todo = () => {
  return (
    <Box backgroundColor="#eee" height="100vh" width="100%" marginTop={-10}>
      <AddTodo />
      <TodoList />
      <CompletedTodoList />
    </Box>
  );
};
