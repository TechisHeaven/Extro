import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-secondary text-primary">
      <h1 className="text-9xl font-extrabold  tracking-widest">404</h1>
      <div className="bg-mainColor px-2 text-sm rounded rotate-12 absolute text-white">
        Page Not Found
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-mainColor group active:text-mainColor focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-mainColor group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative  ">
            <Link
              href="/"
              className="block px-8 py-3 bg-white border border-current"
            >
              Go Home
            </Link>
          </span>
        </div>
      </button>
    </main>
  );
}
