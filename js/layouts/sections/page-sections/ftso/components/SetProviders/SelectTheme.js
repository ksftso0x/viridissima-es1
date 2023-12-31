
const getSelectTheme = (theme) => ({
        /*
        * multiValue(remove)/color:hover
        */
        danger: 'purple',

        /*
         * multiValue(remove)/backgroundColor(focused)
         * multiValue(remove)/backgroundColor:hover
         */
        dangerLight: theme.palette.grey[200],

        /*
         * control/backgroundColor
         * menu/backgroundColor
         * option/color(selected)
         */
        neutral0: theme.palette.background.default,

        /*
          * control/backgroundColor(disabled)
         */
        neutral5: "orange",

        /*
         * control/borderColor(disabled)
         * multiValue/backgroundColor
         * indicators(separator)/backgroundColor(disabled)
         */
        neutral10: '#222',

        /*
         * control/borderColor
         * option/color(disabled)
         * indicators/color
         * indicators(separator)/backgroundColor
         * indicators(loading)/color
         */
        neutral20: theme.palette.secondary,

        /*
         * control/borderColor(focused)
         * control/borderColor:hover
         */
        // this should be the white, that's normally selected
        neutral30: theme.palette.text.secondary,

        /*
         * menu(notice)/color
         * singleValue/color(disabled)
         * indicators/color:hover
         */
        neutral40: 'green',

        /*
         * placeholder/color
         */
        // seen in placeholder text
        neutral50: theme.palette.action,

        /*
         * indicators/color(focused)
         * indicators(loading)/color(focused)
         */
        neutral60: 'purple',
        neutral70: 'purple',

        /*
         * input/color
         * multiValue(label)/color
          * singleValue/color
         * indicators/color(focused)
         * indicators/color:hover(focused)
         */
        neutral80: '#3c3',

        // no idea
        neutral90: "pink",

        /*
         * control/boxShadow(focused)
         * control/borderColor(focused)
         * control/borderColor:hover(focused)
         * option/backgroundColor(selected)
         * option/backgroundColor:active(selected)
         */
        primary: theme.palette.text.secondary,

        /*
         * option/backgroundColor(focused)
         */
        primary25: '#333',

        /*
         * option/backgroundColor:active
         */
        primary50: theme.palette.background.paper,
        primary75: theme.palette.background.paper,
    })

export default getSelectTheme;
