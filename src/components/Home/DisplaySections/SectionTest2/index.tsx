import { useSpring, config } from "@react-spring/core"
import { animated } from "@react-spring/web"
import React, { useState } from "react"
import useMesure from "react-use-measure"
import styles from "./index.module.less"

const SectionTest20: React.FC = () => {

  const [open, setOpen] = useState(false)
  //测量ref的宽度
  const [ref, { width }] = useMesure()
  const _props = useSpring({ width: open ? width : 0, config: config.slow})

  return (
    <div className={styles.container}>
      <div 
        ref={ref} 
        className={styles.main}
        onClick={() => setOpen(!open)}
      >
        <animated.div className={styles.fill} style={_props} />
        <animated.div className={styles.content}>
          {_props.width.to(x => x.toFixed(0))}
        </animated.div>
      </div>
    </div>
  )
}

const SectionTest21: React.FC = () => {

  return (
    <>
    </>
  )
}

export default SectionTest21