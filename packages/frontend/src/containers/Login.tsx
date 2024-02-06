import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { Auth } from "aws-amplify";

import { useAppContext } from "../lib/contextLib";

import "./Login.css";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";

export default function Login() {
	const { userHasAuthenticated } = useAppContext();
	const nav = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setIsLoading(true);

		try {
			await Auth.signIn(email, password);
			userHasAuthenticated(true);
			nav("/");
		} catch (error) {
			onError(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Stack gap={3}>
					<Form.Group controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
							size="lg"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							size="lg"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<LoaderButton
						size="lg"
						type="submit"
						isLoading={isLoading}
						disabled={!validateForm()}
					>
						Login
					</LoaderButton>
				</Stack>
			</Form>
		</div>
	);
}
