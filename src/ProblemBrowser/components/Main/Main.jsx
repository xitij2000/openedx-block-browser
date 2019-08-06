import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BlockBrowserContainer } from "../BlockBrowser/BlockBrowserContainer";

export default class Main extends React.Component {
    static propTypes = {
        selectedBlock: PropTypes.string.isRequired,
        onSelectBlock: PropTypes.func.isRequired,
        onDataChange: PropTypes.func.isRequired,
        rawBlocks: PropTypes.string.isRequired,
    };

    onChangeBlocks = () => {
        console.log(this.blockfield.value);
        this.props.onDataChange(this.blockfield.value)
    };

    render() {
        const { onSelectBlock, rawBlocks } = this.props;

        return (
            <div className="app">
                <div className="row">
                    <div className="help">
                        <p className="help">
                            This simple app lets you browse a course's block structure
                            data obtained from the course blocks API by accessing it
                            when logged in as a staff user with the following parameters:
                            <br />
                            <code>{"/api/courses/v1/blocks/?course_id={course_id}&depth=all&all_blocks=true&requested_fields=children"}</code>
                        </p>
                        <p className="help">
                            It should be safe to request additional details in the
                            response, but 'children' is the bare minimum. You can see
                            more options available for that API <a href="https://github.com/edx/edx-platform/blob/b77793da5fa19ef628851072cc31358fd7efbb20/lms/djangoapps/course_api/blocks/views.py#L42-L108">here</a>.
                        </p>
                        <p className="help">
                            You should copy the data from that response, paste it in the
                            text field marked "Raw block data", and click the 'Update' button.
                    </p>
                    </div>
                    <div className="input">
                        <label htmlFor="blocks">Raw block data</label>
                        <textarea name="blocks" id="blocks" cols="30" rows="10"
                            ref={(ref) => this.blockfield = ref}>
                            {JSON.stringify(rawBlocks)}
                        </textarea>
                        <button onClick={this.onChangeBlocks}>Update</button>
                    </div>
                </div>
                <BlockBrowserContainer onSelectBlock={onSelectBlock} />
            </div>
        );
    }
}
