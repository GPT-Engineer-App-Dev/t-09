import { Container, VStack, Heading, Input, Button, Checkbox, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (newTask.trim() === "") {
      toast({
        title: "Error",
        description: "Task cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <Heading as="h1" mb={4}>Todo App</Heading>
        <HStack w="100%">
          <Input
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <IconButton
            aria-label="Add task"
            icon={<FaPlus />}
            onClick={addTask}
          />
        </HStack>
        <VStack spacing={2} w="100%">
          {tasks.map((task, index) => (
            <HStack key={index} w="100%" justifyContent="space-between">
              <Checkbox
                isChecked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                textDecoration={task.completed ? "line-through" : "none"}
              >
                {task.text}
              </Checkbox>
              <IconButton
                aria-label="Delete task"
                icon={<FaTrash />}
                onClick={() => deleteTask(index)}
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;