module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // description: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button_text: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "More",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Event.associate = (models) => {};

  return Event;
};
