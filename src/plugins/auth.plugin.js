const fp = require("fastify-plugin");

async function authPlugin(fastify) {

    fastify.decorate("authenticate", async function (request) {
        await request.jwtVerify();
    });
}

module.exports = fp(authPlugin);