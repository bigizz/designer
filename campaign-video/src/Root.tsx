import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const RemotionRoot = () => (
  <Composition
    id="CampaignAd"
    component={MainVideo}
    durationInFrames={150}
    fps={30}
    width={1080}
    height={1920}
  />
);
