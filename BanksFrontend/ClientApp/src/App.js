import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AddBank from './components/AddBank';
import BankList from './components/BankList';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={BankList} />
                <Route path='/add-bank' component={AddBank} />
            </Layout>
        );
    }
}
