import { useState } from "react"
import { useSelector } from "react-redux"
import appwriteService from "../appwrite/config"

function Profile() {

    const [image, setImage] = useState(null)

    const [preview, setPreview] = useState(null)

    const userData = useSelector(
        (state) => state.auth.userData
    )

    const handleUpload = async () => {

        if (!image) return

        try {

            const file =
                await appwriteService.uploadFile(image)

            if (file) {

                await appwriteService.createOrUpdateProfile(

                    userData.$id,
                    userData.name,
                    file.$id

                )
                alert("Profile uploaded successfully")

            }

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div
            className="
                min-h-[70vh]
                flex
                items-center
                justify-center
                px-4
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    bg-slate-300
                    dark:bg-[#1e293b]
                    rounded-3xl
                    shadow-2xl
                    p-8
                    transition-all
                    duration-300
                "
            >

                {/* Profile Heading */}

                <div className="text-center mb-8">

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-gray-800
                            dark:text-white
                        "
                    >
                        Profile Setup
                    </h1>

                    <p
                        className="
                            text-gray-500
                            dark:text-gray-300
                            mt-2
                        "
                    >
                        Upload your profile picture
                    </p>

                </div>

                {/* Preview Image */}

                <div className="flex justify-center mb-6">

                    <img
                        src={
                            preview
                                ? preview
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="profile"
                        className="
                            w-32
                            h-32
                            rounded-full
                            object-cover
                            border-4
                            border-blue-500
                            shadow-lg
                        "
                    />

                </div>

                {/* Username */}

                <div className="text-center mb-6">

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-gray-700
                            dark:text-white
                        "
                    >
                        {userData?.name}
                    </h2>

                </div>

                {/* File Input */}

                <div className="mb-6">

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {

                            const file = e.target.files[0]

                            setImage(file)

                            if (file) {

                                setPreview(
                                    URL.createObjectURL(file)
                                )

                            }

                        }}
                        className="
                            w-full
                            text-sm
                            text-gray-700
                            dark:text-white
                            file:mr-4
                            file:py-2
                            file:px-4
                            file:rounded-full
                            file:border-0
                            file:text-sm
                            file:font-semibold
                            file:bg-blue-500
                            file:text-white
                            hover:file:bg-blue-600
                            cursor-pointer
                        "
                    />

                </div>

                {/* Upload Button */}

                <button
                    onClick={handleUpload}
                    className="
                        w-full
                        bg-blue-500
                        hover:bg-blue-600
                        text-white
                        font-semibold
                        py-3
                        rounded-xl
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        shadow-md
                    "
                >
                    Upload Profile
                </button>

            </div>

        </div>

    )

}

export default Profile