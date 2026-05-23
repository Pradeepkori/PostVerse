import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#2B2B2B] dark:bg-gray-900 border border-t-2 border-white rounded-t-[30px]  dark:border-gray-700 mt-2">

      <div className="relative z-10 mx-auto max-w-7xl px-4">

        <div className="-m-6 flex flex-wrap">

          {/* Logo Section */}
            
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">

            <div className="flex h-full flex-col justify-between">

              <div className="mb-4 inline-flex items-center">
                 <h1 className="text-2xl font-bold text-amber-600 tracking-wide">
              PostVerse
            </h1>
              </div>

              <div>
                <p className="text-sm text-white">
                  © 2025 PostVerse. All Rights Reserved.
                </p>
              </div>

            </div>

          </div>

          {/* Company */}

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">

            <div className="h-full">

              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-amber-300">
                Company
              </h3>

              <ul>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/features"
                  >
                    Features
                  </Link>
                </li>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/pricing"
                  >
                    Pricing
                  </Link>
                </li>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/affiliate"
                  >
                    Affiliate Program
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/press-kit"
                  >
                    Press Kit
                  </Link>
                </li>

              </ul>

            </div>

          </div>

          {/* Support */}

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">

            <div className="h-full">

              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-amber-300">
                Support
              </h3>

              <ul>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/login"
                  >
                    Account
                  </Link>
                </li>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/help"
                  >
                    Help
                  </Link>
                </li>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/support"
                  >
                    Customer Support
                  </Link>
                </li>

              </ul>

            </div>

          </div>

          {/* Legal */}

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">

            <div className="h-full">

              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-amber-300">
                Legal
              </h3>

              <ul>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/terms"
                  >
                    Terms & Conditions
                  </Link>
                </li>

                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                    to="/license"
                  >
                    Licensing
                  </Link>
                </li>
    
                <li>
                    <Link
                        className="text-base font-medium text-white hover:text-blue-600 transition duration-300"
                        to="/about"
                    >
                        About
                    </Link>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Footer