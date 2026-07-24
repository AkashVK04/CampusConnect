import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
  change,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 16px 40px rgba(15,23,42,0.12)",
      }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            {value}
          </h2>

          {change && (
            <div className="mt-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1">
              <span className="text-sm font-semibold text-green-700">
                {change}
              </span>
            </div>
          )}

        </div>

        <div
          className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-md`}
        >
          <Icon
            size={28}
            className="text-white"
          />
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;