import { AnswersApi, Configuration, PollsApi } from '../client';

function getBasePath() {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  return 'https://api.solidpolls.de';
}

const configuration = new Configuration({
  basePath: getBasePath(),
});

export const pollsApi = new PollsApi(configuration);
export const questionsApi = new AnswersApi(configuration);
export const answersApi = new AnswersApi(configuration);
