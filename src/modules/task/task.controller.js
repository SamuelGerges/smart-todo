import Task from "../../models/task.model.js";
import { ErrorHandlerClass } from "../../utils/error-handler.js";

export const addTask = async (req, res, next) => {
  const { _id: owner } = req.authUser;

  const { title, description, dueDate } = req.body;
  const newTask = {
    title: title,
    description: description,
    owner: owner,
  };

  const task = await Task.create(newTask);

  return res.json({
    message: "Task created Successfully",
    task,
  });
};


export const getTasks = async (req, res, next) => {
  const { _id: owner} =  req.authUser;

  const tasks = await Task.find(
    {
      owner: owner
    }
  );

  return res.json({
    message: "return tasks successfully",
    tasks
  })
}
