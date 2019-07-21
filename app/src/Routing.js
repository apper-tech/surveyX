import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NewSurvey from './components/NewSurvey';
import OwnerSurveys from './components/OwnerSurveys';
import Participate from './components/Participate';
import Claim from './components/Claim';
import TestNetCheck from './components/TestNetCheck';

import Dashboard from './_layout/Dashboard';
const baseName = process.env.PUBLIC_URL + '/';

var createReactClass = require('create-react-class');

var Wrapper = createReactClass({
    render: function () {
        return (
            <Dashboard>
                {this.props.children}
            </Dashboard>
        );
    }
});

export default function Routes(drizzle) {
    return (
        <HashRouter basename={baseName}>
            <Switch>
                {/*   <Route exact path='/' render={() =>
                    (<Dashboard>
                        <HomeScreen />
                    </Dashboard>)} /> */}
                <Route exact path='/' render={() =>
                    (<Wrapper>
                        <TestNetCheck drizzle={drizzle}></TestNetCheck>
                    </Wrapper>)}></Route>
                <Route path='/new' render={() =>
                    (<Wrapper>
                        <NewSurvey drizzle={drizzle} />
                    </Wrapper>)} />
                <Route path='/mysurveys' render={() =>
                    (<Wrapper>
                        <OwnerSurveys drizzle={drizzle} />
                    </Wrapper>)} />
                <Route path='/participate' render={() =>
                    (<Wrapper>
                        <Participate drizzle={drizzle} />
                    </Wrapper>)} />
                <Route path='/claim' render={() =>
                    (<Wrapper>
                        <Claim drizzle={drizzle} />
                    </Wrapper>)} />
            </Switch>
        </HashRouter>
    );
}