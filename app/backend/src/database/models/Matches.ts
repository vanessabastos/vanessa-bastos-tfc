import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },

  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },

  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },

  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },

  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, {
  foreignKey: 'homeTeam', as: 'homeTeam' });
Teams.hasMany(Matches, {
  foreignKey: 'awayTeam', as: 'awayTeam' });

export default Matches;
