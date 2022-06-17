import { getAllTeamsName } from './teamsService';
import Matches from '../database/models/Matches';

const getHomeTeamTotalPoints = async (homeTeamMatches: Matches[]) => {
  let totalPoints = 0;

  homeTeamMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) totalPoints += 3;
    if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
  });

  return totalPoints;
};

const getHomeTeamTotalVictories = async (homeTeamMatches: Matches[]) => {
  let victories = 0;

  homeTeamMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) victories += 1;
  });

  return victories;
};

const getHomeTeamTotalDraws = async (homeTeamMatches: Matches[]) => {
  let draws = 0;

  homeTeamMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals === awayTeamGoals) draws += 1;
  });

  return draws;
};

const getHomeTeamTotalLosses = async (homeTeamMatches: Matches[]) => {
  let losses = 0;

  homeTeamMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) losses += 1;
  });

  return losses;
};

const getHomeTeamGoalsFavor = async (homeTeamMatches: Matches[]) => {
  let goalsFavor = 0;

  homeTeamMatches.forEach(({ homeTeamGoals }) => {
    goalsFavor += homeTeamGoals;
  });

  return goalsFavor;
};

const getHomeTeamGoalsOwn = async (homeTeamMatches: Matches[]) => {
  let goalsOwn = 0;

  homeTeamMatches.forEach(({ awayTeamGoals }) => {
    goalsOwn += awayTeamGoals;
  });

  return goalsOwn;
};

const getHomeTeamGoalsBalance = async (goalsFavor: number, goalsOwn: number) => {
  const goalsBalance = goalsFavor - goalsOwn;

  return goalsBalance;
};

const getHomeTeamEfficiency = async (totalPoints: number, totalGames: number) => {
  const efficiency: number = (totalPoints / (totalGames * 3)) * 100;

  const isInteger = Number.isInteger(efficiency);

  const twoFractionDigits = efficiency.toFixed(2);

  const efficiencyFormated = isInteger ? efficiency : +twoFractionDigits;

  return efficiencyFormated;
};

interface LeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

const teamLeaderBoardInfos = async (name: string, id: number): Promise<LeaderBoard> => {
  const homeTeamMatches = await Matches.findAll({ where: { homeTeam: id, inProgress: false } });

  const goalsFavor = await getHomeTeamGoalsFavor(homeTeamMatches);
  const goalsOwn = await getHomeTeamGoalsOwn(homeTeamMatches);
  const totalPoints = await getHomeTeamTotalPoints(homeTeamMatches);
  const totalGames = homeTeamMatches.length;

  const teamInfos = {
    name,
    totalPoints,
    totalGames,
    totalVictories: await getHomeTeamTotalVictories(homeTeamMatches),
    totalDraws: await getHomeTeamTotalDraws(homeTeamMatches),
    totalLosses: await getHomeTeamTotalLosses(homeTeamMatches),
    goalsFavor,
    goalsOwn,
    goalsBalance: await getHomeTeamGoalsBalance(goalsFavor, goalsOwn),
    efficiency: await getHomeTeamEfficiency(totalPoints, totalGames),
  };

  return teamInfos;
};

const orderByTotalVictories = (leaderBoard: LeaderBoard[]) => {
  const biggerTotalVictories = leaderBoard
    .sort((a: LeaderBoard, b: LeaderBoard) => {
      const equalPoints = a.totalPoints === b.totalPoints;

      if (equalPoints && a.totalVictories < b.totalVictories) {
        return 1;
      }
      if (equalPoints && a.totalVictories > b.totalVictories) {
        return -1;
      }
      return 0;
    });

  return biggerTotalVictories;
};

const orderByGoalsBalance = (leaderBoard: LeaderBoard[]) => {
  const biggerGoalsBalance = leaderBoard
    .sort((a: LeaderBoard, b: LeaderBoard) => {
      const equalPoints = a.totalPoints === b.totalPoints;
      const equalVictories = a.totalVictories === b.totalVictories;

      if (equalPoints && equalVictories && a.goalsBalance < b.goalsBalance) {
        return 1;
      }
      if (equalPoints && equalVictories && a.goalsBalance > b.goalsBalance) {
        return -1;
      }
      return 0;
    });

  return biggerGoalsBalance;
};

const orderByGoalsFavor = (leaderBoard: LeaderBoard[]) => {
  const biggerGoalsFavor = leaderBoard
    .sort((a: LeaderBoard, b: LeaderBoard) => {
      const equalPoints = a.totalPoints === b.totalPoints;
      const equalVictories = a.totalVictories === b.totalVictories;
      const equalGoalsBalance = a.goalsBalance === b.goalsBalance;

      if (equalPoints && equalVictories && equalGoalsBalance
        && a.goalsFavor < b.goalsFavor
      ) {
        return 1;
      }
      if (equalPoints && equalVictories && equalGoalsBalance
        && a.goalsFavor > b.goalsFavor
      ) {
        return -1;
      }
      return 0;
    });
  return biggerGoalsFavor;
};

const orderByGoalsOwn = (leaderBoard: LeaderBoard[]) => {
  const lessGoalsOwn = leaderBoard
    .sort((a: LeaderBoard, b: LeaderBoard) => {
      const equalPoints = a.totalPoints === b.totalPoints;
      const equalVictories = a.totalVictories === b.totalVictories;
      const equalGoalsBalance = a.goalsBalance === b.goalsBalance;
      const equalGoalsFavor = a.goalsFavor === b.goalsFavor;
      if (equalPoints && equalVictories && equalGoalsBalance
        && equalGoalsFavor && a.goalsOwn < b.goalsOwn) {
        return 1;
      }
      if (equalPoints && equalVictories && equalGoalsBalance
        && equalGoalsFavor && a.goalsOwn > b.goalsOwn) {
        return -1;
      }
      return 0;
    });

  return lessGoalsOwn;
};

const orderLeaderBoard = (leaderBoard: LeaderBoard[]) => {
  const morePoints = leaderBoard
    .sort((a: LeaderBoard, b: LeaderBoard) => (a.totalPoints < b.totalPoints ? 1 : -1));

  const biggerVictoriesQuantity = orderByTotalVictories(morePoints);

  const biggerGoalsBalance = orderByGoalsBalance(biggerVictoriesQuantity);

  const biggerGoalsFavor = orderByGoalsFavor(biggerGoalsBalance);

  const lessGoalsOwn = orderByGoalsOwn(biggerGoalsFavor);

  return lessGoalsOwn;
};

const getHomeLeaderBoard = async () => {
  const teams = await getAllTeamsName();

  const leaderBoard: LeaderBoard[] = await Promise
    .all(teams.map(async ({ teamName, id }) => teamLeaderBoardInfos(teamName, id)));

  const leaderBoardOrdered = orderLeaderBoard(leaderBoard);

  return leaderBoardOrdered;
};

export default getHomeLeaderBoard;
