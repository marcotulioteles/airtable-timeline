import React, { useEffect, useRef, useState } from "react";
import assignLanes from "../helpers/assignLanes";
import {
  TimelineItem as TimelineItemModel,
  timelineRange,
} from "../constants/timelineItems";
import { format, differenceInDays, parseISO, addDays } from "date-fns";
import timelineItems from "../constants/timelineItems";
import { ZoomControls } from "./ZoomControls";
import { TimelineItem } from "./TimelineItem";
import { useTimelineHelpers } from "../helpers/timelineHelpers";

const Timeline = () => {
  const [items, setItems] = useState<TimelineItemModel[]>(timelineItems);
  const [zoom, setZoom] = useState(3);
  const [resizing, setResizing] = useState<{
    itemId: number;
    direction: "left" | "right";
    startX: number;
  } | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");

  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineStart = parseISO(timelineRange.start);
  const timelineEnd = parseISO(timelineRange.end);

  const minDate = timelineStart;
  const maxDate = timelineEnd;
  const totalDays = differenceInDays(maxDate, minDate) + 1;

  const { getItemOffset, getItemSpan } = useTimelineHelpers(minDate);

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: TimelineItemModel
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedItem = JSON.parse(
      e.dataTransfer.getData("text/plain")
    ) as TimelineItemModel;

    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const dayWidthPx = zoom * 16;

    const colIndex = Math.round(offsetX / dayWidthPx);
    const newStart = addDays(minDate, colIndex);
    const span = getItemSpan(draggedItem.start, draggedItem.end);
    const newEnd = addDays(newStart, span - 1);

    setItems((prev) =>
      prev.map((i) =>
        i.id === draggedItem.id
          ? {
              ...i,
              start: format(newStart, "yyyy-MM-dd"),
              end: format(newEnd, "yyyy-MM-dd"),
            }
          : i
      )
    );
  };

  useEffect(() => {
    if (!resizing) return;

    const handleMouseUp = (e: MouseEvent) => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const dayWidthPx = zoom * 16;
      const releaseCol = Math.round(offsetX / dayWidthPx);

      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== resizing.itemId) return item;

          const startCol = getItemOffset(item.start);
          const endCol = startCol + getItemSpan(item.start, item.end) - 1;

          if (resizing.direction === "left") {
            const newStartCol = Math.min(releaseCol, endCol);
            const newStartDate = addDays(minDate, newStartCol);
            return {
              ...item,
              start: format(newStartDate, "yyyy-MM-dd"),
            };
          } else {
            const newEndCol = Math.max(releaseCol, startCol);
            const newEndDate = addDays(minDate, newEndCol);
            return {
              ...item,
              end: format(newEndDate, "yyyy-MM-dd"),
            };
          }
        })
      );

      setResizing(null);
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, zoom, getItemOffset, getItemSpan, minDate]);

  const columnWidth = `${zoom}rem`;
  const lanes = assignLanes(items);

  return (
    <div className="space-y-6">
      <ZoomControls setZoom={setZoom} zoom={zoom} />

      <div
        ref={timelineRef}
        className="grid border rounded-lg overflow-x-auto bg-white shadow-md p-2"
        style={{
          gridTemplateColumns: `repeat(${totalDays}, ${columnWidth})`,
          gridAutoRows: "4rem",
          rowGap: "1rem",
        }}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {[...Array(totalDays)].map((_, i) => {
          const date = addDays(minDate, i);
          return (
            <div
              key={`header-${i}`}
              className="text-center text-xs font-semibold text-gray-500 border-r py-2 bg-gray-50"
              style={{ gridColumn: i + 1, gridRow: 1 }}
            >
              {format(date, "MMM d")}
            </div>
          );
        })}

        {lanes.map((lane, laneIndex) =>
          lane.map((item) => {
            const colStart = getItemOffset(item.start) + 1;
            const colEnd = colStart + getItemSpan(item.start, item.end);
            const row = laneIndex + 2;

            return (
              <TimelineItem
                item={item}
                setEditingItemId={setEditingItemId}
                setEditedName={setEditedName}
                colStart={colStart}
                colEnd={colEnd}
                editingItemId={editingItemId}
                editedName={editedName}
                onDragStart={onDragStart}
                setItems={setItems}
                row={row}
                key={item.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Timeline;
