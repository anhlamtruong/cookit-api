import React from "react";
import { CSSProperties } from "react";
import { ClockLoader } from "react-spinners";

interface LoadingCarrotProps {
  text?: String;
}

const LoadingCarrot: React.FC<LoadingCarrotProps> = ({
  text,
}: LoadingCarrotProps) => {
  const loadingContainer: CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const dotAnimation = {
    animate: {
      opacity: [0, 1, 0],
      transition: { duration: 1, loop: Infinity, ease: "linear" },
    },
  };

  return (
    <div style={loadingContainer}>
      <ClockLoader color="orange" className="text-foreground ora"></ClockLoader>
      <p>{`${text ?? "Loading"} `}</p>
      {/* <Image
        sizes="20"
        priority
        src="/loading/loading-carrot.webp"
        alt="Loading"
        width={20}
        height={20}
        style={{ width: "100px" }}
      />
      <motion.div>
        {`${text ?? "Loading"} `}
        <motion.span {...dotAnimation}>.</motion.span>
        <motion.span {...dotAnimation} style={{ animationDelay: "0.2s" }}>
          .
        </motion.span>
        <motion.span {...dotAnimation} style={{ animationDelay: "0.4s" }}>
          .
        </motion.span>
      </motion.div> */}
    </div>
  );
};

export default LoadingCarrot;
