import { createTheme } from "@material-ui/core/styles";
const darkTheme = createTheme({
  type: "dark",
  palette: {
    primary: {
      main: "#1E2040",
      light: "#323965",
      dark: "#12132D",
      contrastText: "#fff",
      gray: "#b9b9b9",
    },
  },
});
const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#F7F7F7",
      light: "#FFFFFF",
      dark: "#DFE3EE",
      contrastText: "#000",
      gray: "#6b6b6b",
    },
  },
});
export const initialState = {
  videos: [],
  searchResults:[],
  theme:  darkTheme ,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FATCHING_VIDOES":
      return { ...state, videos: [...action.value] };
    case "CHANGE_THEME":
      if (action.value) {
        return { ...state, theme: lightTheme };
      } else {
        return { ...state, theme: darkTheme };
      }
    case "SEARCHING_VIDEOS":
      return { ...state, searchResults: [...action.value] };
    default:
      return state;
  }
};
