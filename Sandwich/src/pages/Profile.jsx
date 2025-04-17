import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import config from "../config";

const Profile = () => {
  const { profile, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        role: profile.role || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      if (profile.photo) {
        setAvatarPreview(`${config.apiUrl}/${profile.photo}`);
      }
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleAvatarChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
  
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
  
      // 👇 Automatically upload the image
      const payload = new FormData();
      payload.append("profile", file);
  
      try {
        setIsSubmitting(true);
        await updateProfile(payload);
      } catch (err) {
        console.error("Avatar update failed", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);

    if (formData.currentPassword && formData.newPassword) {
      payload.append("currentPassword", formData.currentPassword);
      payload.append("newPassword", formData.newPassword);
    }

    if (avatarFile) {
      payload.append("profile", avatarFile);
    }

    try {
      await updateProfile(payload);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };


  // const formattedDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
  //   // weekday: "long", 
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  return (
<div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto" style={{ backgroundColor: '#fffbf2' }}>
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-[#5a1c00]">Profile</h1>
    <p className="text-black mt-2 text-sm sm:text-base">
      Manage your account settings and profile information
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-12">
    {/* Profile Card */}
    <div className="md:col-span-4 bg-white shadow rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-1 text-[#5a1c00]">Your Profile</h2>
      <p className="text-sm text-gray-500 mb-6">Personal information and preferences</p>

      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-2xl font-bold text-white">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              `${formData.firstName[0] || ""}${formData.lastName[0] || ""}`
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-[#5a1c00] hover:bg-[#6b2400] text-white p-1 rounded-full cursor-pointer border-2 border-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-4.553a1 1 0 00-1.414-1.414L13.5 8.586M16 5l2.5 2.5M12 15l4-4M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a.5.5 0 01-.5-.5V3H9v1.5a.5.5 0 01-.5.5H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
        </div>

        <h3 className="font-medium text-lg text-[#5a1c00]">{`${formData.firstName} ${formData.lastName}`}</h3>
        <p className="text-sm text-gray-500 capitalize">{formData.role}</p>

        <div className="mt-4 w-full border-t pt-4 text-sm grid grid-cols-[auto,1fr] gap-x-2 gap-y-1">
  <span className="text-[#5a1c00] font-bold">Email:</span>
  <span className="font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap">{formData.email}</span>

  <span className="text-[#5a1c00] font-bold">Phone:</span>
  <span className="font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap">{formData.phone}</span>

  <span className="text-[#5a1c00] font-bold">Role:</span>
  <span className="font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap">{profile.role}</span>
</div>

      </div>
    </div>

    {/* Profile Form */}
    <div className="md:col-span-8 bg-white shadow rounded-lg p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName", "email", "phone", "role"].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium capitalize text-[#5a1c00]">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
  type={field === "email" ? "email" : field === "phone" ? "text" : "text"}
  name={field}
  value={formData[field]}
  onChange={(e) => {
    if (field === "phone") {
      let onlyNumbers = e.target.value.replace(/\D/g, "");
      // onlyNumbers = onlyNumbers.slice(0, 10);
      handleInputChange({ target: { name: field, value: onlyNumbers } });
    } else {
      handleInputChange(e);
    }
  }}
  disabled={["email", "role"].includes(field)}
  inputMode={field === "phone" ? "numeric" : undefined}
  className={`mt-1 w-full border ${["email", "role"].includes(field) ? "bg-gray-100 text-gray-700" : ""} border-gray-300 rounded px-3 py-2`}
/>


            </div>
          ))}
        </div>

        <hr className="my-6" />

        <div>
          <label className="block text-sm font-medium text-[#5a1c00]">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#5a1c00]">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5a1c00]">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#5a1c00] text-white rounded hover:bg-[#6b2400]"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default Profile;
