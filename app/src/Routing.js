import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './components/Home';
import NewSurvey from './components/NewSurvey';
import OwnerSurveys from './components/OwnerSurveys';
import Participate from './components/Participate';
import Dashboard from './_layout/Dashboard';
const baseName = process.env.PUBLIC_URL + '/';

//const baseName = "/survey-proof-auth";
export default function Routes(drizzle) {
    return (
        <HashRouter basename={baseName}>
            <Switch>
                <Route exact path='/' render={() =>
                    (<Dashboard>
                        <HomeScreen />
                    </Dashboard>)} />
                <Route path='/new' render={() =>
                    (<Dashboard>
                        <NewSurvey drizzle={drizzle} />
                    </Dashboard>)} />
                <Route path='/mysurveys' render={() =>
                    (<Dashboard>
                        <OwnerSurveys drizzle={drizzle} />
                    </Dashboard>)} />
                <Route path='/participate' render={() =>
                    (<Dashboard>
                        <Participate drizzle={drizzle} />
                    </Dashboard>)} />
            </Switch>
        </HashRouter>
    );
}