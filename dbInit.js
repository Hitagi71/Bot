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

const force = process.argv.includes('--force') || process.argv.includes('-f')

sequelize.sync({ force }).then(async () => {
    const users = [
        User.upsert({ id: 1, coins:100 }),
        User.upsert({ id: 2, coins:200 }),
        User.upsert({ id: 3, coins:300 })
    ]
    await Promise.all(users)
    console.log('Database synced')
    sequelize.close()
}).catch(console.error)