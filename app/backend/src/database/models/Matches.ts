import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public id?: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matches.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    homeTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'home_team',
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    homeTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'home_team_goals',
    },
    awayTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'away_team',
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    awayTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'away_team_goals',
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'in_progress',
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam', as: 'teamHome',
});
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeam', as: 'teamHome',
});
Teams.hasMany(Matches, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

export default Matches;
