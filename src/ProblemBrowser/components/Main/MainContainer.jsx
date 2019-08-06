import {connect} from 'react-redux';

import Main from './Main.jsx';
import {selectBlock, setCourseBlocks} from "../../data/actions/courseBlocks";

const mapStateToProps = state => ({
    selectedBlock: state.selectedBlock,
    rawBlocks: state.rawBlocks,
});


const mapDispatchToProps = dispatch => ({
    onSelectBlock: blockId => dispatch(selectBlock(blockId)),
    onDataChange: data => dispatch(setCourseBlocks(JSON.parse(data))),
});

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);

export default MainContainer;
