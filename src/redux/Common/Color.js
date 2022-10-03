import { CHANGE_BACKGROUND } from "./Types";

const initvalue = {
  status : true,
  colorPrimary : "#ee4d2d",
  colorBackgroungLight : 'white',
  colorTextLight : 'white',
  colorTextDark : '#212529',
  mainColorText : '#212529',
  mainColorStartRatingDark : 'rgba(0, 0, 0, 0.26)',
  mainColorStartRatingLight : 'white',
  mainColorRating : 'rgba(0, 0, 0, 0.26)',
  colorBackgroungDark : '#0B1A2F',
  colorBackgroungDarkBlue : '#061E3C',
  colorBackgroungLight2 : 'rgb(244, 244, 244)',
  mainBackGround : 'white',
  mainBackGround2 : 'rgb(244, 244, 244)'
};
const commonReducer = (state = initvalue, action) => {
  switch (action.type) {
    case CHANGE_BACKGROUND:
      if(state.status){
        return {
          ...state,
          mainBackGround : state.colorBackgroungDark,
          mainBackGround2 : state.colorBackgroungDarkBlue,
          mainColorText:state.colorTextLight,
          mainColorRating : state.mainColorStartRatingLight,
          status : !state.status
        }
      }
      else {
        return {
          ...state,
          mainBackGround : state.colorBackgroungLight,
          mainBackGround2 : state.colorBackgroungLight2,
          mainColorText:state.colorTextDark,
          mainColorRating : state.mainColorStartRatingDark,
          status : !state.status
        }
      }
      
    default:
      return state;
  }
};
export default commonReducer;
