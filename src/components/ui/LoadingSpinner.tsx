function LoadingSpinner() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 mt-10"
    >
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 animate-pulse" />

        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-purple-200 border-b-purple-600 rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse" }}
          />
        </div>
      </div>

      <span className="text-indigo-600 font-medium animate-pulse">
        Loading...
      </span>
    </div>
  );
}

export default LoadingSpinner;
