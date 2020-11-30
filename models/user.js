const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create user model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITIONS
        id: {
            //use special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //equivalent of SQL's notnull option
            allowNull: false,
            //instruct that this is primary key
            primaryKey: true,
            //autoincrement
            autoIncrement: true
        }, 
       username: {
           type: DataTypes.STRING,
           allowNull: false
       },
       email: {
           type: DataTypes.STRING,
           allowNull: false,
           //no duplicate values
           unique: true,
           //if allow null set to false, we can run data through validation
           validate: {
               isEmail: true
           }
       },
       password: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               //password must be at least 4 characters long
               len: [4]
           }
       }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE

        //PASS IN IMPORTED SEQULIZE CONNECTION
        sequelize,
        //dont automatically create CreatedAT/updtedAT timestamp fields
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName: true,
        //use undercores instead of camel casing
        underscored: true,
        //make it so our model name stays lowercase
        modelName: 'user'
    }
);

module.exports = User;