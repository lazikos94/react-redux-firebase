import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider,useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import firebaseConfig from './config/firebaseConfig'
import firebase from 'firebase/app'

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebase, firebaseConfig)
    )
);

const rrfConfig = {
    useFirestoreForProfile: true,
    userProfile: 'users'
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return(
        <div className="valign-wrapper container" style={{width:"100%",height:"100%",position:"absolute",}}>
            <div className="center-align"><h1>Loading Screen...</h1></div>
        </div>);
    return children
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded><App /></AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister(); 