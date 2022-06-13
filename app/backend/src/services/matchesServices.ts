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

const create = async () => {
  const match = await Matches.create({
    homeTeam: 4,
    awayTeam: 9,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  });

  return match;
};

const patchMatches = async (id: number) => {
  const matche = await Matches.findByPk(id);

  if (matche) {
    await Matches.update({ inProgress: false }, { where: { id } });

    return true;
  }

  return false;
};

export { listMatch, create, patchMatches };
