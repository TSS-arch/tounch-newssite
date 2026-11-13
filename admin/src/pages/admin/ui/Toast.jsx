import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-2xl ${
            toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {toast.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
