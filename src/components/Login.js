import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth, provider } from "../firebase";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Login | Planeinfo`;
	}, [])

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				history.push("/");
			})
			.catch((error) => {
				// alert(error.message);
			});
	};
	
	const signInEmail = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				history.push("/");
			})
			.catch((error) => alert(error.message));
	};

	const register = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="loginContainer">
				<Link to="/" className="link">
					<h1 className="loginLogo">Planeinfo</h1>
				</Link>
				

				<button onClick={signIn} className="loginSignInButtonGoogle">
					<i className="fab fa-google"></i> Sign In with Google
				</button>

				<p>
					Warning: This is a rapidly developing site so some things may be vulneruble or unprotected and there may be bugs.
				</p>

			</div>
		</div>
	);
}

export default Login;
