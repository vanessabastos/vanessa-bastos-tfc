import { ITeam } from '../interfaces/Teams';
import Teams from '../database/models/Teams';

const getAllTeams = async (): Promise<ITeam[] | null> => {
  const team = await Teams.findAll({ raw: true }) as ITeam[];

  return team;
};

const getAllTeamsName = async () => {
  const teams = await Teams.findAll();

  return teams;
};

const getByIdTeams = async (id: string) => {
  const idTeams = await Teams.findByPk(id);

  return idTeams;
};

export { getAllTeams, getByIdTeams, getAllTeamsName };
