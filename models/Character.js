module.exports = (sequelize, DataTypes) => {
    return sequelize.define('character', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey:true,
            autoIncrement:true,
    
        },
        value: DataTypes.INTEGER,
    },{
        timestamps: false
    })
}