"use client";
import { AppDispatch, RootState } from "@/store";
import { deleteTasks, fetchTasks } from "@/store/taskSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskEdit } from "./TaskEdit";
import { Button } from "./ui/button";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="overflow-y-auto h-[calc(100vh-200px)] p-2">
      <ul className="mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="flex justify-between border-b py-2">
              <span>{task.title}</span>
              <div className="pl-4 flex gap-2">
                <TaskEdit id={task._id} title={task.title} />
                <Button
                  variant={"destructive"}
                  onClick={() => dispatch(deleteTasks(task._id))}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
