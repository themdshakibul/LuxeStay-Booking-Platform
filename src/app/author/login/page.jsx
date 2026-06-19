"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { data: signinData, error: signinError } =
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

    console.log({ signinData, signinError });

    if (signinError) {
      toast.error(signinError.message);
    } else {
      toast.success("Signed In Successfully!");
      redirect("/");
    }

    console.log("Form Data:", data);
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between font-sans">
      <div className="grow flex items-center justify-center py-12 px-6 relative overflow-hidden">
        {/* Decorative background blur shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-slate-950/80 backdrop-blur-md border-none shadow-2xl p-6 sm:p-8">
            <CardBody className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-slate-400 text-sm mt-1.5">
                  Sign in to access rentals and book viewings
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 w-full"
                noValidate
              >
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    variant="flat"
                    labelPlacement="outside"
                    isInvalid={!!errors.email}
                    startContent={
                      <FaEnvelope
                        size={14}
                        className="text-slate-400 mr-2 text-base shrink-0"
                      />
                    }
                    classNames={{
                      inputWrapper: [
                        "bg-slate-900/80 border border-slate-700/60",
                        "shadow-inner shadow-black/20",
                        "data-[hover=true]:bg-slate-800/80 data-[hover=true]:border-slate-600",
                        "group-data-[focus=true]:bg-slate-800/80 group-data-[focus=true]:border-indigo-500",
                        "transition-colors",
                        "!outline-none",
                        "data-[focus-visible=true]:!ring-0",
                        "data-[focus-visible=true]:!ring-offset-0",
                        "!flex !flex-row !items-center h-12",
                      ].join(" "),
                      innerWrapper: "!flex !flex-row !items-center h-full",
                      input:
                        "text-slate-200 placeholder:text-slate-500 !outline-none leading-none",
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Password
                  </label>
                  <Input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    id="password"
                    placeholder="••••••••"
                    type={isVisible ? "text" : "password"}
                    variant="flat"
                    labelPlacement="outside"
                    isInvalid={!!errors.password}
                    startContent={
                      <FaLock
                        size={14}
                        className="text-slate-400 mr-2 text-base shrink-0"
                      />
                    }
                    endContent={
                      <button
                        className="focus:outline-none opacity-70 hover:opacity-100 transition-opacity flex items-center"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                          isVisible ? "Hide password" : "Show password"
                        }
                        tabIndex={-1}
                      >
                        {isVisible ? (
                          <FaEyeSlash className="text-slate-400 text-base" />
                        ) : (
                          <FaEye className="text-slate-400 text-base" />
                        )}
                      </button>
                    }
                    classNames={{
                      inputWrapper: [
                        "bg-slate-900/80 border border-slate-700/60",
                        "shadow-inner shadow-black/20",
                        "data-[hover=true]:bg-slate-800/80 data-[hover=true]:border-slate-600",
                        "group-data-[focus=true]:bg-slate-800/80 group-data-[focus=true]:border-indigo-500",
                        "transition-colors",
                        "!outline-none",
                        "data-[focus-visible=true]:!ring-0",
                        "data-[focus-visible=true]:!ring-offset-0",
                        "!flex !flex-row !items-center h-12",
                      ].join(" "),
                      innerWrapper: "!flex !flex-row !items-center h-full",
                      input:
                        "text-slate-200 placeholder:text-slate-500 !outline-none leading-none",
                    }}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1.5 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  className="w-full bg-linear-to-r from-violet-600 to-indigo-600 text-white font-bold h-12 shadow-lg"
                  radius="lg"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Social Login Separator */}
              <div className="flex items-center text-slate-500 text-xs font-semibold">
                <div className="grow border-t border-slate-800" />
                <span className="px-4">OR CONTINUE WITH</span>
                <div className="grow border-t border-slate-800" />
              </div>

              {/* Google Social login */}
              <Button
                variant="flat"
                className="bg-slate-900 flex items-center text-slate-200 font-semibold hover:bg-slate-800 h-11 w-full"
                onClick={handleGoogleLogin}
              >
                <FcGoogle size={20} className="mr-2" />
                Sign In with Google
              </Button>

              <div className="text-center text-sm text-slate-400 mt-2">
                Don&apos;t have an account?{" "}
                <Link
                  href="/author/register"
                  className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
                >
                  Register here
                </Link>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
