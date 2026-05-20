import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input



    //     {/* Like Button */}

    //     <button

    //       onClick={async () => {

    //         try {
              
    //           const response =
    //           await appwriteService.likePost(
    //             $id,
    //             userData.$id,
    //             userData.name
    //           )

    //         if (response.liked) {

    //           setLikeCount((prev) => prev + 1)

    //         } else {

    //           setLikeCount((prev) => prev - 1)
    //         }

    //         } catch (error) {

    //           console.log(error)

    //         }

    //       }}

    //       className="
    //         flex
    //         items-center
    //         gap-2
    //         text-red-500
    //         hover:scale-110
    //         transition-all
    //         duration-300
    //       "
    //     >

    //       <FaHeart className="text-xl" />

    //       <span className="font-semibold">
    //         {likesCount}
    //       </span>

    //     </button>

    //     {/* Comment Button */}

    //     <button

    //       onClick={() =>
    //         setShowComments(!showComments)
    //       }

    //       className="
    //         flex
    //         items-center
    //         gap-2
    //         text-blue-500
    //         hover:scale-110
    //         transition-all
    //         duration-300
    //       "
    //     >

    //       <FaComment className="text-xl" />

    //       <span className="font-semibold">
    //         {commentCount}
    //       </span>

    //     </button>

    //   </div>