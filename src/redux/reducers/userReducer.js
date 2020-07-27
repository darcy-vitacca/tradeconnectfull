import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from "./types";

//this initial state isn't a global state but its what is stored in this reducer to be passed into the combined reducer
const initialState = {
  authenticated: false,
  credentials : {}
};

//This function takes our default initial state value and the second param is the aciton we recieve we use a switch and depending on the action type we will do something
export default function (state = initialState, action) {
    console.log(action)
  switch (action.type) {

    // each time we get the state we spread it and change the authenticated within in
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    // this is user when we logout and recives initial state from above
    case SET_UNAUTHENTICATED:
        return initialState;
    
    // when we
    case SET_USER: 
    return {
        authenticated : true,
        //the spread here will bind the return
        ...action.payload
    };
    default: 
    return state;
  }
}
//. The spread operator adds the arrary without the brackets to something else there won't be an array within an array.  We can also instead of calling them indiivdually passed in a function eg func (x,y,z)  (...args) will add them in the same format it spreads the array to indivudal elements.It will ignore any extra elements in an array if only a few are required you can also concat to array by using a double spread operator and you can also add elements on top of those arrays. The rest operator collects multiple elements and condenses them it's the opposite of the spread operator. If you pass the spread operator into a function it will be taken as the rest operator. In a function the first arg would be the thing you want to work on and the arguments after that will be what you want to do to that first argument