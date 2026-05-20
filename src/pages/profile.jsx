import { useState } from "react"
import { useSelector } from "react-redux"
import appwriteService from "../appwrite/config"

function Profile() {

    const [image, setImage] = useState(null)

    const userData = useSelector(
        (state) => state.auth.userData
    )

    const handleUpload = async () => {

        if (!image) return

        try {

            const file =
                await appwriteService.uploadFile(image)

            if (file) {

                await appwriteService.createUserProfile({

                    userId: userData.$id,

                    username: userData.name,

                    userDp: file.$id

                })

                alert("Profile uploaded successfully")

            }

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div className="p-10">

            <h1 className="text-2xl font-bold mb-5">
                Upload Profile Picture
            </h1>

            <input
                type="file"
                onChange={(e) =>
                    setImage(e.target.files[0])
                }
            />

            <button
                onClick={handleUpload}
                className="
                    bg-blue-500
                    text-white
                    px-4
                    py-2
                    rounded
                    mt-4
                    block
                "
            >
                Upload
            </button>

        </div>

    )

}

export default Profile