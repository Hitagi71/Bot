const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

const Anime = require('./models/Anime')(sequelize, Sequelize.DataTypes)
const Character = require('./models/Character')(sequelize,Sequelize.DataTypes)
const CharacterPhotos = require('./models/CharacterPhotos')(sequelize,Sequelize.DataTypes)
const Marry = require('./models/Marry')(sequelize,Sequelize.DataTypes)
const User = require('./models/User')(sequelize,Sequelize.DataTypes)
const UserMarry = require('./models/UserMarry')(sequelize,Sequelize.DataTypes)

module.exports = {Anime, Character, CharacterPhotos, Marry, User, UserMarry}