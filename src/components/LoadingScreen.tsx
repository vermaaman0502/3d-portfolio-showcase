import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

const LoadingScreen = ({ progress, isLoaded }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Pulsing brain icon */}
          <motion.div
            className="mb-6 text-primary"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Brain size={48} />
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold font-display gradient-text-ai mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Initializing Neural Network
          </motion.h1>

          <div className="w-64 h-1 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full loader-bar rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.p
            className="mt-4 text-muted-foreground font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}% — loading weights...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
