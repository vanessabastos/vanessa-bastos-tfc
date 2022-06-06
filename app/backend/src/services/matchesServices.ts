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

export default listMatch;
