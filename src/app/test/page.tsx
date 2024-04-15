"use client";
import React from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const Kakeibo = () => {
    const controls = useAnimation();
    const x = useMotionValue(0);

    const snapPoints = [0, 600, 1200]; // Snap points for each section

    return (
        <div className="h-full py-5">
            <div className="text-center">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={(_, info) => {
                        // controls.stop();
                        // const nearestSnap = snapPoints.reduce((prev, curr) => (Math.abs(curr + info.offset.x) < Math.abs(prev + info.offset.x) ? curr : prev));
                        // controls.start({ x: nearestSnap });
                    }}
                    animate={controls}
                    className="text-xl flex w-[300vw] h-[100vh]"
                    style={{ x }}
                >
                    <div className="w-[100vw]">page1</div>
                    <div className="w-[100vw]">page2</div>
                    <div className="w-[100vw]">page3</div>
                </motion.div>
            </div>
        </div>
    );
};

export default Kakeibo;
