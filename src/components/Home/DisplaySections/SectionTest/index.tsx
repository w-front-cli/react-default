import { animated, AnimatedProps, useSpringRef, useTransition } from "@react-spring/web"
import React, { CSSProperties, useCallback, useEffect, useState } from "react"
import styles from './index.module.less'

const HorPages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = [
  ({ style }) => <animated.div style={{...style, background: "lightpink"}}>A</animated.div>,
  ({ style }) => <animated.div style={{...style, background: "lightblue"}}>B</animated.div>,
  ({ style }) => <animated.div style={{...style, background: "lightgreen"}}>C</animated.div>,
]

const SectionTest: React.FC = () => {
  const [index, setIndex] = useState(0)
  const onClick = useCallback(() => setIndex(index => (index + 1) % 3), [])
  const transRef = useSpringRef()
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: {
      opacity: 1,
      transform: "translate3d(100%, 0, 0)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%, 0, 0)",
    },
    leave: {
      opacity: 1,
      transform: "translate3d(-100%, 0, 0)",
    },
  })

  useEffect(() => {
    transRef.start()
  }, [index])

  return (
    <div className={styles.container} onClick={onClick}>
      {transitions((style, i) => {
        const Page = HorPages[i]
        return (
          <Page style={style}/>
        )
      })}
    </div>
  )
}

export default SectionTest