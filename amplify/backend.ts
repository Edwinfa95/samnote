import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { configApi } from './API/config';

const backend = defineBackend({
  auth,
  data,
});

configApi(backend);