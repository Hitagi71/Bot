const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
})

module.exports = {
    marry : sequelize.define('marry',{
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
        },
    }),

    user : sequelize.define('user',{
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
        },
        coins: Sequelize.INTEGER
    }),

    user_marry : sequelize.define('user_marry', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
        },
        user: Sequelize.INTEGER,
        character: Sequelize.STRING
    }),

    character : sequelize.define('character', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
    
        },
        value: Sequelize.INTEGER,
    }),

    anime : sequelize.define('anime', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
    
        },
    }),

    character_photos : sequelize.define('character_photos', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
    
        },
    }),
}