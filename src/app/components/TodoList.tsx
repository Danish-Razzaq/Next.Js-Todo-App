"use client";
import React, { FormEventHandler, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrashRestoreAlt } from "react-icons/fa";
import Model from "./model";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/Api";
import { ITask } from "@/types/tasks";

interface TodoListProps {
  taskList: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ taskList }) => {
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [updateTOEdit, setUpdateTOEdit] = useState<string | null>(null);
  const [taskTOEdit, setTaskTOEdit] = useState("");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null); // Store the ID of the task to delete

  const router = useRouter();

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (updateTOEdit !== null) {
      await editTodo({
        id: updateTOEdit,
        task: taskTOEdit,
      });

      setUpdateTOEdit(null);
      setTaskTOEdit("");
      setOpenModelEdit(false);
      router.refresh();
    }
  };

  const handleSubmitDeleteTodo = async () => {
    if (taskToDelete !== null) {
      await deleteTodo(taskToDelete);
      setOpenModelDelete(false);
      router.refresh();
    }
  };

  const handleOpenEditModal = (taskId: string, taskText: string) => {
    setUpdateTOEdit(taskId);
    setTaskTOEdit(taskText);
    setOpenModelEdit(true);
  };

  const handleOpenDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId); // Set the ID of the task to delete
    setOpenModelDelete(true);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-sm text-black font-bold">Tasks</th>
              <th className="text-sm text-black font-bold">Operation</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <tr key={task.id}>
                <td className="w-full">{task.task}</td>
                <td className="flex gap-5">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(task.id, task.task)}
                  >
                    <FiEdit
                      className="text-blue-500 cursor-pointer"
                      size={25}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenDeleteModal(task.id)} // Open delete modal
                  >
                    <FaTrashRestoreAlt
                      className="text-red-500 cursor-pointer"
                      size={25}
                    />
                  </button>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
      <Model modelOpen={openModelEdit} setModelOpen={setOpenModelEdit}>
        <form onSubmit={handleSubmitEditTodo}>
          <h3 className="font-bold text-lg">Edit Task</h3>
          <div className="modal-action">
            <input
              value={taskTOEdit}
              onChange={(e) => setTaskTOEdit(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-warning w-full"
            />
            <button type="submit" className="btn btn-neutral">
              Submit
            </button>
          </div>
        </form>
      </Model>
      <Model
        modelOpen={openModelDelete}
        setModelOpen={setOpenModelDelete}
      >
        <div>
          <h3 className="font-bold ml-5 text-lg">
            Are You Sure To Delete This Task?
          </h3>
          <div className="modal-action">
            <button className="btn bg-red-700 text-white hover:bg-red-500" onClick={handleSubmitDeleteTodo}>Yes</button>
            <button className="btn btn-neutral" onClick={() => setOpenModelDelete(false)}>No</button>
          </div>
        </div>
      </Model>
    </div>
  );
};

export default TodoList;
