import { Switch, Route } from "react-router-dom";
import React from "react";
import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";
import Authentication from "pages/authentication";
import TagFeed from 'pages/tagFeed'
import YourFeed from 'pages/yourFeed'
import CreateArtice from 'pages/createArticle'
import EditArtice from "pages/editArticle.js";
import Settings from "pages/settings";
import UserProfile from 'pages/userProfile'

const routes = () => {
    return (
        <Switch>
            <Route path ='/' component={GlobalFeed} exact />
            <Route path ='/profiles/:slug' component={UserProfile}  />
            <Route path ='/profiles/:slug/favorites' component={UserProfile}  />
            <Route path ='/settings' component={Settings} />
            <Route path ='/articles/new' component={CreateArtice} />
            <Route path ='/articles/:slug/edit' component={EditArtice} />
            <Route path ='/feed' component={YourFeed} />
            <Route path ='/tags/:slug' component={TagFeed} />
            <Route path ='/login' component={Authentication} />
            <Route path ='/register' component={Authentication} />
            <Route path ='/articles/:slug' component={Article} />
        </Switch>
    )
}

export default routes
