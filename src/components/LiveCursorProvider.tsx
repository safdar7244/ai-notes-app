"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myPresence, updatePresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(event.pageX), y: Math.floor(event.pageY) };
    updatePresence({ cursor });
  }

  function onPointerLeave() {
    updatePresence({ cursor: null });
  }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={onPointerLeave}>
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}

      {children}
    </div>
  );
}

export default LiveCursorProvider;
