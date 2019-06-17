import * as React from 'react';
import {Icon} from "@blueprintjs/core";

interface Props {
    errMsg: string | undefined
}

export class ErrView extends React.Component<Props> {
    render() {
        return (
            <div className="err err-view">
                {
                    this.props.errMsg &&
                    <React.Fragment>
                        <Icon icon="delete" className="big-icon err"/>
                        <span className="err">{this.props.errMsg}</span>
                    </React.Fragment>
                }
            </div>
        )
    }

}