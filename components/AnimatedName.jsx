import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'

import styles from './AnimatedName.module.css'

const DEFAULT_TEXT_COLOR = 'lightgray'

export function AnimatedName ({ name = '', color = DEFAULT_TEXT_COLOR, startingIndices = [], shortDelay, longDelay, exitDelay }) {
  const [isHover, setIsHover] = useState(false)
  const [displayedLetters, setDisplayedLetters] = useState([])

  const letterTransitions = useTransition(displayedLetters, ({ key }) => key, {
    from: { opacity: 0, width: 0, height: 0, color: DEFAULT_TEXT_COLOR },
    enter: (item) => {
      return [
        { opacity: 1, width: 45, height: 90 },
        { color: item.color }
      ]
    },
    leave: [{ opacity: 0 }, { height: 0 }]
  })

  const buildStatus = useRef([])

  const reset = useCallback(() => {
    buildStatus.current.forEach(clearTimeout)
    buildStatus.current = []
    setDisplayedLetters([])

    if (shortDelay !== undefined) {
      buildStatus.current.push(setTimeout(() => {
        console.log('short')
        setDisplayedLetters(buildShortLetters())
      }, shortDelay))
    }

    if (longDelay !== undefined) {
    buildStatus.current.push(setTimeout(() => {
        console.log('long')
        setDisplayedLetters(buildLongLetters())
      }, longDelay))
    }

    if (exitDelay !== undefined) {
      buildStatus.current.push(setTimeout(() => {
        console.log('exit')
        setDisplayedLetters([])
      }, exitDelay))
    }
  }, [])

  useEffect(() => void reset(), [])

  function buildShortLetters () {
    return startingIndices.map((i) => ({
      key: i,
      letter: name[i],
      color
    }))
  }

  function buildLongLetters () {
    return name.split('').map((letter, i) => ({
      key: i,
      letter,
      color: startingIndices.includes(i) ? color : DEFAULT_TEXT_COLOR
    }))
  }

  return (
    <div className={styles.name} onMouseOver={() => { setIsHover(true) }} onMouseOut={() => { setIsHover(false) }}>
      {letterTransitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <span style={isHover ? { color } : {}}>{item.letter}</span>
        </animated.div>
      ))}
    </div>
  )
}
