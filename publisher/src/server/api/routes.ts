import express from 'express';

import { fetchResources, fetchResource, createResource, updateResource, deleteResource } from './handlers';

export const api: express.Application = express();
api
  .get('/resources', fetchResources)
  .get('/resources/:id', fetchResource)
  .post('/resources', createResource)
  .put('/resources/:id', updateResource)
  .delete('/resources/:id', deleteResource);
