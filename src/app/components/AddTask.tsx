"use client";
import React, { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Model from "./model";
import { addTodo } from "@/Api";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
const AddTask = () => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const router = useRouter();

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    await addTodo({
      id: uuidv4(),
      task: newTaskValue,
    });
    setNewTaskValue("");
    setModelOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        className="btn btn-primary w-full"
        onClick={() => setModelOpen(true)}
      >
        Add new task <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <Model modelOpen={modelOpen} setModelOpen={setModelOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-warning w-full "
            />
            <button type="submit" className="btn btn-neutral">
              Submit
            </button>
          </div>
        </form>
      </Model>
    </div>
  );
};

export default AddTask;
