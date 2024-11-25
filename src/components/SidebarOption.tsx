"use client";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { usePathname } from "next/navigation";

function SidebarOption({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (loading)
    return (
      <div className="w-full p-3 bg-white/5 backdrop-blur-sm rounded-lg animate-pulse">
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
      </div>
    );

  if (!data)
    return (
      <div className="w-full p-3 text-gray-300 bg-white/5 backdrop-blur-sm rounded-lg text-sm">
        Document not found
      </div>
    );

  if (error)
    return (
      <div className="w-full p-3 text-red-300 bg-red-500/10 backdrop-blur-sm rounded-lg text-sm">
        Error: {error.message}
      </div>
    );

  return (
    <Link
      href={href}
      className={`block w-full p-3 rounded-lg transition-all duration-200 group
        ${
          isActive
            ? "bg-white/20 text-white font-medium backdrop-blur-sm shadow-lg shadow-indigo-500/10"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
    >
      <p className="truncate text-sm flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isActive ? "bg-indigo-400" : "bg-gray-400 group-hover:bg-indigo-400"
          } transition-colors`}
        ></span>
        {data.title}
      </p>
    </Link>
  );
}

export default SidebarOption;
