import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

const listMatch = async () => {
  const match = await Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: [['team_name', 'nameTeam']] },
      { model: Teams, as: 'awayTeam', attributes: [['team_name', 'nameTeam']] },
    ],
  });

  return match;
};

export default listMatch;
