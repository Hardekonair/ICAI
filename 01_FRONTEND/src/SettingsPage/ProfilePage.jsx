import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Calendar,
    Clock,
    Edit3,
    X,
    Save,
    ShieldCheck,
} from "lucide-react";

import {
    getCurrentUser,
    updateCurrentUser,
} from "../api/userApi";

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");

    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCurrentUser();

            if (!data.success) {
                setError(data.message || "Failed to load profile.");
                return;
            }

            setUser(data.user);
        } catch (error) {
            console.error("Profile fetch error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setName(user.name || "");
        setSaveError("");
        setSuccessMessage("");
        setIsEditing(true);
    };

    const handleCancel = () => {
        setName(user.name || "");
        setSaveError("");
        setIsEditing(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setSaveError("Name cannot be empty.");
            return;
        }

        try {
            setSaving(true);
            setSaveError("");
            setSuccessMessage("");

            const data = await updateCurrentUser({
                name: name.trim(),
            });

            if (!data.success) {
                setSaveError(
                    data.message || "Failed to update profile."
                );
                return;
            }

            setUser(data.user);
            setIsEditing(false);
            setSuccessMessage("Profile updated successfully.");
        } catch (error) {
            console.error("Profile update error:", error);

            setSaveError(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="flex min-h-[350px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />

                    <p className="text-sm text-gray-500">
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[350px] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                    <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                        <ShieldCheck
                            size={18}
                            className="text-red-500"
                        />
                    </div>

                    <h2 className="text-sm font-semibold text-gray-800">
                        Unable to load profile
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="w-full px-4 py-5 sm:px-5">

            {/* Header */}
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-800">
                    Profile
                </h1>

                <p className="mt-0.5 text-sm text-gray-500">
                    Manage your personal information and account details.
                </p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
                    <p className="text-xs font-medium text-green-700">
                        {successMessage}
                    </p>
                </div>
            )}

            {/* Profile Card */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Profile Header */}
                <div className="border-b border-gray-100 px-4 py-4">
                    <div className="flex items-center justify-between gap-4">

                        <div className="flex min-w-0 items-center gap-3">

                            {/* Avatar */}
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-yellow-100">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User
                                        size={22}
                                        className="text-yellow-600"
                                    />
                                )}
                            </div>

                            {/* User */}
                            <div className="min-w-0">
                                <h2 className="truncate text-base font-semibold text-gray-800">
                                    {user.name}
                                </h2>

                                <p className="mt-0.5 truncate text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {!isEditing && (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <Edit3 size={14} />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Edit Section */}
                {isEditing && (
                    <form
                        onSubmit={handleSave}
                        className="border-b border-gray-100 bg-gray-50/60 px-4 py-4"
                    >
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">
                                Edit Profile
                            </h3>

                            <p className="mt-0.5 text-xs text-gray-500">
                                Update your personal information.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <User
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        disabled={saving}
                                        placeholder="Enter your name"
                                        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 disabled:bg-gray-100"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 py-2 pl-9 pr-3 text-sm text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {saveError && (
                            <p className="mt-2 text-xs text-red-500">
                                {saveError}
                            </p>
                        )}

                        <div className="mt-3 flex items-center gap-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-2 text-xs font-medium text-gray-900 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save size={14} />

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={saving}
                                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Personal Information */}
                <section className="px-4 py-4">
                    <SectionHeader
                        title="Personal Information"
                        description="Your basic account information."
                    />

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <ProfileField
                            icon={<User size={15} />}
                            label="Full Name"
                            value={user.name}
                        />

                        <ProfileField
                            icon={<Mail size={15} />}
                            label="Email Address"
                            value={user.email}
                        />
                    </div>
                </section>

                {/* Account Information */}
                <section className="border-t border-gray-100 px-4 py-4">
                    <SectionHeader
                        title="Account Information"
                        description="Information about your account."
                    />

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <ProfileField
                            icon={<Calendar size={15} />}
                            label="Account Created"
                            value={formatDate(user.createdAt)}
                        />

                        <ProfileField
                            icon={<Clock size={15} />}
                            label="Profile Updated"
                            value={formatDateTime(user.updatedAt)}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

const SectionHeader = ({ title, description }) => {
    return (
        <div>
            <h3 className="text-sm font-semibold text-gray-800">
                {title}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
                {description}
            </p>
        </div>
    );
};

const ProfileField = ({ icon, label, value }) => {
    return (
        <div className="rounded-lg border border-gray-200 px-3 py-2.5">

            <div className="flex items-center gap-2">
                <span className="text-gray-400">
                    {icon}
                </span>

                <span className="text-xs font-medium text-gray-500">
                    {label}
                </span>
            </div>

            <p className="mt-1 truncate text-sm font-medium text-gray-800">
                {value || "Not available"}
            </p>
        </div>
    );
};

export default ProfilePage;