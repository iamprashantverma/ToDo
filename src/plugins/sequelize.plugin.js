const fp = require("fastify-plugin");
const {sequelize} = require("../config/sequelize");
require("../models");

module.exports = fp(async function (fastify) {
    try  {
        await sequelize.authenticate();
        fastify.log.info("DB Connected");

        await sequelize.sync({ alter: true });
        fastify.log.info("DB Synced");
        
        fastify.decorate("fastify",sequelize);

        fastify.addHook("onClose", async () => {
            fastify.log.info("Closing database connection");
            await sequelize.close();
        });
        
    } catch(err){
        fastify.log.error(err,"DB Connection failed");
        process.exit(1);
    }
    
})