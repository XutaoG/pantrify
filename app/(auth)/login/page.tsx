import FormButton from "@/components/common/FormButton";
import FormInput from "@/components/common/FormInput";
import Link from "next/link";
import React from "react";

const Login = () => {
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
			<div className="flex flex-col gap-10">
				<div className="flex flex-col gap-6">
					{/* Email field */}
					<FormInput title="Email" placeholder="Enter your email" />

					{/* Password field */}
					<div className="flex flex-col gap-2">
						<FormInput
							title="Password"
							placeholder="Enter your password"
							password
						/>

						<div className="flex justify-between items-center">
							{/* Remember me */}
							<div className="flex items-center gap-1">
								<input type="checkbox" />
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
				<FormButton title="Login" />
			</div>
		</section>
	);
};

export default Login;
