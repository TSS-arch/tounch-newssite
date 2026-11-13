import { motion } from "framer-motion";

const CARDS = [
  ["Total", "all", "from-indigo-500 to-blue-500"],
  ["Images", "image", "from-emerald-500 to-teal-500"],
  ["Videos", "video", "from-sky-500 to-cyan-500"],
  ["YouTube", "youtube", "from-red-500 to-orange-500"],
];

export default function StatCards({ counts }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CARDS.map(([label, key, grad], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-white/10"
        >
          <div
            className={`mb-2 inline-block rounded-md bg-gradient-to-r ${grad} px-2 py-0.5 text-[11px] font-semibold text-white`}
          >
            {label}
          </div>
          <div className="text-3xl font-bold">{counts[key]}</div>
        </motion.div>
      ))}
    </div>
  );
}
