import React, { Component } from 'react';
import logo from './assets/img/logo.svg';
import './assets/sass/style.scss';
import {Provider} from 'react-redux';
import ReduxDemo from './components/ReduxDemo';
import store from './model/index';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                    <ReduxDemo />
                </div>

            </Provider>
        );
    }
}

export default App;
