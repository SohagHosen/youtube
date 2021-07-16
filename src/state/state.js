export const initialState = {
    videos:[],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "FATCHING_VIDOES":
        return { ...state, videos: [...action.value] };
    default:
        return state
  }
};
