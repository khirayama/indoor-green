import { Action } from 'redux';

import { ResourceWithAllLocalesShapeWithRelations } from '../../types';

export interface ChangeIsFetchingResources extends Action<'CHANGE_IS_FETCHING_RESOURCES'> {
  payload: {
    isFetching: boolean;
  };
}

export const changeIsFetchingResources = (isFetching: boolean): ChangeIsFetchingResources => {
  return {
    type: 'CHANGE_IS_FETCHING_RESOURCES',
    payload: {
      isFetching,
    },
  };
};

export interface ChangeIsFetchingResource extends Action<'CHANGE_IS_FETCHING_RESOURCE'> {
  payload: {
    isFetching: boolean;
  };
}

export const changeIsFetchingResource = (isFetching: boolean): ChangeIsFetchingResource => {
  return {
    type: 'CHANGE_IS_FETCHING_RESOURCE',
    payload: {
      isFetching,
    },
  };
};

export interface SetResources extends Action<'SET_RESOURCES'> {
  payload: {
    resources: { [key: string]: ResourceWithAllLocalesShapeWithRelations };
  };
}

export const setResources = (resources: { [key: string]: ResourceWithAllLocalesShapeWithRelations }): SetResources => {
  return {
    type: 'SET_RESOURCES',
    payload: {
      resources,
    },
  };
};

export interface SetResource extends Action<'SET_RESOURCE'> {
  payload: {
    resource: ResourceWithAllLocalesShapeWithRelations;
  };
}

export const setResource = (resource: ResourceWithAllLocalesShapeWithRelations): SetResource => {
  return {
    type: 'SET_RESOURCE',
    payload: {
      resource,
    },
  };
};

export interface RemoveResource extends Action<'REMOVE_RESOURCE'> {
  payload: {
    resourceId: string;
  };
}

export const removeResource = (resourceId: string): RemoveResource => {
  return {
    type: 'REMOVE_RESOURCE',
    payload: {
      resourceId,
    },
  };
};

export interface ChangeLocale extends Action<'CHANGE_LOCALE'> {
  payload: {
    locale: string;
  };
}

export const changeLocale = (locale: string): ChangeLocale => {
  return {
    type: 'CHANGE_LOCALE',
    payload: {
      locale,
    },
  };
};

export interface SetPathname extends Action<'SET_PATHNAME'> {
  payload: {
    pathname: string;
  };
}

export const setPathname = (pathname: string): SetPathname => {
  return {
    type: 'SET_PATHNAME',
    payload: {
      pathname,
    },
  };
};
