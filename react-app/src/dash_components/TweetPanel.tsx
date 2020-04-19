import React, { useState } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

const { TwitterTweetEmbed } = require('react-twitter-embed')

export const TweetPanel = ({ city }: Props) => {
    // Set up a state for the function
    const [tweetState, setTweetState] = useState({
        loaded: false,
        city: city,
        tweetComponents: null,
    })

    // Check if the city on the state is stale, if so we want to hit our API and re-render
    if (tweetState.city != city) {
        tweetState.loaded = false
    }

    if (!tweetState.loaded) {
        // Get the tweets for our city, and update our state when done
        axios
            .post('http://localhost:5000/api/tweets', { topic: city })
            .then((res: any) => {
                const components: any = []
                res.data.forEach((tweetRes: any) => {
                    const tweet = JSON.parse(tweetRes)
                    components.unshift(
                        <TwitterTweetEmbed
                            tweetId={tweet.id_str}
                            key={uuid()}
                            theme="dark"
                        />
                    )
                })

                // State update
                setTweetState({
                    loaded: true,
                    city: city,
                    tweetComponents: components,
                })
            })

        // State indicated tweets are loading, show a spinner
        return (
            <DashPanel dashLocation={'twitter'} dashName={'Live Tweets'}>
                <div
                    style={{
                        margin: '55% auto auto auto',
                        width: '10%',
                        height: '10%',
                    }}
                >
                    <Spinner animation="grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </DashPanel>
        )
    } else {
        // State indicated tweets are ready, display them
        return (
            <DashPanel dashLocation={'twitter'} dashName={'Live Tweets'}>
                {tweetState.tweetComponents}
            </DashPanel>
        )
    }
}

interface Props {
    city: string
}
