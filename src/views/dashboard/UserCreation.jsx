import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormController from "../../components/ui/formcontroller/FormController";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().nonempty("Role is required"),
  bio: z.string().optional(),
  gender: z.string().nonempty("Gender is required"),
  birthdate: z.string().nonempty("Birthdate is required"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept terms" }),
  }),
  profilePicture: z.any().optional(),
});

const UserCreation = () => {
  const [preview, setPreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      bio: "",
      gender: "",
      birthdate: "",
      profilePicture: null,
      terms: false,
    },
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);


    alert(JSON.stringify(data));
    alert("User created successfully!");
  };

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(243,244,246,0.9), rgba(243,244,246,0.9)), url('/bg-user.jpg')",
      }}
    >
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          User Creation
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center mb-10">
  <div className="relative group">
    <div
      className="h-32 w-32 rounded-full border-4 border-blue-500 shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center"
    >
      {preview ? (
        <img
          src={preview}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-gray-400 text-sm">Upload</span>
      )}
    </div>

    {/* Overlay */}
    <label
      htmlFor="profilePicture"
      className="absolute inset-0 bg-black/40 rounded-full
                 flex items-center justify-center text-white text-sm
                 opacity-0 group-hover:opacity-100 cursor-pointer transition"
    >
      Change
    </label>

    <input
      id="profilePicture"
      type="file"
      accept="image/*"
      className="hidden"
      {...form.register("profilePicture")}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          form.setValue("profilePicture", e.target.files);
          setPreview(URL.createObjectURL(file));
        }
      }}
    />
  </div>
</div>

          {/* 🔹 Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormController
              label="Username"
              type="text"
              control={form.control}
              name="username"
              placeholder="Enter username"
              rules={{ required: "Username is required" }}
            />

            <FormController
              label="Email"
              type="email"
              control={form.control}
              name="email"
              placeholder="Enter email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
            />

            <FormController
              label="Password"
              type="password"
              control={form.control}
              name="password"
              placeholder="Enter password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              }}
            />
          </div>

          {/* 🔹 Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormController
              label="Role"
              type="select"
              control={form.control}
              name="role"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
              rules={{ required: "Role is required" }}
            />

            {/* Gender Cards */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center justify-center
                      border rounded-lg px-4 py-2 cursor-pointer transition
                      ${
                        form.watch("gender") === option.value
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...form.register("gender", {
                        required: "Gender is required",
                      })}
                      className="hidden"
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              {form.formState.errors.gender && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.gender.message}
                </span>
              )}
            </div>

            <FormController
              label="Birthdate"
              type="date"
              control={form.control}
              name="birthdate"
              rules={{ required: "Birthdate is required" }}
            />
          </div>

          {/* 🔹 Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Profile Picture Upload + Preview */}
            

            <FormController
              label="Bio"
              type="textarea"
              control={form.control}
              name="bio"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* 🔹 Checkbox */}
          <FormController
            label="I accept terms and conditions"
            type="checkbox"
            control={form.control}
            name="terms"
            rules={{
              validate: (v) =>
                v === true || "Please accept terms and conditions",
            }}
          />

          <hr className="border-gray-200 my-4" />

          {/* 🔹 Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-12 py-2.5
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white font-semibold
                         rounded-lg shadow-md
                         hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UserCreation;
