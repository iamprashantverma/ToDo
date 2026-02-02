const { taskService } = require("../services/task.service");

const taskController = {

  //  Create task
  async create(request, reply) {
    const task = await taskService.create({
      ...request.body,
      userId: request.user.id,
    });

    reply.code(201).send({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  },

  //  Get all tasks by userId with pagination
  async getAllTaskByUserId(request, reply) {
    const { page, limit } = request.query;

    const result = await taskService.getAllTaskByUserId(
      request.user.id,
      { page, limit }
    );

    reply.code(200).send({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  },

  //  Get single task by taskId 
  async getTaskById(request, reply) {
    
    const { id } = request.params;

    const task = await taskService.getTaskById(id, request.user.id );

    reply.code(200).send({
      success: true,
      data: task,
    });
  },

  async markTaskAsCompleted(request, reply) {
    const { id } = request.params;

    const task = await taskService.markTaskAsCompleted( id, request.user.id );

    reply.code(200).send({
      success: true,
      message: "Task marked as completed",
      data: task,
    });
  },

};

module.exports = { taskController };
