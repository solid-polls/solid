import {defaultApi} from "./api";
import {useQuery} from "react-query";
import {Link, Route, Switch } from "wouter";
import { useState } from "react";

type PollPageProps = {
  params: { code: string }
}

function PollPage(props: PollPageProps) {
  const { isLoading, isSuccess, isError, data, error} = useQuery(['poll', props.params.code], () => defaultApi.appControllerGetPoll({code: +props.params.code}));

  return (
      <div>
        <h1>Poll Page</h1>
        {isLoading && <div>Loading ...</div>}
        {isSuccess && <div>The poll: {JSON.stringify(data)}</div>}
        {isError && <div>Could not fetch resource: {JSON.stringify(error)}</div>}
      </div>
  );
}

function HomePage() {
  const [code, setCode] = useState('');
  return <div>
    <h1>Home</h1>
    <div>Please type in the poll code:</div>
    <input type="text" onChange={event => setCode(event.target.value)} />
    <Link href={`/poll/${code}`}>
      <button type="submit">Join Poll</button>
    </Link>
  </div>
}

function App() {
  return <div>
  <div><Link href="/">SolidPolls</Link></div>
  
  <Switch>
    <Route path='/poll/:code' component={PollPage} />
    <Route path='/' component={HomePage} />
  </Switch>
</div>;
}

export default App
