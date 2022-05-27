import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'challenge-archive',
  apiKey: process.env.API_KEY as string,
});