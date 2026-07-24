function Card({ children }) {
  return (
    <div className="
      bg-white
      rounded-3xl
      shadow-sm
      border
      border-slate-200
      p-6
      hover:shadow-xl
      transition
      duration-300
    ">
      {children}
    </div>
  );
}

export default Card;