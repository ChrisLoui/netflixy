import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  
  const [rememberLogin, setrememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, logIn} = UserAuth();
  const navigate = useNavigate();


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
      await logIn(email, password);
      navigate("/")
    }
    catch(err){
      console.log(err);
    }

  }

  return (
    <>
      <div className="w-full h-screen">
        <img
          className=" hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/520b8af1-d438-4a78-8f2a-f40aa8d1a38f/PH-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_35ab0f8f-c765-48cf-8cc8-85c5202c55ee_large.jpg"
          alt=""
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-nsans-bold">Login</h1>
              <form 
              onSubmit={handleFormSubmit}
              className="w-ful flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold">
                  Login
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                  <input type="checkbox" name="remember" id="default-checkbox" checked={rememberLogin} 
                  onChange={(e) => setrememberLogin(!rememberLogin)}/>
                  <label className="mx-2 text-sm font-medium">Remember Me</label>
                  </div>
                  <a className="hover:text-white hover:underline" href="#">Need help?</a>
                </div>

                <div className="mt-5 text-gray-500 flex space-x-2"><p>
                  New to Netflix?
                </p>
                <Link className="text-gray-300 underline" to='/signup'>Sign up</Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login