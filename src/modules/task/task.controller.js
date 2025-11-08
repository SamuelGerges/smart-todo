import Task from "../../models/task.model.js";
import User from "../../models/user.model.js";
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
  const { _id: owner } = req.authUser;

  const tasks = await Task.find({
    owner: owner,
  });

  return res.json({
    message: "return tasks successfully",
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  const { _id: owner } = req.authUser;
  const { taskId } = req.params;
  const { title, description, dueDate } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, owner },
    { title, description, dueDate },
    { new: true }
  );

  if (!task) {
    return next(
      new ErrorHandlerClass(
        403,
        "Failed update",
        "Task not found",
        "update task"
      )
    );
  }

  res.status(200).json({ message: "Task updated successfully", task });
};

export const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { _id: owner } = req.authUser;

  // const task = await Task.findOneAndDelete({ _id: taskId, owner });

  const task = await Task.findOneAndUpdate(
    { _id: taskId, owner, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!task) {
    return next(
      new ErrorHandlerClass(
        403,
        "Failed update",
        "Task not found",
        "delete task"
      )
    );
  }

  res.status(200).json({ message: "Task deleted successfully" });
};

export const updateTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { _id: owner } = req.authUser;
  const { status } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, owner, isDeleted: false },
    { status: status },
    { new: true }
  );

  if (!task) {
    return next(
      new ErrorHandlerClass(
        403,
        "Failed update",
        "Task not found",
        "update Status task"
      )
    );
  }

  res.status(200).json({ message: "Task Status updated successfully", task });
};

export const shareTask = async (req, res, next) => {
  const { _id: owner } = req.authUser;
  const { taskId } = req.params;
  const { sharedWith } = req.body;

  const validUsers = await User.find({
    _id: { $in: sharedWith },
    isConfirmed: true,
  });

  if (validUsers.length !== sharedWith.length) {
    return next(
      new ErrorHandlerClass(
        403,
        "Failed Shared",
        "One or more users do not exist",
        "Shared task task"
      )
    );
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, owner, isDeleted: false },
    { sharedWith: sharedWith },
    { new: true }
  );

  if (!task) {
    return next(
      new ErrorHandlerClass(
        403,
        "Failed update",
        "Task not found",
        "Shared task"
      )
    );
  }

  res.status(200).json({ message: "Task Shared updated successfully", task });
};
