"use client"

import * as React from "react"

import { TaskResponse } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { handleError } from "@/util";

import TaskService from "@/services/task-service";
import { useRouter } from "next/navigation";

export default function TaskCheckbox({ task }: { task?: TaskResponse }) {
  const [isCompleted, setIsCompleted] = React.useState(task?.status === "Completed");
  const router = useRouter()

  React.useEffect(() => {
    setIsCompleted(task?.status === "Completed");
  }, [task]);

  if (!task) return <Checkbox disabled />;

  const update = async () => {
    const statusToString = isCompleted ? "Incomplete" : "Completed";
    const updatedTask = { ...task, status: statusToString };

    try {
      await TaskService.updateTask(task.id, updatedTask);
      setIsCompleted((prev) => !prev);
      router.refresh();
    } catch (e) {
      handleError(e);
    }
  };

  return <Checkbox checked={isCompleted} onCheckedChange={update} disabled={!task}/>;
}
