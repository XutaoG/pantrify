import FormButton from "@/components/common/FormButton";
import FormInput from "@/components/common/FormInput";
import Link from "next/link";
import React from "react";

const SignUp = () => {
	return (
		<section className="flex flex-col gap-16">
			{/* Header */}
			<div className="flex flex-col gap-4">
				<h1 className="font-semibold text-neutral-600">Sign Up</h1>
				<p className="font-medium">
					Already Have an Account?{" "}
					<Link
						href="/login"
						className="text-blue-600 underline underline-offset-2"
					>
						Login Here
					</Link>
				</p>
			</div>

			{/* Form */}
			<div className="flex flex-col gap-10">
				<div className="flex flex-col gap-6">
					{/* Email field */}
					<FormInput title="Email" placeholder="Enter your email" />

					<div className="flex gap-6">
						{/* First name fields */}
						<FormInput
							title="First Name"
							placeholder="Enter your first name"
						/>

						{/* Last name field */}
						<FormInput
							title="Last Name"
							placeholder="Enter your last name"
						/>
					</div>

					{/* Password field */}
					<div className="flex flex-col gap-2">
						<FormInput
							title="Password"
							placeholder="Enter your password"
							password
						/>
					</div>

					{/* Confirm password field */}
					<div className="flex flex-col gap-2">
						<FormInput
							title="Confirm Password"
							placeholder="Confirm your password"
							password
						/>
					</div>
				</div>

				{/* Login button */}
				<FormButton title="Sign Up" />
			</div>
		</section>
	);
};

export default SignUp;
