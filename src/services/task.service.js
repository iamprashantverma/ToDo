const Task = require("../models/task.model");
const { NotFoundError, UnauthorizedError,ConflictError } = require("../errors/index");

const taskService = {

  // Create a task
  async create(payload) {
    const { title, deadline, userId } = payload;

    const task = await Task.create({
      title,
      deadline,
      user_id: userId,
    });

    return task;
  },

  //  Get ALL tasks by userId with pagination
  async getAllTaskByUserId(userId, options = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await Task.findAndCountAll({
      where: { user_id: userId },
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    if (!rows.length) {
      throw new NotFoundError("No tasks found for this user");
    }

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  //  Get SINGLE task by taskId
   async getTaskById(taskId, userId) {
    const task = await Task.findByPk(taskId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    //  Ownership check
    if (task.user_id !== userId) {
      throw new UnauthorizedError("You are not allowed to access this task");
    }

    return task;
  },
  
  async markTaskAsCompleted(taskId, userId) {
    const task = await Task.findByPk(taskId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // Ownership check
    if (task.user_id !== userId) {
      throw new UnauthorizedError("You are not allowed to update this task");
    }

    // Already completed check
    if (task.completed === true) {
      throw new ConflictError("Task is already marked as completed");
    }

    task.completed = true;
    await task.save();

    return task;
  },

};

module.exports = { taskService };
