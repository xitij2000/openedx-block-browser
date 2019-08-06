import {courseBlocksActions} from './constants';

const setCourseBlocksSuccess = blocks => {
    return {
        type: courseBlocksActions.fetch.SUCCESS,
        blocks,
    };
};

const selectBlock = blockId => ({
    type: courseBlocksActions.SELECT_BLOCK,
    blockId,
});

const changeRoot = blockId => ({
    type: courseBlocksActions.CHANGE_ROOT,
    blockId,
});

const setCourseBlocks = data => (dispatch) => {
    dispatch(setCourseBlocksSuccess(data))
};

export {
    setCourseBlocks,
    setCourseBlocksSuccess,
    selectBlock,
    changeRoot,
};
