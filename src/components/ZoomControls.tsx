interface ZoomControlsProps {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
}

export const ZoomControls = ({ setZoom, zoom }: ZoomControlsProps) => {
  const handleZoomChange = (delta: number) => {
    setZoom((prev) => Math.max(2, Math.min(12, prev + delta)));
  };

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-700 m-6">
      <span className="text-xs">Zoom</span>
      <button
        onClick={() => handleZoomChange(-1)}
        className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition text-base font-bold"
      >
        −
      </button>
      <span className="w-8 text-center font-semibold">{zoom}</span>
      <button
        onClick={() => handleZoomChange(1)}
        className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition text-base font-bold"
      >
        +
      </button>
    </div>
  );
};
