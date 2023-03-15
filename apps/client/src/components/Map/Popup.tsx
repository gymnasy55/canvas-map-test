import React from 'react';
import { Tile } from './index';
import './Popup.css';

export type PopupProps = {
  x: number;
  y: number;
  visible: boolean;
  tile: Tile;
  position: 'left' | 'right';
};

export const Popup: React.FC<PopupProps> = (props) => {
  const { x, y, visible, tile, position } = props;

  return (
    <div
      className={`AtlasPopup ${position} ${
        tile.owner ? 'has-owner' : 'no-owner'
      }`}
      style={{
        top: y,
        left: x,
        opacity: visible ? 1 : 0,
      }}
    >
      {tile.name}
    </div>
  );
};
