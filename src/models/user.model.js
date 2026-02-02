const { DataTypes, Model }  = require("sequelize");
const {sequelize } = require("../config/sequelize");

class User extends Model {}

User.init({
    id:{
       type:DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true
    },
    name:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true,
        validate:{isEmail:true},
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false,
        }
    },{
        sequelize,
        tableName:"users",
        modelName:"User"
    })
module.exports = User;