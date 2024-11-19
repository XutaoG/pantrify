"use client";

import FormButton from "@/components/common/form/FormButton";
import FormInput from "@/components/common/form/FormInput";
import { signUp } from "@/api";
import { signUpSchema, TSignUpSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<TSignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});

	const [signUpError, setSignUpError] = useState<string | null>(null);

	const router = useRouter();

	const onSubmit = async () => {
		const signUpResponse = await signUp(getValues());

		// Check if error message exists
		if (signUpResponse.errorMessage == null) {
			router.push("/login");
		} else {
			setSignUpError(signUpResponse.errorMessage);
		}
	};

	const removeSignUpError = () => {
		setSignUpError(null);
	};

	return (
		<section className="flex flex-col gap-16">
			{/* Header */}
			<div className="flex flex-col gap-4">
				<h1 className="font-semibold text-neutral-600">Sign Up</h1>
				<p className="font-medium">
					Already Have an Account?{" "}
					<Link href="/login" className="text-blue-600 underline underline-offset-2">
						Login Here
					</Link>
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
				<div className="flex flex-col gap-6">
					{/* Email field */}
					<FormInput
						{...register("email")}
						title="Email"
						placeholder="Enter your email"
						errorMessage={errors.email?.message}
						isSubmitting={isSubmitting}
						onFocus={removeSignUpError}
					/>

					<div className="flex gap-6">
						{/* First name fields */}
						<FormInput
							{...register("firstName")}
							title="First Name"
							placeholder="Enter your first name"
							errorMessage={errors.firstName?.message}
							isSubmitting={isSubmitting}
							onFocus={removeSignUpError}
						/>

						{/* Last name field */}
						<FormInput
							{...register("lastName")}
							title="Last Name"
							placeholder="Enter your last name"
							errorMessage={errors.lastName?.message}
							isSubmitting={isSubmitting}
							onFocus={removeSignUpError}
						/>
					</div>

					{/* Password field */}
					<div className="flex flex-col gap-2">
						<FormInput
							{...register("password")}
							title="Password"
							placeholder="Enter your password"
							password
							errorMessage={errors.password?.message}
							isSubmitting={isSubmitting}
							onFocus={removeSignUpError}
						/>
					</div>

					{/* Confirm password field */}
					<div className="flex flex-col gap-2">
						<FormInput
							{...register("confirmPassword")}
							title="Confirm Password"
							placeholder="Confirm your password"
							password
							disabled={isSubmitting}
							errorMessage={errors.confirmPassword?.message}
							isSubmitting={isSubmitting}
							onFocus={removeSignUpError}
						/>
					</div>
				</div>

				{/* Login error */}
				{signUpError && <p className="self-center font-medium px-1 text-red-600">{signUpError}</p>}

				{/* Login button */}
				<FormButton title="Sign Up" isSubmitting={isSubmitting} />
			</form>
		</section>
	);
};

export default SignUp;
