import React, { useEffect, useState } from 'react';
import { loginUser, registerUser } from './authApi.js';

function AuthDialog({
  mode,
  onClose,
  onModeChange,
  onSuccess
}) {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignup = mode === 'signup';
  useEffect(() => {
    if (!mode) return undefined;
    setError('');
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.getElementById('auth-email')?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mode, onClose]);
  if (!mode) return null;
  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: formData.get('email').trim(),
      password: formData.get('password')
    };
    try {
      const session = isSignup ? await registerUser({
        ...credentials,
        full_name: formData.get('full_name').trim()
      }) : await loginUser(credentials);
      onSuccess(session);
    } catch (requestError) {
      setError(requestError.message.includes('Failed to fetch') ? 'Cannot reach the SakayTime server. Start the server and try again.' : requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  function switchMode() {
    setError('');
    onModeChange(isSignup ? 'login' : 'signup');
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "auth-backdrop",
    onMouseDown: event => event.target === event.currentTarget && onClose()
  }, /*#__PURE__*/React.createElement("section", {
    className: "auth-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "auth-title"
  }, /*#__PURE__*/React.createElement("button", {
    className: "auth-close",
    type: "button",
    onClick: onClose,
    "aria-label": "Close dialog"
  }, "×"), /*#__PURE__*/React.createElement("div", {
    className: "auth-mark",
    "aria-hidden": "true"
  }, "S"), /*#__PURE__*/React.createElement("h2", {
    id: "auth-title"
  }, isSignup ? 'Create your account' : 'Welcome back'), /*#__PURE__*/React.createElement("p", {
    className: "auth-intro"
  }, isSignup ? 'Sign up to make your everyday journeys a little easier.' : 'Log in to your SakayTime account to get started.'), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, isSignup && /*#__PURE__*/React.createElement("label", {
    className: "auth-field"
  }, "Full name", /*#__PURE__*/React.createElement("input", {
    name: "full_name",
    type: "text",
    autoComplete: "name",
    minLength: "2",
    required: true
  })), /*#__PURE__*/React.createElement("label", {
    className: "auth-field"
  }, "Email address", /*#__PURE__*/React.createElement("input", {
    id: "auth-email",
    name: "email",
    type: "email",
    autoComplete: "email",
    required: true
  })), /*#__PURE__*/React.createElement("label", {
    className: "auth-field"
  }, "Password", /*#__PURE__*/React.createElement("input", {
    name: "password",
    type: "password",
    autoComplete: isSignup ? 'new-password' : 'current-password',
    minLength: "8",
    required: true
  })), /*#__PURE__*/React.createElement("p", {
    className: "auth-error",
    role: "alert"
  }, error), /*#__PURE__*/React.createElement("button", {
    className: "button auth-submit",
    type: "submit",
    disabled: isSubmitting
  }, isSubmitting ? isSignup ? 'Creating account…' : 'Logging in…' : isSignup ? 'Create account' : 'Log in')), /*#__PURE__*/React.createElement("p", {
    className: "auth-switch"
  }, isSignup ? 'Already have an account?' : 'New to SakayTime?', ' ', /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: switchMode
  }, isSignup ? 'Log in' : 'Create an account'))));
}
export default AuthDialog;