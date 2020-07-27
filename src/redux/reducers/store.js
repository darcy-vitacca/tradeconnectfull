//store is the container of the state for the application
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//these are the codes brought in to be combined
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import uiReducer from "./uiReducer";

const initialState = {};
const middleware = [thunk];

//this is our actual state and here we name our object in our state
const reducers = combineReducers({
  //everything that comes from the user reducer will be stored in this state inside the user object
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

//this is how we create our store the last argument is made to create the store and it needs to be applied as a store reducer to see the data with the extension
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


export default store