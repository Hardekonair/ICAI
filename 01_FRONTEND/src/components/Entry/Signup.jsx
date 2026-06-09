import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api.js";
import GoogleLoginButton from "../useGoogleAuth";
import Header from "../DashComponents/1Header";
import Contact from "../DashComponents/9Contact";
import { Sparkles } from "lucide-react";
import LoginInfo from "./LoginInfo";
import SignupInfo from "./SignupInfo";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);    // to prevent, User clicks button multiple times just afte one req

  const [touched, settouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmpassword: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
      const res=await API.post("/auth/signup", {name, email, password });
      seterror(""); // clean prev error
      alert(res.data.message);
      setTimeout(()=>{
        navigate("/dashboard", { replace: true });      // with replace:false-->"/signup-->/signup/dashboard", replace:false-->"/signup-->/dashboard"
      },1000)   // 1000ms

    } catch (err) {
    //   seterror(err.response?.data?.message || "Login failed");
        alert(err.response?.data?.message || "Something went wrong");
    } finally{
        setloading(false);
    }
  };

  const isValidName = () =>
    /^[a-zA-Z\s'-]{1,50}$/.test(name.trim());

  const isValidEmail = () =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = {
    length: password.length >= 6 && password.length <= 15,
    digit: /[0-9]/.test(password),
    special: /[!@#$%&*]/.test(password),
    lowercase: /^[a-z0-9!@#$%^&*]*$/.test(password),
  };

  const isValidPassword =
    passwordChecks.length &&
    passwordChecks.digit &&
    passwordChecks.special &&
    passwordChecks.lowercase;

  const isValidConfirmpassword =
    password === confirmpassword;

  const isFormValid =
    isValidName() &&
    isValidEmail() &&
    isValidPassword &&
    isValidConfirmpassword;

  return (
    <div>
      <Header />

      {/* 🔥 MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row min-h-screen px-4 sm:px-0">

        {/* RIGHT SIDE (FORM) */}
        <div className="flex flex-1 items-center justify-center bg-gray-50 py-8 sm:py-12">
          <div className="w-full max-w-[420px] px-2 sm:px-4">

            {/* Logo */}
            {/* <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
                <Sparkles size={15} />
              </div>
              <span className="font-bold text-lg text-gray-900">
                Interview <span className="text-indigo-600">Coach</span>
              </span>
            </div> */}

            {/* Title */}
            <h2 className="  text-2xl sm:text-3xl font-bold">
              Start your journey 
            </h2>

            <p className="text-gray-500 mb-5">
              Start practicing with AI-powered interview feedback.
            </p>

            {/* FORM */}
            <form className="flex flex-col" onSubmit={handleSubmit}>

              {/* NAME */}
              <label className="text-sm mt-3">Name</label>
              <input
                type="text"
                className="mt-1 p-3 sm:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Aadi Vaish"
                value={name}
                onBlur={() => settouched({ ...touched, name: true })}
                onChange={(e) => {
                  setname(e.target.value);
                  seterror("");
                  settouched({ ...touched, name: true });
                }}
              />
              {touched.name && !isValidName() && (
                <p className="text-red-500 text-sm mt-1">
                  Only Alphabets allowed min=2 max=50
                </p>
              )}

              {/* EMAIL */}
              <label className="text-sm mt-3">Email address</label>
              <input
                type="email"
                className="mt-1 p-3 sm:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
                value={email}
                onBlur={() => settouched({ ...touched, email: true })}
                onChange={(e) => {
                  setEmail(e.target.value);
                  seterror("");
                }}
              />
              {touched.email && !isValidEmail() && (
                <p className="text-red-500 text-sm mt-1">
                  Enter a Valid Email
                </p>
              )}

              {/* PASSWORD */}
              <label className="text-sm mt-3">Password</label>
              <input
                type="password"
                className="mt-1 p-3 sm:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
                value={password}
                onBlur={() => settouched({ ...touched, password: true })}
                onChange={(e) => {
                  setpassword(e.target.value);
                  seterror("");
                  settouched({ ...touched, password: true })
                }}
              />

              {touched.password && (
                <div className="mt-2 text-sm">
                  {!passwordChecks.length && <p className="text-red-500">• Must be 6-15 characters</p>}
                  {!passwordChecks.digit && <p className="text-red-500">• Must contain a number</p>}
                  {!passwordChecks.special && <p className="text-red-500">• Must contain a special character</p>}
                  {!passwordChecks.lowercase && <p className="text-red-500">• Only lowercase allowed</p>}
                </div>
              )}

              {/* CONFIRM PASSWORD */}
              <label className="text-sm mt-3">Confirm Password</label>
              <input
                type="password"
                className="mt-1 p-3 sm:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Re-Enter your password"
                value={confirmpassword}
                onBlur={() =>
                  settouched({ ...touched, confirmpassword: true })
                }
                onChange={(e) => {
                  setconfirmpassword(e.target.value);
                  seterror("");
                  settouched({...touched,confirmpassword:true})
                }}
              />

              {touched.confirmpassword && !isValidConfirmpassword && (
                <p className="text-red-500 text-sm mt-1">
                  Password didn't match
                </p>
              )}

              {error && (
                <p className="mt-3 text-sm text-red-600">{error}</p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full sm:w-auto flex items-center justify-center gap-3 mt-5 p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                
                <Sparkles size={15} /> {loading? "Creating...":"Create Account"}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="relative text-center my-6 text-gray-400 text-sm">
              <span className="px-2 bg-gray-50 relative z-10">
                OR
              </span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
            </div>

            <GoogleLoginButton />

            {/* FOOTER */}
            <p className="mt-4 text-sm text-center">
              Need an account?{" "}
              <Link to="/signup" className="text-indigo-600">
                Sign up
              </Link>
            </p>

            <p className="mt-5 text-center text-xs text-gray-400">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-1">
          <SignupInfo />
        </div>

      </div>

      <Contact />
    </div>
  );
}