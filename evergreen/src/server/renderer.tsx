import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import * as styled from 'styled-components';
import ReactHelmet from 'react-helmet';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import { Config } from 'yggdrasil';

import { renderFullPage } from './renderFullPage';
import { reducer } from '../client/reducers';
import { Routes, routes } from '../client/presentations/routes/Routes';
import { ResetStyle } from '../client/presentations/styles/ResetStyle';
import { GlobalStyle } from '../client/presentations/styles/GlobalStyle';
import { Resource } from '../client/services';
import { initializePage } from '../client/usecases';

const assets = (() => {
  // eslint-disable-next-line node/no-unpublished-require, node/no-missing-require
  const manifest: { [key: string]: string } = require('../../dist/public/manifest');
  const entryPoints: string[] = [];

  for (const [key, value] of Object.entries(manifest)) {
    if (/^index|^vendors|^commons/.test(key)) {
      entryPoints.push(value);
    }
  }

  return entryPoints;
})();

const generateParams = (url: string, store: any) => {
  const context = {};
  const preloadedState = store.getState();
  const sheet = new styled.ServerStyleSheet();
  const locale = preloadedState.ui.locale;
  const body = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={url} context={context}>
        <ResetStyle />
        <GlobalStyle />
        <Provider store={store}>
          <Routes />
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
    assets,
    body,
    style,
    preloadedState: JSON.stringify(preloadedState),
  };
};

let config: Config | null = null;

export async function get(req: express.Request, res: express.Response) {
  if (config === null) {
    // eslint-disable-next-line require-atomic-updates
    config = await Resource.fetchConfig();
  }
  const store = createStore(reducer, applyMiddleware(reduxThunk));

  let initializer: any = null;
  let params: any = null;
  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];
    const match = matchPath(req.url, route);
    if (match) {
      initializer = route.initializer;
      params = match.params;
      break;
    }
  }

  store.dispatch(initializePage((params ? params.locale : null) || config.locales[0], config) as any).then(() => {
    if (initializer) {
      store.dispatch(initializer(params)).then(() => {
        res.send(renderFullPage(generateParams(req.url, store)));
      });
    } else {
      res.send(renderFullPage(generateParams(req.url, store)));
    }
  });
}
