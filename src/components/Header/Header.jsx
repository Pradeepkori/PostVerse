
import {Container, Logo, LogoutBtn} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logoImage from "../../assets/Simple Letter V Logo.jpg"

function Header({darkMode, setDarkMode}) {

  const authStatus = useSelector((state) => state.auth.status ) 
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
    name: "Profile",
    slug: "/profile",
    active: authStatus,
  },
  ]



  return (
  <header className="sticky top-0 z-50 bg-[#595959]  dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm rounded-b-2xl">

    <Container>

      <nav className="flex flex-col md:flex-row items-center justify-between py-3 gap-4">

      {/* Logo */}
      <div className="w-full md:w-auto flex justify-center md:justify-start">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logoImage}
            alt="PostVerse Logo"
            className="w-[50px] h-[50px] rounded-xl shadow-md"
          />

          <h1 className="text-2xl font-bold text-yellow-600 tracking-wide hover:text-yellow-500 transition-all duration-300">
            PostVerse
          </h1>
        </Link>
      </div>

      {/* Nav Items */}
      <ul className="
        flex
        flex-wrap
        justify-center
        items-center
        gap-3
        md:gap-5
      ">

        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>

              <button
                onClick={() => navigate(item.slug)}
                className="
                  px-4
                  py-2
                  rounded-full
                  text-white
                  text-sm
                  md:text-base
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-blue-100
                  hover:text-blue-600
                "
              >
                {item.name}
              </button>

            </li>
          ) : null
        )}

        {authStatus && (
          <li className="text-yellow-600">
            <LogoutBtn />
          </li>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            px-3
            py-2
            rounded-full
            bg-black
            text-white
            hover:bg-blue-100
            transition-all
            duration-300
          "
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </ul>

    </nav>
    </Container>

  </header>
)
}


export default Header
