import React, { useCallback, useEffect, useState } from "react"
import { 
	useSpring, 
	config, 
	animated, 
	useSpringRef, 
	useTransition,
	useChain
} from "react-spring"
import styles from "./index.module.less"
import Data from "./colorTrans.json"

const Mock: React.FC = () => {

	const [open, setOpen] = useState(false)

	//粉色方块放大并变色
	const springApi = useSpringRef()
	const { size, ...rest } = useSpring({
		ref: springApi,
		config: config.stiff,
		from: {
			size: "20%",
			background: "hotpink",
		},

		to: {
			size: open ? "100%" : "20%",
			background: open ? "white" : "hotpink",
		},
	})
	
	//12个方块淡入并放大
	const transApi = useSpringRef()
	const transition = useTransition(open ? Data : [], {
		ref: transApi,
		trail: 400 / Data.length,
		form: {
			opacity: 0,
			scale: 0,
		},
		enter: {
			opacity: 1,
			scale: 1,
		},
		leave: {
			opacity: 0,
			scale: 0,
		},
	})

	console.log(open)
	const chain = useCallback(() => {
		useChain(open ? [springApi, transApi] : [transApi, springApi], [0, open ? 0.1 : 0.6])
	}, [open])

	chain()
	return (
		<div className={styles.wrapper}>
			<animated.div
				style={{
					...rest,
					width: size,
					height: size,
				}}
				className={styles.container}
				onClick={() => setOpen(open => !open)}
			>
				{transition((style, item) => (
					<animated.div 
						className= {styles.item}
						style={{
							...style,
							background: item,
						}}
					/>
				))}
			</animated.div>

		</div>
	)
}

export default Mock