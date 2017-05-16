import React, { Component } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import Sheet from './Sheet';

const CANVAS_CONFIG = {
    direction: 'column',
    splitPercentage: 50,
    first: "sheet1",
    second: "sheet2"
}

const renderSheet = id => (
    <MosaicWindow createNode={ () => 'new' }
                  title={ id }
                  toolbarControls={[]}>
        <Sheet id={ id } />
    </MosaicWindow>
);

export const Canvas = () => (
    <div className="canvas">
        <Mosaic renderTile={ renderSheet } initialValue={ CANVAS_CONFIG } />
    </div>
);