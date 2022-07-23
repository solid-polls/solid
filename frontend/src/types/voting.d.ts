/* Edit this file in backend/src/types */

interface ServerToClientEvents {
  update: () => void;
}

interface ClientToServerEvents {
  subscribeToQuestion: (string) => void;
}
