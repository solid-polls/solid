import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export type VoteClient = Socket<ServerToClientEvents, ClientToServerEvents>;

export default function useVoteClient(pollCode: string): VoteClient | null {
  const [voteClient, setVoteClient] = useState<VoteClient | null>(null);
  useEffect(() => {
    const client = io(
      import.meta.env.PROD
        ? 'https://api.solidpolls.de'
        : 'http://localhost:3000',
      { transports: ['websocket'] },
    );
    setVoteClient(client);
    return () => {
      if (client !== null) {
        client.close();
      }
    };
  }, [pollCode]);
  return voteClient;
}
