import React, { useState ,} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { auth, db } from "../Firebase/Firebase-config";
const Login = () => {
  const [signup, setSignup] = useState(false);
  const navigate=useNavigate();
  return (
    <div className="h-screen w-full">
      <div className="flex h-full ">
        <div className="h-full ">
          <img
            className="h-full w-[60 vw]"
            src="https://img.freepik.com/free-photo/reading-bible-table-indoors-illuminated-by-lamp-generated-by-ai_188544-27317.jpg?w=1060&t=st=1686572855~exp=1686573455~hmac=b2021a6257902f0701497a006564e1980b03274669367b666657fe985131155a"
            alt=""
          />
        </div>
        <div className="h-full w-[40vw]">
          {signup ? (
            <div>
              {" "}
              <div className="h-[180px] w-full flex justify-center items-center">
                <h2 className="text-4xl font-mono font-bold uppercase tracking-wider">
                  Sign up
                </h2>
              </div>
              <div className="h-auto w-[40vw]">
                <div className="h-full flex flex-col gap-16 justify-center items-center ">
                  <div className="flex flex-col w-[80%] gap-2">
                    <label
                      className="text-sm font-medium tracking-wider"
                      htmlFor="">
                      Username
                    </label>
                    <input className="border-2 px-4 text-sm py-2 border-blue-500  outline-none rounded-md" />
                  </div>
                  <div className="flex flex-col w-[80%] gap-2">
                    <label
                      className="text-sm font-medium tracking-wider"
                      htmlFor="">
                      Password
                    </label>
                    <input className="border-2 px-4 py-2 border-pink-500  outline-none rounded-md" />
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <button
                        onClick={() => {
                          setSignup(false);
                        }}
                        className="Btn font-bold tracking-wider">
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <div className="h-[180px] w-full flex justify-center items-center">
                <h2 className="text-4xl animate-bounce  font-bold uppercase tracking-wider">
                  Login
                </h2>
              </div>
              <div className="h-auto w-[40vw]">
                <div className="h-full flex flex-col gap-16 justify-center items-center ">
                  <div className="flex flex-col w-[80%] gap-2">
                    <label
                      className="text-sm font-medium tracking-wider"
                      htmlFor="">
                      Username
                    </label>
                    <input
                      className="border-2 px-4 text-sm py-2 border-blue-500  outline-none rounded-md"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col w-[80%] gap-2">
                    <label
                      className="text-sm font-medium tracking-wider"
                      htmlFor="">
                      Password
                    </label>
                    <input
                      className="border-2 px-4 py-2 border-pink-500  outline-none rounded-md"
                      type="password"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <button onClick={()=>{navigate('/dashboard')}} className="Btn font-bold tracking-wider">
                        Submit
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSignup(true);
                        }}
                        className="Btn font-bold tracking-wider">
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
