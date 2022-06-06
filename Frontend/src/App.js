import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/Pages/Auth/Login';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Calendar from './Components/Pages/Calendar/Calendar';
import Profile from './Components/Pages/Profile/Profile';
import ResetMdp from './Components/Pages/Auth/ResetMdp';
import FaSecurity from './Components/Pages/Auth/FaSecurity';
import DetailsEdit from './Components/Pages/Profile/DetailsEdit';
import SecurityEdit from './Components/Pages/Profile/SecurityEdit';
import ReactDOM from "react-dom";
import Delete from './Components/Code/Dossier/Delete';
import NewPassword from './Components/Pages/Auth/NewPassword';
import Search from './Components/Pages/Search/Search';



function App() {
  return (
    <Router>
        <div>
        <Switch>
        <Route path="/delete"  component={Delete}/>
        <Route path="/profile/security-page"  component={SecurityEdit}/>
        <Route path="/profile/edit-account-details"  component={DetailsEdit}/>
        <Route path="/profile"  component={Profile}/>
        <Route path="/search"  component={Search}/>
        <Route path="/calendar"  component={Calendar}/>
        <Route path="/dashboard"  component={Dashboard}/>
        <Route path="/fasecurity"  component={FaSecurity}/>
        <Route path="/resetmdp"  component={ResetMdp}/>
        <Route path="/newpassword"  component={NewPassword}/>
        <Route path="/"  component={Login}/>
        </Switch>
        </div>
</Router>
  );
}

debugger; // TO INSPECT THE PAGE BEFORE 1ST RENDER

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
