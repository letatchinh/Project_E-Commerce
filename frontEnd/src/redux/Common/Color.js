import { CHANGE_BACKGROUND } from "./Types";

const initvalue = {
  status : true,
  colorPrimary : "#ee4d2d",
  colorBackgroungLight : 'white',
  colorTextLight : 'rgb(178, 186, 194)',
  colorTextDark : '#212529',
  mainColorText : '#212529',
  mainTextShadow : 'none',
  mainColorStartRatingDark : 'rgba(0, 0, 0, 0.26)',
  mainColorStartRatingLight : 'white',
  mainColorRating : 'rgba(0, 0, 0, 0.26)',
  colorBackgroungDark : '#0B1A2F',
  colorBackgroungDarkBlue : '#061E3C',
  colorBackgroungLight2 : 'rgb(244, 244, 244)',
  mainBackGround : 'white',
  mainBackGround2 : 'rgb(244, 244, 244)',
};
const MyColorCommonReducer = (state = initvalue, action) => {
  switch (action.type) {
    case CHANGE_BACKGROUND:
      if(state.status){
        return {
          ...state,
          mainBackGround : state.colorBackgroungDark,
          mainBackGround2 : state.colorBackgroungDarkBlue,
          mainColorText:state.colorTextLight,
          mainTextShadow: '0 0 25px #0080ff',
          mainColorRating : state.mainColorStartRatingLight,
          status : false
        }
      }
      else {
        return {
          ...state,
          mainBackGround : state.colorBackgroungLight,
          mainBackGround2 : state.colorBackgroungLight2,
          mainColorText:state.colorTextDark,
          mainTextShadow : 'none',
          mainColorRating : state.mainColorStartRatingDark,
          status : true
        }
      }
      
    default:
      return state;
  }
};
export default MyColorCommonReducer;
