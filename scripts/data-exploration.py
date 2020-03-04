import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt 
import seaborn as sns

def countDraws(df_fixtures):
    fixture_ct = pd.crosstab(df_fixtures.FTHG, df_fixtures.FTAG)
    print(fixture_ct)
    # print('Total games: ' + fixture_ct.sum())
    # plt.pcolor(fixture_ct)
    # plt.yticks(np.arange(1, 8))
    # plt.xticks(np.arange(1, 9))
    # print('Total number of draws: '+ np.diag(fixture_ct.sum()))
    sns.heatmap(fixture_ct, annot=True)
    plt.show()

def main():
    df_fixtures = pd.read_csv('../data/Premier League/19-20/E0.csv')
    print(df_fixtures.head())
    countDraws(df_fixtures)

if __name__ == "__main__":
    main()