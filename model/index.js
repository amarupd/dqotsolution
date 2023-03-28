const dbConn = require("../config/dbconfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    dbConn.DB,
    dbConn.USER,
    dbConn.PASSWORD,
    {
        host: dbConn.HOST,
        dialect: dbConn.DIALECT,
        operatorsAliases: false,

        pool: {
            max: dbConn.pool.max,
            min: dbConn.pool.min,
            acquire: dbConn.pool.acquire,
            idle: dbConn.pool.idle

        }
    }
)
sequelize.authenticate()
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.log('error:' + err);
    })
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//requiring all the information from the tables 

db.signup = require("./signupmodel")(sequelize, DataTypes);


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('resync done');
    })



module.exports = db;
