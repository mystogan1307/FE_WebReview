import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers/index.reducer";
import saga from "../sagas/index.saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));
// store.subscribe(() => {
//     console.log(store.getState());
// })

sagaMiddleware.run(saga);

export default store;
