const { peppercorn, tuna } = require("./colors");

const commonLabelStyle = {
    fontFamily: 'IBM Plex Sans, Helvetica Neue, Arial, sans-serif',
	fontSize: '0.75rem',
	fontWeight: 300,
	letterSpacing: 0,
	lineHeight: '1em',
}

const buttonLabelStyle = {
    ...commonLabel,
    color: peppercorn,
}

const groupedFieldLabelStyle = {
    ...commonLabel,
    color: tuna,
}

const checkboxStyle = {
    border: 'solid 1px peppercorn',
    borderRadius: 2,
    height: '1em',
    width: '1em',
}

export {
    buttonLabelStyle,
    groupedFieldLabelStyle,
    checkboxStyle,
}