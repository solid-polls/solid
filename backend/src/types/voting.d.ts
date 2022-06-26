interface UpdatePayload {
  votes: number;
}

interface ServerToClientEvents {
  update: (payload: UpdatePayload) => void;
}

interface VotePayload {
  pollCode: string;
  questionID: number;
  answerID: number;
}

interface ClientToServerEvents {
  vote: (payload: VotePayload) => void;
}
