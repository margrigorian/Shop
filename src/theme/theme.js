import { createTheme, Modal } from "@mui/material";

const theme = createTheme({
    
    palette: {
        primary: {
            main: "#ececec"
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                border: "1px dashed #f00"
            }
        }
    }
  });
  
export default theme;
