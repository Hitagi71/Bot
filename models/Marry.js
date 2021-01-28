module.exports = (sequelize, DataTypes) => {
    return sequelize.define('marry', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
        },
    },{
        timestamps: false
    })
}