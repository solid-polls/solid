interface ServerToClientEvents {
  update: () => void;
}

type ClientToServerEvents = Record<string, never>;
