import React from 'react';
import {Mosaic} from 'react-mosaic-component';
import Sheet from './Sheet';

export const Canvas = () => (
    <div className="canvas">
            <Mosaic
                renderTile={
                    e => e
                }
                initialValue={{
                    direction: 'column',
                    splitPercentage: 50,
                    first: <Sheet id="sheet-1"/>,
                    second: <Sheet id="sheet-2"/>
                }}
            />
    </div>
);