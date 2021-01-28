
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('character_photos', {
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