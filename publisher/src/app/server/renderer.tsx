import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import * as styled from 'styled-components';
import ReactHelmet from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { renderFullPage } from './renderFullPage';
import { reducer, createInitialState } from '../client/reducers';
import { Routes, routes } from '../client/presentations/routes/Routes';
import { ResetStyle } from '../client/presentations/styles/ResetStyle';
import { GlobalStyle } from '../client/presentations/styles/GlobalStyle';
import { Intl } from '../client/containers/Intl';

const assets = (() => {
  // eslint-disable-next-line node/no-unpublished-require, node/no-missing-require
  const manifest: { [key: string]: string } = require('../../../dist/app/public/manifest');
  const entryPoints: string[] = [];

  for (const [key, value] of Object.entries(manifest)) {
    if (/^index|^vendors|^commons/.test(key)) {
      entryPoints.push(value);
    }
  }

  return entryPoints;
})();

const generateParams = (url: string, store: any, baseUrl: string) => {
  const context = {};
  const preloadedState = store.getState();
  const sheet = new styled.ServerStyleSheet();
  const locale = preloadedState.ui.locale;
  const body = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={`${baseUrl}${url}`} context={context}>
        <ResetStyle />
        <GlobalStyle />
        <Provider store={store}>
          <Intl>
            <Routes baseUrl={baseUrl} />
          </Intl>
        </Provider>
      </StaticRouter>,
    ),
  );
  const helmetContent = ReactHelmet.renderStatic();
  const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
      ${helmetContent.link.toString()}
    `.trim();
  const style = sheet.getStyleTags();

  return {
    locale,
    meta,
    assets: assets.map(asset => `${baseUrl}/${asset}`),
    body,
    style,
    preloadedState: JSON.stringify(preloadedState),
  };
};

export function get(req: express.Request, res: express.Response) {
  const path = `${req.baseUrl}${req.url}`;
  const store = createStore(reducer, createInitialState('en', req.baseUrl), applyMiddleware(reduxThunk));

  let initializer: any = null;
  let params: any = null;
  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];
    const match = matchPath(path, route);
    if (match) {
      initializer = route.initializer;
      params = match.params;
      break;
    }
  }

  if (initializer) {
    store.dispatch(initializer(params)).then(() => {
      res.send(renderFullPage(generateParams(req.url, store, req.baseUrl)));
    });
  } else {
    res.send(renderFullPage(generateParams(req.url, store, req.baseUrl)));
  }
}
