import React from 'react';
import { MosaicWindowContext, createDefaultToolbarButton } from 'react-mosaic-component';

class HideButton extends React.Component {
    static contextTypes = MosaicWindowContext;
    context = MosaicWindowContext;

    render() {
        return createDefaultToolbarButton('Hide', 'pt-icon-minimize', this.hide.bind(this));
    }

    hide() {
        this.context.mosaicActions.hide(this.context.getMosaicPath());
    }
}

HideButton.displayName = "HideButton";

export default HideButton;