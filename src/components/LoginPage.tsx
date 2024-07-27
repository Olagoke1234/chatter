import React from "react";
import { useForm } from "react-hook-form";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig"; // Correct import
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/"); // Redirect to home or dashboard after login
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect to home or dashboard after login
    } catch (error) {
      console.error("Error with Google sign in:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/"); // Redirect to home or dashboard after login
    } catch (error) {
      console.error("Error with Facebook sign in:", error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page__title">Login</h1>
      <form className="login-page__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-page__form-group">
          <label className="login-page__label">Email:</label>
          <input
            className="login-page__input"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="login-page__error">Email is required</span>
          )}
        </div>
        <div className="login-page__form-group">
          <label className="login-page__label">Password:</label>
          <input
            className="login-page__input"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="login-page__error">Password is required</span>
          )}
        </div>
        <button className="login-page__submit-button" type="submit">
          Sign In
        </button>
      </form>
      <button
        className="login-page__social-button"
        onClick={handleGoogleSignIn}
      >
        Sign In with Google
      </button>
      <button
        className="login-page__social-button"
        onClick={handleFacebookSignIn}
      >
        Sign In with Facebook
      </button>
    </div>
  );
};

export default LoginPage;
