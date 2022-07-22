interface ServerToClientEvents {
  update: () => void;
}

interface ClientToServerEvents {
  subscribeToQuestion: (string) => void;
}
