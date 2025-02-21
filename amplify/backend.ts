import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { configApi } from './API/config';
import { invocesApiFunction } from './functions/invoces/resource';
import { shopsApiFunction } from './functions/shops/resource';

const backend = defineBackend({
  auth,
  data,
  invocesApiFunction,
  shopsApiFunction
});

configApi(backend);