import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames';

function selectedBlockData(rawblocks, selectedBlock) {
    if (rawblocks && rawblocks.blocks && selectedBlock) {
        console.log(`Block data for ${selectedBlock}`, rawblocks.blocks[selectedBlock]);
        return rawblocks.blocks[selectedBlock];
    } else return {}
}


const BlockList = ({ blocks, selectedBlock, onSelectBlock, onChangeRoot }) => (
    <ul className="block-list">
        {blocks.map(block => (
            <li key={block.id}
                className={classnames(`block-type-${block.type}`, { selected: block.id === selectedBlock })}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectBlock(block.id);
                }}>
                <button
                    className="block-name"
                    onClick={() => onSelectBlock(block.id)}>{block.display_name}</button>
                {block.children &&
                    <button className="block-child" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onChangeRoot(block.id);
                    }}>&gt;</button>
                }
            </li>
        ))}
    </ul>
);

const BlockDataItem = ({ dataItem }) => {
    switch (typeof dataItem) {
        case 'string':
            // TODO: if text starts with block-v1, add button to navigate to that block
            if (dataItem.startsWith('http')) {
                return (
                    <a href={dataItem} target="_blank" rel="noopener noreferrer">
                        {dataItem}
                    </a>
                );
            } else return dataItem;
        case 'object':
            if (Array.isArray(dataItem)) {
                return (
                    <ul>
                        {dataItem.map(item => (
                            <li>
                                <BlockDataItem dataItem={item} />
                            </li>
                        ))}
                    </ul>
                )
            } else {
                return <BlockDataView blockData={dataItem} />;
            }
        default:
            return String(dataItem);
    }

}


const BlockDataView = ({ blockData }) => (
    <div className='block-data'>
        <table>
            {Object.keys(blockData).map(key => (
                <tr className='block-data-item'>
                    <th>{key}</th>
                    <td><BlockDataItem dataItem={blockData[key]} /></td>
                </tr>
            ))}
        </table>
    </div>
)

export class BlockBrowser extends React.Component {
    static propTypes = {
        rawBlocks: PropTypes.object,
        blocks: PropTypes.object,
        selectedBlock: PropTypes.string,
        onSelectBlock: PropTypes.func.isRequired,
        onChangeRoot: PropTypes.func.isRequired,
    };

    render() {
        const { blocks, rawBlocks, selectedBlock, onSelectBlock, onChangeRoot, className } = this.props;
        if (blocks) {
            return (
                <div className={classnames("block-browser", className)}>
                    <div className="browser-container">
                        <div className="breadcrumb-container">
                            <button className="block-child" onClick={(e) => {
                                e.stopPropagation();
                                if (blocks.parent) onChangeRoot(blocks.parent);
                            }}> Up </button>
                            <span className="block-type"> {blocks.type}: </span>
                            <span className="block-name">{blocks.display_name} </span>
                        </div>
                        <BlockList blocks={blocks.children}
                            selectedBlock={selectedBlock}
                            onSelectBlock={onSelectBlock}
                            onChangeRoot={onChangeRoot} />
                    </div>
                    <BlockDataView blockData={selectedBlockData(rawBlocks, selectedBlock)} />
                </div>
            );
        } else return null;
    };

}
