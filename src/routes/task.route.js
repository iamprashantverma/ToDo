const { taskController } = require("../controllers/task.controller");
const { createTaskSchema } = require("../validation/task.validation");
const { idParamSchema } = require("../validation/idParam.validation");
const { paginationSchema } = require("../validation/pagination.validation");

const taskRoutes = async (fastify) => {

  fastify.addHook("onRequest", fastify.authenticate);

  fastify.post("/", { schema: createTaskSchema }, taskController.create);
  fastify.get("/", { schema: paginationSchema }, taskController.getAllTaskByUserId);
  fastify.get("/:id", { schema: idParamSchema }, taskController.getTaskById);
  fastify.patch("/:id/complete", { schema: idParamSchema }, taskController.markTaskAsCompleted);

};

module.exports = taskRoutes;
