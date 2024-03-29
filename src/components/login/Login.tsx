import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { ThemeContext } from "../../contexts/themeContext";
import { AuthContext } from "../../contexts/auth/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiShow } from 'react-icons/bi';
const Login = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const {theme, setTheme} :any  = useContext(ThemeContext);
  const [ballAnim, setBallAnim] = useState <Boolean>(false);
  const token :string = '143803002';
  const getToken = localStorage.getItem('token');
  const {user, setUser} :any = useContext(AuthContext);
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();
  const anim = () => {
    setBallAnim(!ballAnim);
    themeFunc();
  }
  const sendToken = () => {
  localStorage.setItem('token', token);
 }
  
  const getTheme = localStorage.getItem('theme');
  useEffect(() => {
    switch(getTheme){
      case 'true':
        setBallAnim(true);
      break;
      case 'false':
        setBallAnim(false);
    }
  },[window.onload])

  useEffect(() => {
    if(getToken){
      navigate('/private');
      setUser(!user);
    }else{
      navigate('/'); 
    }
  }, [window.onload])
  
  const themeFunc = () => {
    setTheme(!theme); 
  }
   
  const erroMessage = () => {
    toast.error('Invalid credentials!', {
        position: toast.POSITION.TOP_RIGHT
    })};
  const successMessage = () => {
    toast.success('valid credentials!', {
        position: toast.POSITION.TOP_RIGHT
    })};
  const login = (data: any) => {
    const regexEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if(regexEmail.test(data.email) !== true){
      erroMessage();
      navigate('/');
    }else{
      setUser(!user);
      successMessage();
      setTimeout(()=>{
        navigate('/private');
      }, 6000)
      sendToken();
    }
  };

  const showPassword = () => {
    if(password == 'password'){
      setPassword('text');
    }else{
      setPassword('password');
    }
  }

  return (
    <div>
      <button onClick={anim} className="rounded-3xl bg-violet-900 absolute w-16 right-2 top-2">
         <div className={!ballAnim ? "bg-white duration-500 rounded-full w-5 h-5 relative left-0" : "duration-500 rounded-full w-5 h-5 relative left-13 bg-black"}></div>
      </button>

      <div className={!theme ? "bg-white shadow-xl md:w-80 mx-auto mt-10 p-2 pb-2 h-72 rounded-xl" : "shadow-xl md:w-80 mx-auto mt-10 p-2 pb-2 h-72 rounded-xl bg-slate-900"}>
          <form
          className="text-center">
              <header>
                  <h1 className="font-bold text-2xl mb-10">Login</h1>
              </header>
              <main className="relative">
                  <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  register={register}
                  />
                  <Input
                  placeholder="Password"
                  type={password}
                  name="password"
                  register={register}
                  />
                  {errors.password || errors.email ? <p className="text-red-500 text-xs" 
                  >Required fild</p> : <p></p>}
                  <BiShow
                  className="absolute top-16 md:right-14 right-28"  
                  onClick={showPassword}/>
                  <div><Button 
                  clickEvent={handleSubmit(login)}
                  text="Sign in"/></div>
                  <ToastContainer />
              </main>
          </form>
      </div>
    </div>
  )
}

export default Login;


