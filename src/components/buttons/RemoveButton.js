import React from 'react';
import { MosaicWindowContext, createDefaultToolbarButton } from 'react-mosaic-component';

class RemoveButton extends React.Component {
    static contextTypes = MosaicWindowContext;
    static displayName = "RemoveButton";
    context = MosaicWindowContext;

    render() {
        return createDefaultToolbarButton('Remove', 'pt-icon-cross', this.remove);
    }

    remove = () => {
        this.context.mosaicActions.remove(this.context.getMosaicPath());
    }
}

export default RemoveButton;