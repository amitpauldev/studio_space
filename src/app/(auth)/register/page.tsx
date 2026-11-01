"use client";

// import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isError, setIsError] = useState("");
	const [isRequesting, setIsRequesting] = useState(false);

	const router = useRouter();

	const passwordsMatch = password === confirmPassword;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password.length < 8) {
			console.log("Password must be at least 8 characters long.");
			return;
		}
		if (!passwordsMatch) {
			console.log("Passwords do not match.");
			return;
		}

		const formData = new FormData(e.target as HTMLFormElement);
		const formValues = Object.fromEntries(formData.entries()) as {
			email: string;
			name: string;
			password: string;
		};

		// await authClient.signUp.email(
		// 	{
		// 		email: formValues.email,
		// 		password: formValues.password,
		// 		name: formValues.name,
		// 	},
		// 	{
		// 		onRequest: (ctx) => {
		// 			setIsRequesting(true);
		// 			setPassword("");
		// 			setConfirmPassword("");
		// 		},
		// 		onSuccess: (ctx) => {
		// 			toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।");
		// 			setIsRequesting(false);
		// 			router.replace("/profile");
		// 			router.refresh();
		// 		},
		// 		onError: (ctx) => {
		// 			toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন");
		// 			setIsError(ctx.error.message);
		// 			setIsRequesting(false);
		// 			setPassword("");
		// 			setConfirmPassword("");

		// 			setTimeout(() => {
		// 				setIsError("");
		// 			}, 7000);
		// 		},
		// 	},
		// );
	};

	// const handleGoogleSignIn = async () => {
	// 	await authClient.signIn.social({
	// 		provider: "google",
	// 	});
	// };

	// const handleGitHubSignIn = async () => {
	// 	await authClient.signIn.social({
	// 		provider: "github",
	// 	});
	// };

	return (
		<main className="min-h-screen bg-background lg:grid lg:grid-cols-2">
			{/* Left Branding Section */}
			<section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex xl:p-16">
				{/* Decorative Elements */}
				<div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
				<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
				<div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/5" />

				{/* Logo */}
				<div className="relative z-10">
					<Link href="/" className="">
						<Image
							src="/images/logo-reverse.png"
							alt="StudioSpace Logo"
							width={100}
							height={100}
							className="h-20 w-auto object-contain"
							priority
						/>
					</Link>
				</div>

				{/* Hero Content */}
				<div className="relative z-10 my-16 max-w-xl">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
						<span className="h-2 w-2 rounded-full bg-secondary" />A community
						built for creators
					</div>

					<h1 className="text-4xl font-extrabold leading-tight tracking-tight xl:text-6xl">
						Your next
						<br />
						<span className="text-secondary">great idea</span>
						<br />
						starts here.
					</h1>

					<p className="mt-6 max-w-md text-base leading-8 text-white/80 xl:text-lg">
						Join StudioSpace and discover creative spaces that inspire you.
						Connect with hosts, explore unique studios, and bring your next big
						project to life.
					</p>

					<div className="mt-10 flex flex-wrap gap-3">
						{["Discover spaces", "Book studios", "Create more"].map((item) => (
							<span
								key={item}
								className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm"
							>
								{item}
							</span>
						))}
					</div>
				</div>

				{/* Footer */}
				<div className="relative z-10 text-sm text-white/60">
					© {new Date().getFullYear()} StudioSpace. Built for creators.
				</div>
			</section>

			{/* Right Register Section */}
			<section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="mb-7 text-center lg:text-left">
						{/* Mobile Logo */}
						<Link
							href="/"
							className="mb-7 inline-flex items-center justify-center gap-2 lg:hidden"
						>
							<Image
								src="/images/logo.png"
								alt="StudioSpace Logo"
								width={42}
								height={42}
								className="h-10 w-auto object-contain"
								priority
							/>
							<span className="text-xl font-bold tracking-tight text-foreground">
								studio space
							</span>
						</Link>

						<h1 className="text-3xl font-extrabold tracking-tight text-foreground">
							Create your account
						</h1>

						<p className="mt-2 text-sm text-muted-foreground">
							Join StudioSpace and start creating something amazing.
						</p>
					</div>

					{/* Sign Up Form */}
					<div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
						<form className="space-y-4" onSubmit={handleSubmit}>
							{/* Name */}
							<div>
								<label
									htmlFor="name"
									className="mb-2 block text-sm font-semibold text-card-foreground"
								>
									Full name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									placeholder="Enter your full name"
									required
									className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20"
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-semibold text-card-foreground"
								>
									Email address
								</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									placeholder="you@example.com"
									required
									className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20"
								/>
							</div>

							{/* Password */}
							<div>
								<label
									htmlFor="password"
									className="mb-2 block text-sm font-semibold text-card-foreground"
								>
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									placeholder="Create a password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20"
								/>

								{password.length > 0 && password.length < 8 && (
									<p className="mt-2 text-xs text-destructive">
										Password must be at least 8 characters long.
									</p>
								)}
							</div>

							{/* Confirm Password */}
							<div>
								<label
									htmlFor="confirmPassword"
									className="mb-2 block text-sm font-semibold text-card-foreground"
								>
									Confirm password
								</label>
								<input
									id="confirmPassword"
									type="password"
									autoComplete="new-password"
									placeholder="Confirm your password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
									className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20"
								/>

								{confirmPassword && !passwordsMatch && (
									<p className="mt-2 text-xs text-destructive">
										Passwords do not match.
									</p>
								)}
							</div>

							{isError && <p className="text-sm text-destructive">{isError}</p>}

							{/* Submit */}
							<button
								disabled={isRequesting}
								type="submit"
								className="h-11 w-full cursor-pointer rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isRequesting ? "Creating account..." : "Create Account"}
							</button>
						</form>

						{/* Divider */}
						<div className="my-6 flex items-center gap-4">
							<div className="h-px flex-1 bg-border" />
							<span className="text-xs font-medium text-muted-foreground">
								OR CONTINUE WITH
							</span>
							<div className="h-px flex-1 bg-border" />
						</div>

						{/* Social Sign Up */}
						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								// onClick={handleGoogleSignIn}
								className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-card text-xs font-semibold text-card-foreground transition hover:bg-muted"
							>
								<svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
									<path
										fill="#4285F4"
										d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
									/>
									<path
										fill="#34A853"
										d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
									/>
									<path
										fill="#FBBC05"
										d="M12.6 27.5a12 12 0 0 1 0-7v-5.3H5.8a20 20 0 0 0 0 17.6l6.8-5.3Z"
									/>
									<path
										fill="#EA4335"
										d="M24 12.1c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
									/>
								</svg>
								Google
							</button>

							<button
								type="button"
								// onClick={handleGitHubSignIn}
								className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-card text-xs font-semibold text-card-foreground transition hover:bg-muted"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
								</svg>
								GitHub
							</button>
						</div>

						{/* Sign In Link */}
						<p className="mt-7 text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link
								href="/login"
								className="font-bold text-primary transition hover:text-primary-hover hover:underline"
							>
								Login
							</Link>
						</p>
					</div>

					{/* Back Link */}
					<p className="mt-6 text-center text-sm text-muted-foreground">
						<Link href="/" className="transition hover:text-primary">
							← Back to home
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
};

export default RegisterPage;
