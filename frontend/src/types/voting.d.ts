/* Edit this file in backend/src/types */

interface ServerToClientEvents {
  update: () => void;
}

type ClientToServerEvents = Record<string, never>;
