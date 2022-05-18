
import './App.css';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Resources from './Components/Resources';
import Footer from './Components/Footer';
import Home from './Components/Home';
import User from './Components/User';
import MyProfile from './Components/MyProfile';
import Subjects from './Components/Subject';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Paper from './Components/Paper';


function App() {
  const [profile, setProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [data,setData] = useState({});

  return (
    <Router>
      <div className="App">
        <Navbar profile={profile} setProfile={setProfile}/>
        {/* <section className="offset"></section> */}
        <Switch>
          <Route exact path="/" >
            <Home globalData = {data} setGlobalData={setData}/>
            <Carousel />
          </Route>
          <Route exact path="/Resources/:branch" >
            <Resources globalData={data} />
          </Route>
          <Route exact path="/Subjects/:branch/:year" >
            <Subjects globalData={data}  profile={profile} setProfile={setProfile} />
          </Route>
          
          {profile&&<Route  exact path="/Paper/:branch/:year/:subject" >
            <Paper profile={profile} />
          </Route>}

          <Route exact path="/User">
            <User profile={profile} setProfile={setProfile} setUserData={setUserData}/>
          </Route>

         

        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// npx json-server --watch data/db.json --port 8000