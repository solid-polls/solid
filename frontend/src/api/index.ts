import { Configuration, PollsApi } from '../client';

function getBasePath() {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  return 'https://solidpolls.de/api';
}

const configuration = new Configuration({
  basePath: getBasePath(),
});

export const pollsApi = new PollsApi(configuration);
