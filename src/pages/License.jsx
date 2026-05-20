function License() {
  return (
    <div className="min-h-screen px-6 py-16 flex justify-center bg-slate-400">

      <div className="
        max-w-4xl
        bg-white
        shadow-xl
        rounded-2xl
        p-8
        md:p-12
      ">

        {/* Heading */}
        <h1 className="
          text-3xl
          md:text-4xl
          font-bold
          text-center
          text-gray-800
          mb-8
        ">
          MIT License
        </h1>

        {/* License Text */}
        <div className="
          text-gray-700
          text-base
          md:text-lg
          leading-8
          space-y-6
        ">

          <p>
            Copyright (c) 2025 Pradeep Kori
          </p>

          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation
            files (the "Software"), to deal in the Software without
            restriction, including without limitation the rights to use,
            copy, modify, merge, publish, distribute, sublicense, and/or
            sell copies of the Software, and to permit persons to whom
            the Software is furnished to do so, subject to the following
            conditions:
          </p>

          <p>
            The above copyright notice and this permission notice shall
            be included in all copies or substantial portions of the
            Software.
          </p>

          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
            KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
            OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
            OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
            SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>

        </div>

      </div>

    </div>
  )
}

export default License