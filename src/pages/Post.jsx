import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {

    const [post, setPost] = useState(null);

    const [profile, setProfile] = useState(null);

    const { slug } = useParams();

    const navigate = useNavigate();

    const userData = useSelector(
        (state) => state.auth.userData
    );

    const isAuthor =
        post && userData
            ? post.userId === userData.$id
            : false;

    useEffect(() => {

        if (slug) {

            appwriteService.getPost(slug)
            .then(async (postData) => {

                if (postData) {

                    setPost(postData);

                    const profileData =
                        await appwriteService.getUserProfile(
                            postData.userId
                        );

                    setProfile(profileData);

                } else {

                    navigate("/");

                }

            });

        } else {

            navigate("/");

        }

    }, [slug, navigate]);

    const deletePost = () => {

        appwriteService.deletePost(post.$id)
        .then((status) => {

            if (status) {

                appwriteService.deleteFile(
                    post.featuredImage
                );

                navigate("/");

            }

        });

    };

    return post ? (

        <div className="py-8">

            <Container>

                <div className="w-full flex justify-center mb-8 relative">
                    <img
                        src={
                            appwriteService.getFilePreview(
                                post.featuredImage
                            )
                        }
                        alt={post.title}
                        className="
                         w-full
                        max-w-5xl
                        h-[600px]
                        object-contain
                        rounded-3xl
                        shadow-2xl
                        border
                        border-gray-300"
                    />

                    {isAuthor && (

                        <div className="absolute right-6 top-6">

                            <Link to={`/edit-post/${post.$id}`}>

                                <Button
                                    bgColor="bg-green-500"
                                    className="mr-3"
                                >
                                    Edit
                                </Button>

                            </Link>

                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>

                        </div>

                    )}

                </div>

                <div className="w-full mb-6 text-center">

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-black
                            dark:text-white
                        "
                    >
                        {post.title}
                    </h1>

                </div>

                {/* User Section */}

                <div className="flex items-center gap-3 mb-5">

                    <img
                        src={
                            profile?.userDp
                                ? appwriteService.getFilePreview(
                                      profile.userDp
                                  )
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt={post.username}
                        className="
                            w-12
                            h-12
                            rounded-full
                            object-cover
                            border-2
                            border-white
                            shadow-md
                        "
                    />

                    <div>

                        <p
                            className="
                                font-semibold
                                text-lg
                                text-black
                                dark:text-white
                            "
                        >
                            {post.username}
                        </p>

                    </div>

                </div>

                <div
                    className="
                        browser-css
                        text-black
                        dark:text-gray-200
                        leading-8
                    "
                >

                    {parse(post.content)}

                </div>

            </Container>

        </div>

    ) : null;
}