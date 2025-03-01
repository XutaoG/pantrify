"use client";

import FormButton from "@/components/common/form/FormButton";
import FormInput from "@/components/common/form/FormInput";
import { signUp } from "@/api";
import { signUpSchema, TSignUpSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyboardEvent, ClipboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import FormPasswordInput from "@/components/common/form/FormPasswordInput";
import { CircleUserRound, KeyRound, Mail } from "lucide-react";

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

	const disablePaste = (event: ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault();
	};

	const disableSpace = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key.charCodeAt(0) === 32) {
			event.preventDefault();
		}
	};

	const onNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key.charCodeAt(0) === 66) {
			return;
		}

		if (event.key.charCodeAt(0) === 32 || !/^[a-zA-Z]$/.test(event.key)) {
			event.preventDefault();
		}
	};

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
		<section className="flex flex-col gap-10 custom-sm:gap-16">
			{/* Header */}
			<div className="flex flex-col gap-4">
				<h1 className="font-semibold tracking-wide text-neutral-600">Sign Up</h1>
				<p className="font-medium">
					Already Have an Account?{" "}
					<Link href="/login" className="text-blue-600 underline underline-offset-2">
						Login Here
					</Link>
				</p>
			</div>

			{/* Form */}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 custom-sm:gap-10"
			>
				<div className="flex flex-col gap-3 sm:gap-6">
					{/* Email field */}
					<FormInput
						{...register("email")}
						header="Email"
						headerIcon={<Mail size={16} />}
						placeholder="Enter your email"
						errorMessage={errors.email?.message}
						onFocus={removeSignUpError}
						onKeyDown={disableSpace}
					/>

					<div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-3 sm:gap-6">
						{/* First name fields */}
						<FormInput
							{...register("firstName")}
							header="First Name"
							headerIcon={<CircleUserRound size={16} />}
							placeholder="Enter your first name"
							errorMessage={errors.firstName?.message}
							onFocus={removeSignUpError}
							onKeyDown={onNameKeyDown}
							onPaste={disablePaste}
						/>

						{/* Last name field */}
						<FormInput
							{...register("lastName")}
							header="Last Name"
							headerIcon={<CircleUserRound size={16} />}
							placeholder="Enter your last name"
							errorMessage={errors.lastName?.message}
							onFocus={removeSignUpError}
							onKeyDown={onNameKeyDown}
							onPaste={disablePaste}
						/>
					</div>

					{/* Password field */}
					<div className="flex flex-col gap-2">
						<FormPasswordInput
							{...register("password")}
							header="Password"
							headerIcon={<KeyRound size={16} />}
							placeholder="Enter your password"
							errorMessage={errors.password?.message}
							onFocus={removeSignUpError}
							onKeyDown={disableSpace}
							onPaste={disablePaste}
						/>
					</div>

					{/* Confirm password field */}
					<div className="flex flex-col gap-2">
						<FormPasswordInput
							{...register("confirmPassword")}
							header="Confirm Password"
							headerIcon={<KeyRound size={16} />}
							placeholder="Confirm your password"
							disabled={isSubmitting}
							errorMessage={errors.confirmPassword?.message}
							onFocus={removeSignUpError}
							onKeyDown={disableSpace}
							onPaste={disablePaste}
						/>
					</div>
				</div>

				{/* Login error */}
				{signUpError && (
					<p className="self-center font-medium px-1 text-red-600">{signUpError}</p>
				)}

				{/* Login button */}
				<FormButton title="Sign Up" disabled={isSubmitting} />
			</form>
		</section>
	);
};

export default SignUp;
