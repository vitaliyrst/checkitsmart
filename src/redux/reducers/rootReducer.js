import {combineReducers} from "redux";
import {catalogReducer} from "./catalogReducer";
import {appReducer} from "./appReducer";
import {webXrReducer} from "./webXrReducer";

export const rootReducer = combineReducers(
    {
        app: appReducer,
        catalog: catalogReducer,
        webxr: webXrReducer
    }
);
