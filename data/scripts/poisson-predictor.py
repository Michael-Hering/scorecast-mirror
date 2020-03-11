import numpy as np
import pandas as pd
from scipy.stats import poisson

# Poisson class
class PoissonPredictor:

    def __init__(self, data):
        self.data = data # Dataframe
        self.teams = self.collectTeams() # Dictionary of
        print(self.teams)
    
    def collectTeams(self):

        return dict(zip([i for i in range(0,20)], np.sort(self.data.HomeTeam.unique())))

    def showTeamIds(self):
        print('id | team\n---------')
        for key, value in self.teams.items():
            print(key, ' | ', value)

        return

    def getLeagueAverageHomeGoals(self):

        return np.sum(self.data['FTHG']) / self.getTotalMatches()

    def getLeagueAverageAwayGoals(self):

        return np.sum(self.data['FTAG']) / self.getTotalMatches()

    def getHomeTeamGoals(self, team_id):

        return np.sum(self.data.loc[self.data["HomeTeam"] == self.teams[team_id], 'FTHG'])

    def getAwayTeamGoals(self, team_id):

        return np.sum(self.data.loc[self.data["AwayTeam"] == self.teams[team_id], 'FTAG'])
    
    def getHomeTeamCondeded(self, team_id):

        return np.sum(self.data.loc[self.data["HomeTeam"] == self.teams[team_id], 'FTAG'])
    
    def getAwayTeamConceded(self, team_id):

        return np.sum(self.data.loc[self.data["AwayTeam"] == self.teams[team_id], 'FTHG'])

    def getHomeMatchesPlayed(self, team_id):

        return (self.data['HomeTeam'] == self.teams[team_id]).sum()

    def getAwayMatchesPlayed(self, team_id):

        return (self.data['AwayTeam'] == self.teams[team_id]).sum()
    
    def getTotalMatches(self):
        
        return self.data.shape[0]

    def predictHomeGoals(self, home_team_id, away_team_id):

        # calculate home attack strength
        home_average_goals = self.getHomeTeamGoals(home_team_id) / self.getHomeMatchesPlayed(home_team_id)
        home_attack_strength = home_average_goals / self.getLeagueAverageHomeGoals()

        # calculate away defensive strength
        away_avg_goals_conceded = self.getAwayTeamConceded(away_team_id) / self.getAwayMatchesPlayed(away_team_id)
        away_defensive_strength = away_avg_goals_conceded / self.getLeagueAverageHomeGoals()

        # calculate likely number of goals home team will score
        return home_attack_strength * away_defensive_strength * self.getLeagueAverageHomeGoals()

    def predictAwayGoals(self, home_team_id, away_team_id):

        # calculate away attack strength
        away_average_goals = self.getAwayTeamGoals(away_team_id) / self.getAwayMatchesPlayed(away_team_id)
        away_attack_strength = away_average_goals / self.getLeagueAverageAwayGoals()

        # calculate home defensive strength
        home_avg_goals_conceded = self.getHomeTeamCondeded(home_team_id) / self.getHomeMatchesPlayed(home_team_id)
        home_defensive_strength = home_avg_goals_conceded / self.getLeagueAverageAwayGoals()

        # calculate likely number of goals home team will score
        return away_attack_strength * home_defensive_strength * self.getLeagueAverageAwayGoals()

    def predict(self, home_team_id, away_team_id):

        print('------------{} (h) vs {} (a)------------'.format(self.teams[home_team_id], self.teams[away_team_id]))

        home_pred_goals = self.predictHomeGoals(home_team_id, away_team_id)
        away_pred_goals = self.predictAwayGoals(home_team_id, away_team_id)

        print('{} (h) predicted average goals: {}'.format(self.teams[home_team_id], home_pred_goals))
        print('{} (a) predicted average goals: {}'.format(self.teams[away_team_id], away_pred_goals))

        home_goal_probs = [poisson.pmf(i, home_pred_goals) * 100 for i in range(0,6)]
        away_goal_probs = [poisson.pmf(i, away_pred_goals) * 100 for i in range(0,6)]

        print('# of Goal Probabilities (0-5):')
        print(home_goal_probs)
        print(away_goal_probs)

        print('Predicted final score:')
        print('{} - {}'.format(home_goal_probs.index(max(home_goal_probs)), away_goal_probs.index(max(away_goal_probs))))
        
        print('------------------------------------------------')
        print(' ')

        return


def main():
    fixture_df = pd.read_csv('./data/Premier League/19-20/E0.csv')

    pp = PoissonPredictor(fixture_df)
    pp.showTeamIds()

    fixtures_this_weekend = [(13,8), (1,14), (3,6), (2,5), (12,4), (18,15), (17,9), 
                            (10,0), (7,11), (16,19)]

    for fixture in fixtures_this_weekend:
        pp.predict(fixture[0],fixture[1])

if __name__ == "__main__":
    main()