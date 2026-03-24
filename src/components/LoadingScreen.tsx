import { motion, AnimatePresence } from "framer-motion";

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
          <motion.h1
            className="text-4xl md:text-5xl font-bold font-display gradient-text mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Loading Experience
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
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
