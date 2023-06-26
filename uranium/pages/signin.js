import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import { signin, authenticate, isAuthenticated } from "./auth";
import { useRouter } from "next/router";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const router = useRouter();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(() => console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      router.push("/dashboard");
    } else if (isAuthenticated()) {
      router.push("/");
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        {loadingMessage()}
        {errorMessage()}

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="px-4 py-2 border rounded w-full focus:outline-none shadow-md"
              onChange={handleChange("email")}
              type="email"
              value={email}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="px-4 py-2 border rounded w-full focus:outline-none shadow-md"
              onChange={handleChange("password")}
              type="password"
              value={password}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={onSubmit}
              className="px-5 py-2 font-semibold text-white bg-gradient-to-br to-purple-600 from-blue-500 rounded-2xl hover:bg-gradient-to-br hover:to-blue-500 hover:from-purple-600"
            >
              Submit
            </button>
          </div>
        </form>

        <div
          className={`${didRedirect ?  router.push("/dashboard") : "hidden"} border-l-4 p-4 mt-4`}
          >
          <p className="text-green-700">
          Sign in successful. Redirecting...
          </p>
          </div>
          <div className="text-center mt-4">
      <p className="text-gray-700">
        Don't have an account?{" "}
        <Link href="/signup">
          <a className="text-blue-500 underline">Sign Up Here</a>
        </Link>
      </p>
    </div>
  </div>
</>
);
};
export default Signin;