import IMatches from '../interfaces/Matches';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

const listMatch = async () => {
  const match = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  if (match === []) return null;

  return match;
};

const create = async (myBody: Matches) => {
  const { homeTeam, awayTeam } = myBody;

  const validHomeTeam = await Matches.findByPk(homeTeam);
  const validAwayTeam = await Matches.findByPk(awayTeam);

  if (!validHomeTeam || !validAwayTeam) return null;

  const match = await Matches.create(myBody);

  return match;
};

const patchMatches = async (id: number) => {
  const matche = await Matches.findByPk(id);

  if (matche) {
    await Matches.update({ inProgress: 0 }, { where: { id } });

    return true;
  }

  return false;
};

const updateMatches = async (id: number, body: IMatches) => {
  const { homeTeamGoals, awayTeamGoals } = body;
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  return true;
};

export { listMatch, create, patchMatches, updateMatches };
