import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";
import { signup } from "./auth";


const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch((error) => console.log("Error in signup", error));
  };

  const successMessage = () => {
    return (
      <div
        className={`${
          success ? "bg-green-100 border-green-400" : "hidden"
        } border-l-4 p-4 mt-4`}
      >
        <p className="text-green-700">
          New account was created successfully. Please{" "}
          <Link href="/signin">
            <a className="text-green-700 underline">Login Here</a>
          </Link>
        </p>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {successMessage()}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="name" className="text-gray-700">
              Name
            </label>
            <input
              id="name"
              className="px-4 py-2 border rounded w-full focus:outline-none shadow-md"
              onChange={handleChange("name")}
              type="text"
              value={name}
            />
          </div>

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
            <button className="px-5 py-2 font-semibold text-white bg-gradient-to-br to-purple-600 from-blue-500 rounded-2xl hover:bg-gradient-to-br hover:to-blue-500 hover:from-purple-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;