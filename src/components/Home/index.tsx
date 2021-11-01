import React from "react"
import { hot } from "react-hot-loader/root"
import "./index.less"
import MainSection from "./MainSection"
import {
	SectionOne,
	SectionTwo,
	SectionTest2
} from "./DisplaySections"

@hot
class App extends React.Component {
	render() {
		return (
			<>
				<MainSection />
				<SectionOne />
				<SectionTwo />
				<SectionTest2 />
			</>
		)
	}
}

export default App