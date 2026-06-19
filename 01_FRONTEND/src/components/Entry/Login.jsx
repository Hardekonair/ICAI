import { useState } from "react";
// import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api.js";
import GoogleLoginButton from "../useGoogleAuth";
import Header from "../DashComponents/1Header";
import Contact from "../DashComponents/9Contact";
import { Sparkles } from "lucide-react";
import LoginInfo from "./LoginInfo";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const {user,refreshUser}=useAuth();  // We can access user and loading state from AuthContext using this custom hook. This is possible because we wrapped our app with AuthProvider in main.jsx which provides this context to the entire app. So now we can check if user is logged in or not and also if auth state is still loading or not to prevent navigation while loading. This is a great example of how context allows us to share state across the entire app without prop drilling.

  const [name, setname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false)
  const [touched, settouched] = useState({
    name:false,
    email:false,
    password:false
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const res=await API.post("/auth/login", { email, password });
      seterror("")  // remove prev error
      alert(res.data.message)
      await refreshUser();  // Login sets an httpOnly cookie, then /auth/me loads the current user into context.
      setTimeout(()=>{
        navigate("/homepage", {replace: true});
      },100);

    } catch (err) {
      seterror(err.response?.data?.message || "Login failed");
      alert(err.response?.data?.message || "Login failed");
    }finally{
      setloading(false);
    }
  };
  // Name Validation
  const isValidName=()=>{     // Here we are not passing name as fn parameter because we are using it from react state and THIS IS CALLED USING A CLOSURE
    return /^[a-zA-Z\s'-]{2,50}$/.test(name.trim());
  }
  // Email Validation
  const isValidEmail=()=>{    //👉 Now it reads email from your component state (closure), no need to pass anything.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  // Password Rules
  const passwordChecks={
    length: password.length>=6 && password.length<=15,
    digit: /[0-9]/.test(password),
    special:/[!@#$%&*]/.test(password),
    lowercase: /^[a-z0-9!@#$%^&*]*$/.test(password)
  };
  const isValidPassword= passwordChecks.length &&
                         passwordChecks.digit && 
                         passwordChecks.special && 
                         passwordChecks.lowercase;
  
  const isFormValid = isValidEmail() && isValidPassword ;

  return (
    <div >
      <Header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm" />
      <div className="flex flex-col lg:flex-row min-h-screen">
      {/* left side of login page */}
        <LoginInfo/>
      
      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="p-7 w-[420px] max-w-full px-1">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
              <Sparkles size={15}/>
            </div>
            <span className="font-bold text-lg text-gray-900">
              Interview <span className="text-indigo-600">Coach</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold">Log in to your account</h2>
          <p className="text-gray-500 mb-5">
            Welcome back. Continue your interview practice.
          </p>


          {/* Divider */}
         

          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-sm mt-3">Email address</label>
            <input
              type="email"
              className="mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              value={email}
              onBlur={()=>{settouched({...touched,email:true})}}    //Fires when the input loses focus (user clicks away / tabs out)
              onChange={(e)=>{setEmail(e.target.value);seterror("")}}
            />

            {touched.email && !isValidEmail() && (<p className="">Enter a Valid Email</p>)}

            <label className="text-sm mt-3">Password</label>
            <input
              type="password"
              className="mt-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              value={password}
              onBlur={()=>{settouched({...touched,password:true})}}   //Fires when the input loses focus (user clicks away / tabs out)
              onChange={(e)=>{setPassword(e.target.value);seterror("")}}
            />

            {touched.password && (
              // <div>
              //   {!passwordChecks.length && <p>• Must be 6-15 characters</p>/p>}
              //   {!passwordChecks.digit && <p>• Must contain a number</p>/p>}
              //   {!passwordChecks.special && <p>• Must contain a special character</p>/p>}
              //   {!passwordChecks.lowercase && <p>• Only lowercase allowed</p>/p>}

              // </div>
              <div>
                <p style={{ color: passwordChecks.length ? "green" : "red" }}>
                  • 6-15 characters
                </p>
                <p style={{ color: passwordChecks.digit ? "green" : "red" }}>
                  • Contains a number
                </p>
                <p style={{ color: passwordChecks.special ? "green" : "red" }}>
                  • Contains a special character
                </p>
                <p style={{ color: passwordChecks.lowercase ? "green" : "red" }}>
                  • Contains only lowercase letter
                </p>
              </div>
            )}


            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="items-center justify-center gap-3 mt-5 p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-semibold flex disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles size={15}/> Log In
            </button>
            
          </form>

          <div className="relative text-center my-6 text-gray-400 text-sm">
            <span className="px-2 bg-gray-50 relative z-10 justify-center">
              OR
            </span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>
               <GoogleLoginButton />

          {/* Footer */}
          <p className="mt-4 text-sm text-center">
            Need an account?{" "}
            <Link to="/signup" className="text-indigo-600 ">
              Sign up
            </Link>
          </p>

          <p className="mt-5 text-center text-xs text-gray-400">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>

        </div>
      </div>
</div>

      <Contact />
    </div>
  );
}
