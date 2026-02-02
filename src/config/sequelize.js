const {Sequelize}  = require("sequelize");
const config = require("../config/config");

const env = process.env.NODE_ENV || "development"

const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        ...dbConfig,
        define: {
            timestamps: true,
            underscored: true,
            },
        logging:false
    }
)

module.exports = {sequelize};
