import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Atlas, AtlasProps, AtlasTile } from './Atlas';
import { Layer } from 'react-tile-map/lib';
import { Popup } from './Popup';
import { getCoords } from '../../helpers/getCoords';

export type Tile = AtlasTile & { owner?: string; name?: string };

export type MapProps = Partial<AtlasProps> & {
  selection: string[];
  setSelection: (v: string[]) => void;
  tiles: Record<string, AtlasTile>;
};

export const Map: React.FC<MapProps> = (props) => {
  const { tiles, selection, setSelection } = props;

  const [showPopup, setShowPopup] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<Tile | null>(null);
  const [mouseX, setMouseX] = useState(-1);
  const [mouseY, setMouseY] = useState(-1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const timeout = useRef<NodeJS.Timer | null>(null);
  const size = useMemo(() => {
    const size = +Math.sqrt(Object.keys(tiles).length).toFixed(0);
    console.log(size);
    return size;
  }, [tiles]);

  const isSelected = useCallback(
    (x: number, y: number) => {
      if (selection.find((s) => s === getCoords(x, y))) return true;

      if (!tiles) return false;

      const id = selection.values().next().value as string;
      const center = tiles[id] as Tile;
      const tile = tiles[getCoords(x, y)] as Tile;

      return center && tile && center.estate_id === tile.estate_id;
    },
    [selection, tiles],
  );

  const selectedStrokeLayer: Layer = useCallback(
    (x, y) => {
      return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null;
    },
    [isSelected],
  );

  const selectedFillLayer: Layer = useCallback(
    (x, y) => {
      return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null;
    },
    [isSelected],
  );

  const handleClick = useCallback(
    (x: number, y: number) => {
      const tile = tiles[getCoords(x, y)] as Tile;
      if (!tile) {
        return;
      }
      if (isSelected(x, y)) {
        setSelection(selection.filter((s) => s !== getCoords(x, y)));
      } else {
        setSelection([...selection, getCoords(x, y)]);
      }
    },
    [tiles, selection],
  );

  const handleHover = useCallback(
    (x: number, y: number) => {
      if (selection.find((s) => s === getCoords(x, y))) {
        setShowPopup(false);
        return;
      }

      // console.log(x, y);

      const id = getCoords(x, y);
      const tile = tiles[id];

      if (tile && !showPopup) {
        setShowPopup(true);
        setHoveredTile(tile);
        setMouseX(-1);
        setMouseY(-1);
      } else if (tile && tile !== hoveredTile) {
        setHoveredTile(tile);
        setMouseX(-1);
        setMouseY(-1);
      } else if (!tile && showPopup) {
        setShowPopup(false);
      }
    },
    [selection, tiles, showPopup, hoveredTile],
  );

  const handleHidePopup = useCallback(() => {
    setShowPopup(false);
    setMouseX(-1);
    setMouseY(-1);
  }, []);

  // fade effect
  useEffect(() => {
    if (!showPopup) {
      timeout.current = setTimeout(() => setHoveredTile(null), 250);
    } else if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, [showPopup]);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (showPopup && mouseX === -1 && mouseY === -1) {
        setMouseX(event.offsetX);
        setMouseY(event.offsetY);
        setX(event.offsetX);
        setY(event.offsetY);
      }
    }
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showPopup, mouseX, mouseY]);

  const layers = [
    ...(props.layers || []),
    selectedStrokeLayer,
    selectedFillLayer,
  ];

  return (
    <div
      className="atlas-wrapper"
      onMouseLeave={handleHidePopup}
      style={{ width: `${props.width}px`, height: `${props.height}px` }}
    >
      <Atlas
        {...props}
        tiles={tiles}
        onHover={handleHover}
        onClick={handleClick}
        layers={layers}
        x={size / 2}
        y={size / 2}
        minX={0}
        maxX={size}
        minY={0}
        maxY={size}
        zoom={2}
      />
      {hoveredTile ? (
        <Popup
          x={x}
          y={y}
          visible={showPopup}
          tile={hoveredTile}
          position={x > window.innerWidth - 280 ? 'left' : 'right'}
        />
      ) : null}
    </div>
  );
};
