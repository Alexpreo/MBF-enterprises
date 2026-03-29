import type { VideoHTMLAttributes } from "react";

type ForceMutedVideoProps = Pick<
  VideoHTMLAttributes<HTMLVideoElement>,
  "muted" | "onVolumeChange"
>;

/** Props to keep playback silent even if the native controls try to change volume. */
export const FORCE_MUTED_VIDEO_PROPS: ForceMutedVideoProps = {
  muted: true,
  onVolumeChange(e) {
    const v = e.currentTarget;
    if (v.muted && v.volume === 0) return;
    v.muted = true;
    v.volume = 0;
  },
};
