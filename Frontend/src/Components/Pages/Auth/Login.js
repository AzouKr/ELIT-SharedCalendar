import React from 'react'
import './Login.css'
import './Login.scss'
import logo from './../../../img/logo.png'
import dark_logo from './../../../img/logo-darktheme.png'
import useLocalStorage from 'use-local-storage'
import DarkModeToggle from "react-dark-mode-toggle";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import * as env from './../../EnvirementVariables'






function Login() {

    //************************************** Dark Mode **************************************************************/
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    

    if(theme === true){
        setTheme('dark');
    }
    //***************************************************************************************************************/





    //************************************** Switch Logo **************************************************************/
  const LightLogo = () => (
    <img src={logo} className='login-logo' />
  )
  const DarkLogo = () => (
    <img src={dark_logo} className='login-logo' />
  )
  //***************************************************************************************************************/



  //**************************************** Login API  ************************************************************

  let history = useHistory();
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

    React. useEffect(() => {
      if(localStorage.getItem('token') !== ""){
        history.push("/dashboard");
      }
    }, []);

  const [msg_err, setmsg_err] = React.useState(false);
  const [msg_err1, setmsg_err1] = React.useState(false);
  const [msg_err2, setmsg_err2] = React.useState(false);
  var validator = require("email-validator");
  var passwordValidator = require('password-validator');
  var schema = new passwordValidator();
  schema.is().min(8).is().max(20).has().not().spaces();

  const signin = (e) => {
    e.preventDefault();
    setmsg_err(false);
    setmsg_err1(false);
    setmsg_err2(false);
    if((validator.validate(email)) && (schema.validate(password))){
      Axios.post(env.hostUrl+"/api/v1/auth/login",{
        userName: email,
        password: password
      }).then((response) => {
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('email',email);
        window.setTimeout(() => {
          history.push("/dashboard");
        }, 2000)
      }).catch(error => {
        setmsg_err2(true);
      });
    }else{
      if(!validator.validate(email)){
        setmsg_err(true);
      }else{
        setmsg_err1(true);
      }
    }
    
};

  //***************************************************************************************************************/

  const [hidePass, setHidePass] = React.useState(true);

  const Hide = () => (
    <i className="fa fa-eye fa-lg" id='eye-showpass' aria-hidden="true"></i>
  )
  const Unhide = () => (
    <i className="fa fa-eye-slash fa-lg" id='eye-hidepass' aria-hidden="true"></i>
    )

  const DisplayErrMsg = () => (
    <h1 className="login-err-msg">L'adresse e-mail que vous avez entré n'est pas valide</h1>
  )
  const DisplayErrMsg1 = () => (
    <h1 className="login-err-msg">Mot de passe que vous avez entré n'est pas valide</h1>
  )
  const DisplayErrMsg2 = () => (
    <h1 className="login-err-msg">Email/Mot de passe incorrect</h1>
  )

  return (
    <div>
    <div id='toggle'>
    <DarkModeToggle onChange={setTheme} checked={theme} size={70} speed={3}/>
    </div>
        <div className='login-body' data-theme={theme}>
        <div className='img-div'>
          { theme ? <DarkLogo/> : <LightLogo/> }
        </div>

        <div className='login-box' data-theme={theme}>
            <h1 className='login-title' data-theme={theme}>Se Connecter</h1>
            <h2 className='login-sec' data-theme={theme}>Entrez vos coordonnées pour accéder à votre compte</h2>

            <div className='input-email-box'>
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <input className='input-email' type='text' placeholder='Enter your email' onChange={(e) => {setemail(e.target.value);}} data-theme={theme}/>
            </div>

            <div className='input-password-box'>
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input className='input-password' type={hidePass ? 'password' : 'text'} placeholder='Enter your password' onChange={(e) => {setpassword(e.target.value);}} data-theme={theme}/>
              <div onClick={() => setHidePass(!hidePass)}>
                {hidePass ? <Hide/> : <Unhide/>}
              </div>

            </div>

            <Link to='/dashboard'>
            <button className='btn-signin' onClick={signin}>S'Identifier</button>
            </Link>
            { msg_err ? <DisplayErrMsg/> : null }
            { msg_err1 ? <DisplayErrMsg1/> : null }
            { msg_err2 ? <DisplayErrMsg2/> : null }
            <div>
            </div>
        </div>
        <h2 className='password-forg' data-theme={theme}>Mot de passe oublié ? <Link to={`/resetmdp`}><a href="#">Modifier le mot de passe</a></Link></h2>
        
    </div>
    </div>
  )
}
export default Login