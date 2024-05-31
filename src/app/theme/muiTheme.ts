"use server"

import { createTheme } from "@mui/system";
import '../globals.scss';

const createMuiTheme = async () => {

const theme = createTheme({
    typography: {
        fontFamily: "StarJediBlock",
    }
})

    return theme;
}

export default createMuiTheme;