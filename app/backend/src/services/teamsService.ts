import { ITeam } from '../interfaces/teams';
import Teams from '../database/models/Teams';

const getAllTeams = async (): Promise<ITeam[] | null> => {
  const team = await Teams.findAll({ raw: true }) as ITeam[];

  return team;
};

const getByIdTeams = async (id: string) => {
  const idTeams = await Teams.findByPk(id);

  return idTeams;
};

export { getAllTeams, getByIdTeams };
