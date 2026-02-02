require("dotenv").config();
const app = require("fastify")({
    logger:{
        level:process.env.LOG_LEVEL || "info"
    },
    ajv:{
        plugins:[require("ajv-errors")],
        customOptions:{
            allErrors:true
        }
    }
})
app.register(require("@fastify/cors"),{
    origin:true,
})
app.register(require("./plugins/sequelize.plugin"));
app.register(require("./plugins/jwt.plugin"));  
app.register(require("./plugins/auth.plugin")); 
app.register(require("./plugins/ajv.plugin"));
app.register(require("./plugins/error-handler.plugin"));

app.register(require("./routes/health.route"), { prefix: "/api/health" });
app.register(require("./routes/auth.route"), { prefix: "/api/auth" });
app.register(require("./routes/task.route"), { prefix: "/api/task" });

const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

module.exports = app;