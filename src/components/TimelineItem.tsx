import { TimelineItem as TimelineItemModel } from "../constants/timelineItems";

interface TimelineItemProps {
  item: TimelineItemModel;
  editingItemId: number | null;
  setEditingItemId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditedName: React.Dispatch<React.SetStateAction<string>>;
  editedName: string;
  colStart: number;
  colEnd: number;
  row: number;
  setItems: React.Dispatch<React.SetStateAction<TimelineItemModel[]>>;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    item: TimelineItemModel
  ) => void;
}

const colorPalette = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b"];
const getColorByIndex = (index: number) =>
  colorPalette[index % colorPalette.length];

export const TimelineItem = ({
  item,
  setEditingItemId,
  setEditedName,
  colStart,
  colEnd,
  editingItemId,
  editedName,
  onDragStart,
  setItems,
  row,
}: TimelineItemProps) => {
  return (
    <div
      key={item.id}
      className="relative bg-blue-500 text-white text-xs px-2 rounded-xl cursor-move flex items-center"
      style={{
        gridColumn: `${colStart} / ${colEnd}`,
        gridRow: row,
        backgroundColor: getColorByIndex(item.id),
      }}
      draggable
      onDragStart={(e) => onDragStart(e, item)}
    >
      {editingItemId === item.id ? (
        <input
          className="w-fit mx-auto text-sm text-white bg-gray-900/25 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm"
          autoFocus
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={() => {
            setItems((prev) =>
              prev.map((i) =>
                i.id === item.id ? { ...i, name: editedName } : i
              )
            );
            setEditingItemId(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setItems((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, name: editedName } : i
                )
              );
              setEditingItemId(null);
            }
            if (e.key === "Escape") {
              setEditingItemId(null);
            }
          }}
        />
      ) : (
        <div
          className="flex-1 text-center cursor-text"
          onClick={() => {
            setEditingItemId(item.id);
            setEditedName(item.name);
          }}
        >
          <div className="grid">
            {item.name}
            <span className="text-[0.65rem] text-white/80 mt-0.5">
              {item.start} – {item.end}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
