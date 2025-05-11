import TaskList from "@/components/TaskList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store";
import { createTasks } from "@/store/taskSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createTasks(title));
    setTitle("");
  };

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="absolute top-2 right-2">
        <ThemeToggle />
      </div>
      <Card className="h-[calc(100vh-50px)] overflow-hidden">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl text-center font-bold mb-4 ">TaskForge</h1>
          </CardTitle>
          <CardDescription>
            <p className="text-center text-gray-500">
              A simple task management app built with React, Redux, and Node.js
            </p>
            <p className="text-center text-gray-500">
              Add your tasks below and manage them easily.
            </p>
            <p className="text-center text-gray-500">
              <span className="text-red-500 font-bold">Note:</span> This is a
              demo app, so all tasks will be lost when you refresh the page.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex justify-between items-center mb-2"
            onSubmit={onSubmit}
          >
            <Input
              className="border p-2 mr-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Task"
            />
            <Button type="submit" disabled={!title}>
              Add
            </Button>
          </form>
          <TaskList />
        </CardContent>
      </Card>
    </div>
  );
};
export default Dashboard;
