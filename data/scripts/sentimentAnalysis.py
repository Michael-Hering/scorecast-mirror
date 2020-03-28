import random
import numpy as np
import string
import math
from collections import Counter
from nltk.corpus import stopwords

def training(posFile, negFile):
	#initializing counters
	posFreqs = Counter()
	negFreqs = Counter()
	freqs = Counter()
	#training with positive file
	with open(posFile, 'r') as pf:
	    lines = pf.read().splitlines()
	    #every line in file
	    for line in lines:
	    	words = line.split()
	    	#setting ID equal to variable
	    	ID = words[0]
	    	#removing ID from words
	    	words = words[1:]
	    	#every word in that line
	    	for word in words:
	    		#lowercase
	    		word = word.lower()
	    		#removing punctuation
	    		word = word.translate(str.maketrans('', '', string.punctuation))
	    		#only add non stopwords
	    		if word not in stopwords.words('english'):
	    			posFreqs[word] += 1
	    		else:
	    			pass

	with open(negFile, 'r') as pf:
	    lines = pf.read().splitlines()
	    #loop through every line in file
	    for line in lines:
	    	words = line.split()
	    	#setting ID
	    	ID = words[0]
	    	#removing ID from words
	    	words = words[1:]
	    	#every word in that line
	    	for word in words:
	    		#lowercase
	    		word = word.lower()
	    		#removing punctuation
	    		word = word.translate(str.maketrans('', '', string.punctuation))
	    		#only add non stopwords
	    		if word not in stopwords.words('english'):
	    			negFreqs[word] += 1
	    		else:
	    			pass

	#creating one counter with all pos/neg data
	freqs = posFreqs + negFreqs
	return freqs, posFreqs, negFreqs

def probFinder(testFile, freqs, posFreqs, negFreqs):
	V = len(freqs)
	output = []
	with open(testFile, 'r') as tf:
		lines = tf.read().splitlines()
		for line in lines:
			words = line.split()
			#setting ID
			ID = words[0]
			words = words[1:]
			posProb = []
			negProb = []
			for word in words:
				word = word.lower()
				if freqs[word] != 0:
					#word is in freqs Counter
					posCount = posFreqs[word]
					negCount = negFreqs[word]
					posN = sum(posFreqs.values())
					negN = sum(negFreqs.values())
					#appending probability with add one smoothing
					posProb.append((posCount + 1)/(posN + V))
					negProb.append((negCount + 1)/(negN + V))
				else:
					#word not in either classifier
					pass
			#multiplying them all together
			totalPosProb = 0.5*np.prod(posProb)
			totalNegProb = 0.5*np.prod(negProb)
			#print(totalPosProb, totalNegProb)
			if totalPosProb <= totalNegProb:
				#if underflow occurs, sentence will be evaluated as NEG
				#or if tie occurs
				output.append("%s NEG" % ID)
			else:
				output.append("%s POS" % ID)

	return output

#setting file names
posFile = "data/positive-train.txt"
negFile = "data/negative-train.txt"
# testFile = "test.txt" //TWEETS

#training the data
freqs, posFreqs, negFreqs = training(posFile, negFile)
# output = probFinder(testFile, freqs, posFreqs, negFreqs)
# ----- OUTPUTTING TO FILE ---- #
with open('Matheson-Ian-assgn3-out.txt', 'w') as text_file:
	for i in range(len(output)):
		text_file.write("%s\n" % output[i])



