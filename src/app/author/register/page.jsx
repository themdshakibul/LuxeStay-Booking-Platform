"use client";

import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { MdEmail, MdOutlineAccountCircle, MdPhotoCamera } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { UploadImage } from "@/lib/utils/imageupload";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const inputWrapperClasses = [
  "bg-slate-900 border border-slate-800",
  "hover:border-slate-700",
  "group-data-[focus=true]:border-violet-500",
  "!outline-none",
  "data-[focus-visible=true]:!ring-0",
  "data-[focus-visible=true]:!ring-offset-0",
  "!flex !flex-row !items-center h-12",
].join(" ");

const inputClasses =
  "text-slate-100 placeholder:text-slate-500 text-xs !outline-none leading-none";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [role, setRole] = useState("Tenant");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    onChange: rhfPhotoOnChange,
    ref: photoRef,
    name: photoName,
    onBlur: photoOnBlur,
  } = register("photo", {
    required: "Profile photo is required",
  });

  const handlePhotoChange = (e) => {
    rhfPhotoOnChange(e);

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      setError("photo", { message: "Please select a valid image file" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      setError("photo", { message: "Image must be smaller than 5MB" });
      return;
    }

    clearErrors("photo");
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    const imageFile = data.photo?.[0];
    const imageUrl = imageFile ? await UploadImage(imageFile) : "";

    const { data: signUpData, error: signUpError } =
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl,
        role,
      });

    if (signUpError) {
      toast.error(signUpError.message);
    } else {
      toast.success("Account created successfully!");
      redirect("/");
    }

    console.log("Form Data:", signUpData);
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between font-sans">
      <div className="grow flex items-center justify-center py-12 px-6 relative overflow-hidden">
        {/* Background glow animations */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="bg-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-8">
            <CardBody className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Create Account
                </h2>
                <p className="text-slate-400 text-xs mt-1.5">
                  Register as a Tenant or Owner to begin
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                noValidate
              >
                {/* Profile Photo Upload */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <MdPhotoCamera className="text-slate-600" size={28} />
                      )}
                    </div>
                    <label
                      htmlFor="photo"
                      className="absolute bottom-0 right-0 bg-violet-600 hover:bg-violet-500 transition-colors rounded-full p-1.5 cursor-pointer shadow-lg"
                    >
                      <MdPhotoCamera className="text-white" size={14} />
                    </label>
                    <input
                      id="photo"
                      name={photoName}
                      ref={photoRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      onBlur={photoOnBlur}
                      className="hidden"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    {photoFile ? photoFile.name : "Upload profile photo"}
                  </span>
                  {errors.photo && (
                    <p className="text-red-400 text-xs font-medium">
                      {errors.photo.message}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold uppercase tracking-wider text-slate-400"
                  >
                    Full Name
                  </label>
                  <Input
                    {...register("name", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    variant="flat"
                    labelPlacement="outside"
                    isInvalid={!!errors.name}
                    startContent={
                      <MdOutlineAccountCircle
                        className="text-slate-500 mr-2 shrink-0"
                        size={18}
                      />
                    }
                    classNames={{
                      inputWrapper: inputWrapperClasses,
                      innerWrapper: "!flex !flex-row !items-center h-full",
                      input: inputClasses,
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-wider text-slate-400"
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
                    type="email"
                    placeholder="john@example.com"
                    variant="flat"
                    labelPlacement="outside"
                    isInvalid={!!errors.email}
                    startContent={
                      <MdEmail
                        className="text-slate-500 mr-2 shrink-0"
                        size={18}
                      />
                    }
                    classNames={{
                      inputWrapper: inputWrapperClasses,
                      innerWrapper: "!flex !flex-row !items-center h-full",
                      input: inputClasses,
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
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

                {/* Role dropdown selection */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="role"
                    className="text-xs font-bold uppercase tracking-wider text-slate-400"
                  >
                    Select Role
                  </label>
                  <select
                    id="role"
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs rounded-xl p-3 outline-none focus:border-violet-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="tenant">Tenant (Rent Properties)</option>
                    <option value="owner">Owner (List Properties)</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  color="primary"
                  className="w-full bg-linear-to-r from-violet-600 to-indigo-600 text-white font-bold h-12 shadow-lg"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              {/* Separator */}
              <div className="flex items-center my-2 text-slate-500 text-xs font-semibold">
                <div className="grow border-t border-slate-800" />
                <span className="px-3">OR SIGN UP WITH</span>
                <div className="grow border-t border-slate-800" />
              </div>

              {/* Google OAuth action */}
              <Button
                variant="bordered"
                className="border-slate-800 flex items-center justify-center gap-2 text-slate-200 font-bold hover:bg-slate-900 text-xs"
                onClick={handleGoogleLogin}
              >
                <FcGoogle size={20} />
                Sign Up with Google
              </Button>

              <div className="text-center text-xs text-slate-400 mt-2">
                Already have an account?{" "}
                <Link
                  href="/author/login"
                  className="text-violet-400 font-bold hover:underline"
                >
                  Sign In here
                </Link>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
