"use client";

import FormButton from "@/components/common/FormButton";
import FormInput from "@/components/common/FormInput";
import { loginSchema, TLoginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async () => {
		await new Promise((resolve) => setTimeout(resolve, 10000));

		reset();
	};

	return (
		<section className="flex flex-col gap-16">
			{/* Header */}
			<div className="flex flex-col gap-4">
				<h1 className="font-semibold text-neutral-600">Login</h1>
				<p className="font-medium">
					Don{"'"}t Have an Account?{" "}
					<Link
						href="/sign-up"
						className="text-blue-600 underline underline-offset-2"
					>
						Create One Now
					</Link>
				</p>
			</div>

			{/* Form */}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-10"
			>
				<div className="flex flex-col gap-6">
					{/* Email field */}
					<FormInput
						{...register("email")}
						title="Email"
						placeholder="Enter your email"
						errorMessage={errors.email?.message}
						isSubmitting={isSubmitting}
					/>

					{/* Password field */}
					<div className="flex flex-col gap-2">
						<FormInput
							{...register("password")}
							title="Password"
							placeholder="Enter your password"
							password
							errorMessage={errors.password?.message}
							isSubmitting={isSubmitting}
						/>

						<div className="flex justify-between items-center">
							{/* Remember me */}
							<div className="flex items-center gap-1">
								<input
									type="checkbox"
									disabled={isSubmitting}
								/>
								<p className="text-sm font-medium">
									Remember Me
								</p>
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

				{/* Login button */}
				<FormButton title="Login" isSubmitting={isSubmitting} />
			</form>
		</section>
	);
};

export default Login;
