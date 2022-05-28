import {defaultApi} from "./api";
import {useQuery} from "react-query";
import {Link, Route, Switch } from "wouter";

function Home() {
  const { isLoading, isSuccess, isError, data } = useQuery('hello', () => defaultApi.appControllerGetHello());

  return (
      <div>
        <h1>Home Page</h1>
        {isLoading && <div>Loading ...</div>}
        {isSuccess && <div>Here is your API data: {data}</div>}
        {isError && <div>Could not fetch resource</div>}
        <Link href='/second'>Go to second</Link>
      </div>
  );
}

function Second() {
  return <div>
    <h1>Second page</h1>
    <Link href="/">Go Back</Link>
  </div>
}

function App() {
  return <Switch>
    <Route path='/second' component={() => <Second />} />
    <Route path='/' component={() => <Home />} />
  </Switch>;
}

export default App
