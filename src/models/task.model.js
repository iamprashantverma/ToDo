const {DataTypes, Model} = require("sequelize");
const  {sequelize} = require("../config/sequelize");
class Task extends Model {}

Task.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    completed:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    deadline:{
        type:DataTypes.DATE,
        allowNull:false
    }
}, {
    sequelize,
    tableName: "tasks",
    modelName:"Task"
})

module.exports = Task;