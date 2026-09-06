const ShowLoading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 flex flex-col items-center justify-center">
      
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

      <p className="mt-5 text-black font-bold text-lg">
        {message}
      </p>

    </div>
  );
};

export default ShowLoading;