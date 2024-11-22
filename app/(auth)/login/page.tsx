"use client";

import { login } from "@/api";
import FormButton from "@/components/common/form/FormButton";
import FormInput from "@/components/common/form/FormInput";
import { loginSchema, TLoginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { KeyRound, Mail } from "lucide-react";
import FormPasswordInput from "@/components/common/form/FormPasswordInput";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const [loginError, setLoginError] = useState<string | null>(null);

	const router = useRouter();

	const onSubmit = async () => {
		const loginResponse = await login(getValues());

		// Check if error message exists
		if (loginResponse.errorMessage == null) {
			router.push("/");
		} else {
			setLoginError(loginResponse.errorMessage);
		}
	};

	const removeLoginError = () => {
		setLoginError(null);
	};

	return (
		<section className="flex flex-col gap-16">
			{/* Header */}
			<div className="flex flex-col gap-4">
				<h1 className="font-semibold tracking-wide text-neutral-600">Login</h1>
				<p className="font-medium">
					Don{"'"}t Have an Account?{" "}
					<Link href="/sign-up" className="text-blue-600 underline underline-offset-2">
						Create One Now
					</Link>
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
				<div className="flex flex-col gap-6">
					{/* Email field */}
					<FormInput
						{...register("email")}
						header="Email"
						headerIcon={<Mail size={16} />}
						placeholder="Enter your email"
						errorMessage={errors.email?.message}
						onFocus={removeLoginError}
					/>

					{/* Password field */}
					<div className="flex flex-col gap-2">
						<FormPasswordInput
							{...register("password")}
							header="Password"
							headerIcon={<KeyRound size={16} />}
							placeholder="Enter your password"
							errorMessage={errors.password?.message}
							onFocus={removeLoginError}
						/>

						<div className="flex justify-between items-center">
							{/* Remember me */}
							<div className="flex items-center gap-2">
								<input
									{...register("rememberMe")}
									type="checkbox"
									disabled={isSubmitting}
								/>
								<p className="text-sm font-medium">Remember Me</p>
							</div>

							{/* Forgot password */}
							<Link
								className="text-sm font-medium text-blue-600 underline underline-offset-1"
								href="/login"
							>
								Forgot Password?
							</Link>
						</div>
					</div>
				</div>

				{/* Login error */}
				{loginError && (
					<p className="self-center font-medium px-1 text-red-600">{loginError}</p>
				)}

				{/* Login button */}
				<FormButton title="Login" disabled={isSubmitting} />
			</form>
		</section>
	);
};

export default Login;
