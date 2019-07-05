import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Resources } from '../pages/Resources';
import { Resource } from '../pages/Resource';

export const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
    initializer: null,
  },
  {
    exact: true,
    path: '/about',
    component: About,
    initializer: null,
  },
  // For admin UI
  {
    exact: true,
    path: `/resources`,
    component: Resources,
    initializer: null,
  },
  {
    exact: true,
    path: `/resources/new`,
    component: Resource,
    initializer: null,
  },
  {
    exact: true,
    path: `/resources/:id`,
    component: Resource,
    initializer: null,
  },
];

export function Routes() {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
      ))}
    </Switch>
  );
}