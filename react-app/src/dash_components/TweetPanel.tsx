import React, { useState, ReactNode, useEffect, useRef } from 'react'
import { Colors } from 'common/colors/Colors'

import { v4 as uuid } from 'uuid'
import { DashPanel } from 'dash_components/DashPanel'
import { LoaderContainer, TweetsContainer, TweetBox } from './TweetPanelStyles'
import { TwitterTweetEmbed } from 'react-twitter-embed'

import Loader from 'react-spinners/PulseLoader'

export const TweetPanel = ({ city }: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [tweets, setTweets] = useState<ReactNode[]>([])

    const ref = useRef<HTMLDivElement>(null) // to get panel size

    useEffect(() => {
        const getTweets = async () => {
            setIsLoading(true)

            const tweetsArray: ReactNode[] = []

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: city }),
            }

            const response = await fetch(
                'http://localhost:5000/api/tweets',
                requestOptions
            )
            const data: any[] = await response.json()

            let maxTweetWidth = ref.current ? ref.current.offsetWidth : 10
            maxTweetWidth = maxTweetWidth > 500 ? 500 : maxTweetWidth

            for (let i = 0; i < data.length; i++) {
                const element = JSON.parse(data[i])
                tweetsArray.push(
                    <TweetBox key={uuid()} style={{ width: maxTweetWidth }}>
                        <TwitterTweetEmbed
                            tweetId={element.id_str}
                            key={uuid()}
                            options={{ theme: 'light', width: maxTweetWidth }}
                        />
                    </TweetBox>
                )
            }

            setTweets(tweetsArray)
            setIsLoading(false)
        }

        getTweets()
    }, [city])

    return !isLoading ? (
        <DashPanel dashLocation={'twitter'} dashName={'Live Tweets'}>
            <TweetsContainer>{tweets}</TweetsContainer>
        </DashPanel>
    ) : (
        <DashPanel dashLocation={'twitter'} dashName={'Live Tweets'}>
            <LoaderContainer ref={ref}>
                <Loader size={20} margin={10} color={Colors.White} />
            </LoaderContainer>
        </DashPanel>
    )
}

interface Props {
    city: string
}
