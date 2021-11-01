/* eslint-disable @typescript-eslint/no-explicit-any */
// import PropTypes from "prop-types"
// import React from "react"

declare module "*.module.less" {
    const classObj: { [name: string]: (string |undefined) }
    export default classObj
}

