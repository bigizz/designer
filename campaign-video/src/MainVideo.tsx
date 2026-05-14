import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Outfit";
import React from "react";

const { fontFamily } = loadFont();

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  const textY = interpolate(frame, [0, 20], [100, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const textOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0055FF", justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill>
        <Img 
          src={staticFile("ice_brand_moodboard.png")} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            opacity: 0.6 
          }} 
        />
      </AbsoluteFill>
      
      <div
        style={{
          fontFamily,
          fontSize: 120,
          fontWeight: "bold",
          color: "#FF6B00",
          transform: `scale(${logoScale})`,
          textShadow: "0px 10px 20px rgba(0,0,0,0.5)",
          zIndex: 10,
          textAlign: "center"
        }}
      >
        ICE
      </div>
      
      <div
        style={{
          fontFamily,
          fontSize: 60,
          color: "white",
          marginTop: 40,
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
          zIndex: 10,
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0px 5px 10px rgba(0,0,0,0.5)",
        }}
      >
        Notre Saveur, Notre Vibe
      </div>
    </AbsoluteFill>
  );
};
