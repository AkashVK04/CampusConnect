function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-slate-50"></div>

      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-200 blur-[150px] opacity-40 rounded-full -z-10"></div>

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-200 blur-[150px] opacity-40 rounded-full -z-10"></div>
    </>
  );
}

export default Background;