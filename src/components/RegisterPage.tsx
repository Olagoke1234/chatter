import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const RegisterPage: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <h2 className="auth-page__title">Register</h2>
      {error && <p className="auth-page__error">{error}</p>}
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="auth-page__input"
          {...register("email")}
          type="email"
          placeholder="Email"
        />
        <input
          className="auth-page__input"
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <button className="auth-page__submit-button" type="submit">
          Register
        </button>
      </form>
      <button className="auth-page__social-button" onClick={signInWithGoogle}>
        Register with Google
      </button>
      <button className="auth-page__social-button" onClick={signInWithFacebook}>
        Register with Facebook
      </button>
    </div>
  );
};

export default RegisterPage;
