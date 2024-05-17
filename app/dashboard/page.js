export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen  bg-gray-100 flex flex-col justify-center py-12 content-center px-6 lg:px-8">
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Italian Trulli"
          className="mx-auto h-[100px] w-auto py-[8px] my-9"
        />
        <h1 className="text-black self-center font-semibold text-4xl font-sans">
          Create a New Post
        </h1>
        <div className="py-6 mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:px-8 rounded-lg self-center min-w-1 bg-white">
          <form>
            <label htmlFor="full_name">
              <b className="text-black font-semibold text-sm">Title</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Product Title"
              name="Name"
              required
              className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <label htmlFor="email">
              <b className="text-black font-semibold text-sm">Description</b>
            </label>
            <br />
            <textarea
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              placeholder="Product Description"
              className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
            ></textarea>
            <br />

            <label htmlFor="email">
              <b className="text-black font-semibold text-sm">Select Image</b>
            </label>
            <br />
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="my-2 text-black"
            />
            <br />

            <div className="clearfix">
              <button
                type="submit"
                className="mt-4 rounded-md my-2 px-2 w-96 h-12 text-white font-semibold bg-blue-700"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
