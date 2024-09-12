<template>
    <div class="nav-tree">
        <el-tree
            class="table-l"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            @node-click="handleNodeClick"
            node-key="Id"
            ref="treeRef"
            highlight-current
        >
            <template slot-scope="{ node, data }">
                <div class="l-item">
                    {{ data.Node }}
                    <div class="l-icon"></div>
                </div>
            </template>
        </el-tree>
    </div>
</template>
<script>
import {
    defineComponent,
    ref,
    nextTick,
    getCurrentInstance,
    watchEffect,
    onMounted,
    watch
} from '@vue/composition-api';
import {
    getProductTree,
    getParameterByWorkSection,
    getTreeAsync
} from '../api';
export default defineComponent({
    name: 'NavTree',
    props: {
        value: {
            type: String,
            default: ''
        },
        ProductModel: {
            type: [String, Number],
            default: ''
        }
    },
    emits: ['change'],
    setup(props, { emit }) {
        const treeRef = ref();
        const treeData = ref([]);

        const defaultProps = {
            children: 'Children',
            label: 'Node'
        };

        const handleNodeClick = (data, node, com) => {
            if (node.isLeaf) {
                emit('change', data);
                emit('input', data.Node);
            } else {
                treeRef.value.setCurrentKey(null);
                emit('input', '');
            }
        };

        const getFirstLeafNode = nodes => {
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (!node.Children || node.Children.length === 0) {
                    return node;
                } else if (node.Children.length > 0) {
                    const leaf = getFirstLeafNode(node.Children);
                    if (leaf) {
                        return leaf;
                    }
                }
            }
            return null;
        };

        onMounted(async () => {
            const res = await getTreeAsync();
            treeData.value = res.data.data;
            const leaf = getFirstLeafNode(treeData.value);
            nextTick(() => {
                treeRef.value.setCurrentKey(leaf.Id);
                emit('change', leaf);
                emit('input', leaf.Node);
            });
        });

        return {
            treeData,
            defaultProps,
            handleNodeClick,
            treeRef
        };
    }
});
</script>
<style lang="scss" scoped>
.nav-tree {
    padding-top: 10px;
    ::v-deep {
        .el-tree-node__expand-icon {
            color: #7e7e7f;
            font-size: 16px;
            &.is-leaf {
                display: none;
                & + .tree-node {
                    padding-left: 10px;
                    .tree-icon {
                        display: none;
                    }
                }
            }
        }
    }
}
.is-root {
    font-size: 15px;
    font-weight: bold;
    color: #333333;
    font-family: PingFang SC-Bold, PingFang SC;
}
.tree-node {
    display: flex;
    align-items: center;
}
.is-leaf {
    font-size: 14px;
    color: #333333;
    font-weight: 400;
    font-family: PingFang SC-Regular, PingFang SC;
}
.tree-icon {
    width: 11px;
    margin-right: 5px;
}
.table-l {
    padding: 0 24px;
    overflow-y: auto;
    ::v-deep .el-tree-node {
        &.is-current .el-tree-node__content {
            background: transparent;
        }
        &.is-current .l-item {
            background-color: rgb(128, 128, 128);
            color: rgb(255, 255, 255);
            border: none;
        }
        .el-tree-node__content {
            height: auto;
        }
    }
    .l-item {
        flex: 1;
        height: 40px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin-bottom: 16px;
        cursor: pointer;
        position: relative;
        background-color: rgb(255, 255, 255);
        color: rgb(128, 128, 128);
        border: 1px solid rgb(128, 128, 128);
    }
    .l-item:hover .l-icon {
        width: 12px;
        height: 12px;
        border-radius: 6px;
        background-color: #326cf3;
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translate(-100%, -50%);
    }
}
</style>
