export default function SmallFooter() {
  return (
    <footer className="bg-neutral text-neutral-content py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
              />
            </svg>
            India
          </span>

          <span className="opacity-70">© 2025 AuraMarket, Inc. All Rights Reserved</span>
        </div>

        {/* RIGHT LINKS */}
        <div className="flex gap-8 text-sm">
          <a className="hover:opacity-70 transition select-none">Guides</a>
          <a className="hover:opacity-70 transition select-none">Terms of Sale</a>
          <a className="hover:opacity-70 transition select-none">Terms of Use</a>
          <a className="hover:opacity-70 transition select-none">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}