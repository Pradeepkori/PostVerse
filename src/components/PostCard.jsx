import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { FaHeart, FaComment, FaShare } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function PostCard({ $id, title, featuredImage, username, userId }) {

  const [likesCount, setLikesCount] = useState(0)

  const [commentCount, setCommentCount] = useState(0) 

  const [comments, setComments] = useState([])

  const [showComments, setShowComments] = useState(false)

  const [isLiked, setIsLiked] = useState(false)

  const [likedUsers, setLikedUsers] = useState([])

  const [profile, setProfile] = useState(null)

  const [commentText, setCommentText] = useState("")

  const userData = useSelector(
    (state) => state.auth.userData
  )

  useEffect(() => {
    
    const fetchProfile = async () => {  
      
      const profileData =
      await appwriteService.getUserProfile(userId)
      setProfile(profileData)
    }
    
    fetchProfile()
    
    const fetchData = async () => {

      try {

        const likedUsersData =
          await appwriteService.getLikedUsers($id)
        
        setLikedUsers(likedUsersData.documents)

        const likes =
          await appwriteService.getLikes($id)

        const commentsData =
          await appwriteService.getComments($id)

        setLikesCount(likes.total)

        setCommentCount(commentsData.total)

        setComments(commentsData.documents)

      } catch (error) {
        
        console.log(error)

      }

    }

    fetchData()

  }, [$id, userId])

  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null
    
    const handleShare = async () => {

      const shareData = {
        title: title,
        text: `Check out this post: ${title}`,
        url: `${window.location.origin}/post/${$id}`
      }

      try {

        await navigator.share(shareData)

      } catch (error) {

        console.log("Share cancelled")

      }

    }

  return (

    <div
      className="
        w-full
        bg-slate-300
        rounded-xl
        p-4
        transition
        hover:scale-[1.02]
        duration-300
      "
    >

      {/* Clickable Post Area */}

      <Link to={`/post/${$id}`}>

      {/* User Profile Section */}

        <div
          className="
            flex
            items-center
            gap-3
            mb-4
            px-1
          "
        >

          <img
            src={
              profile?.userDp
                ? appwriteService.getFilePreview(profile.userDp)
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={username}
            className="
              w-11
              h-11
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
                text-gray-800
                text-base
              "
            >
              {username}
            </p>
            
          </div>

        </div>

        {/* Image */}

        <div className="w-full justify-center mb-4">

          {imageUrl && (

            <img
              src={imageUrl}
              alt={title}
              className="
                rounded-xl
                w-full
                h-52 sm:h-60
                object-cover
              "
            />

          )}

        </div>


        {/* Title */}

        <h2
          className="
            text-xl
            font-bold
            text-gray-800
            text-center
          "
        >
          {title}
        </h2> 

      </Link>

      {/* Action Buttons */}

     <div
        className="
          flex
          items-center
          justify-between
          mt-5
          px-2
          flex-wrap
          gap-2
        "
      >

        {/* Like Button */}

        <button

          title={
            likedUsers.length > 0
              ? likedUsers
                  .map((user) => user.username)
                  .join(", ")
              : "No likes yet"
          }

          onClick={async () => {

            if (!userData) {

              alert("Please login first")

              return
            }

            try {

              const response =
                await appwriteService.likePost(
                  $id,
                  userData.$id,
                  userData.name
                )

              if (response.liked) {

                setIsLiked(true)

                setLikesCount((prev) => prev + 1)

              } else {

                setIsLiked(false)

                setLikesCount((prev) => prev - 1)
              }

            } catch (error) {

              console.log(error)

            }

          }}

          className={`
            flex
            items-center
            gap-2
            hover:scale-110
            transition-all
            duration-300
            ${isLiked ? "text-red-600" : "text-gray-500"}
          `}
        >

          <FaHeart className="text-xl" />

          <span className="font-semibold">
            {likesCount}
          </span>

        </button>

        {/* Comment Button */}

        <button

          onClick={() =>
            setShowComments(!showComments)
          }

          className="
            flex
            items-center
            gap-2
            text-blue-500
            hover:scale-110
            transition-all
            duration-300
          "
        >

          <FaComment className="text-xl" />

          <span className="font-semibold">
            {commentCount}
          </span>

        </button> 

        {/* Share Button */}

        <button

          onClick={handleShare}

          className="
            flex
            items-center
            gap-2
            text-green-500
            hover:scale-110
            transition-all
            duration-300
          "
        >

          <FaShare className="text-xl" />

          <span className="font-semibold">
            Share
          </span>

        </button>

      </div>

      {/* Comment Section */}

      {showComments && (

        <div className="mt-4">

          {/* Existing Comments */}

          <div className="space-y-2 mb-4">

            {comments.length > 0 ? (

              comments.map((item) => (

                <div
                  key={item.$id}
                  className="
                    bg-white
                    p-3
                    rounded-lg
                    shadow-sm
                  "
                >

                  <p className="font-semibold text-sm">
                    {item.username}
                  </p>

                  <p className="text-gray-700">
                    {item.comment}
                  </p>

                </div>

              ))

            ) : (

              <p className="text-gray-500">
                No comments yet
              </p>

            )}

          </div>

          {/* Comment Input */}

          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
            className="
              w-full
              border
              rounded-lg
              p-2
              outline-none
            "
          />

          {/* Post Comment Button */}

          <button

            onClick={async () => {

              if (!userData) {

                alert("Please login first")

                return
              }

              if (!commentText.trim()) return

              try {

                const newComment =
                  await appwriteService.addComment(
                    $id,
                    userData.$id,
                    userData.name,
                    commentText
                  )

                setComments((prev) => [
                  ...prev,
                  newComment
                ])

                setCommentCount((prev) => prev + 1)

                setCommentText("")

              } catch (error) {

                console.log(error)

              }

            }}

            className="
              mt-2
              bg-blue-500
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-blue-600
            "
          >
            Post Comment
          </button>

        </div>

      )}

    </div>

  )

}

export default PostCard