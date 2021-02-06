
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
        },
        coins: DataTypes.INTEGER,
        firstMarry: DataTypes.INTEGER
    },{
        timestamps: false
    })
}