require("dotenv").config();

const fastify = require("fastify")({
  logger: true
});


fastify.get("/", async () => {
  return { message: "Hello, Good Morning" };
});

// Get name
fastify.get("/:name", async (request) => {
  const { name } = request.params;
  return { message: `Hello ${name}` };
});

fastify.get("/welcome",async(request)=>{
  return {message:"Welcome to GitHub Actions"};
})

fastify.get("/sum/:a/:b",async(request)=>{
  return{sum:a + b};
})
// Start server
const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0"
    });
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
