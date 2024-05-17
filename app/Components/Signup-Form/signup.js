export default function Signup(props) {
  return (
    <>
      <div class="min-h-screen  bg-gray-100 flex flex-col justify-center py-12 content-center px-6 lg:px-8">
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Italian Trulli"
          class="mx-auto h-[100px] w-auto py-[8px] my-9"
        />
        <h1 class="text-black self-center font-semibold text-4xl font-sans">
          {props?.user}, Create Your Account
        </h1>
        <div class="py-6 mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:px-8 rounded-lg self-center min-w-1 bg-white">
          <form>
            <label for="email">
              <b class="text-black font-semibold text-sm">Email Address</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              required
              class="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <br />
            <label for="psw">
              <b class="text-black font-semibold text-sm">Password</b>
            </label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              class="my-2 px-2 content-center w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <br />
            <label for="psw-repeat">
              <b class="text-black font-semibold text-sm">Repeat Password</b>
            </label>
            <br />
            <input
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              required
              class="my-2 px-2 content-center w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <br />
            <label class="py-6 mt-8">
              <input
                type="checkbox"
                name="remember"
                class="rounded-md h-4 px-3"
              />
              <div class="inline mx-2">
                <p class="text-black inline">
                  I agree to the
                  <a href="#" class="text-blue-700">
                    {" "}
                    Terms{" "}
                  </a>
                  and
                  <a href="#" class="text-blue-700">
                    {" "}
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </label>
            <br />
            <div class="clearfix">
              <button
                type="submit"
                class="mt-4 rounded-md my-2 px-2 w-96 h-12 text-white font-semibold bg-blue-700"
              >
                Sign Up
              </button>
              <button
                type="button"
                class="mt-4 rounded-md my-2 px-2 w-96 h-12 text-white font-semibold bg-red-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
