interface UpdatePayload {
  votes: number;
}

interface ServerToClientEvents {
  update: (payload: UpdatePayload) => void;
}

interface VotePayload {
  answerID: number;
}

interface ClientToServerEvents {
  vote: (payload: VotePayload) => void;
}
