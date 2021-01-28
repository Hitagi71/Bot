module.exports = (sequelize, DataTypes) => {
    return  sequelize.define('user_marry', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
        },
        user: DataTypes.INTEGER,
        character: DataTypes.STRING
    },{
        timestamps: false
    })
}