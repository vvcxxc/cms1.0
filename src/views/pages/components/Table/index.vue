 <template>
    <div class="table-container">
        <el-table
            v-bind="combineAttrs($attrs, $props)"
            v-on="$listeners"
            :data="data"
            border
            header-row-class-name="light-blue"
            row-class-name="high-light"
        >
            <template #default="slotData">
                <el-table-column
                    v-if="$props.selection"
                    type="selection"
                    width="80"
                />
                <slot name="default" v-bind="slotData" />
            </template>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import _ from 'lodash';
export default defineComponent({
    name: 'Table',
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        selection: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {
        const combineAttrs = (props, attrs, omitPropNames) => {
            const newObject = { ...attrs, ...props };
            return _.omit(newObject, omitPropNames);
        };
        return { combineAttrs };
    },
});
</script>
<style lang="scss" scoped>
.el-table {
    height: 100%;
    overflow-x: auto;
    tr.light-blue {
        th {
            background-color: #5a6c98;
            color: #fff;
        }
    }
    tr.blue {
        th {
            background-color: #5a6c98;
            color: #fff;
        }
    }
    tr.high-light:nth-child(even) {
        background-color: #eaedee;
    }
    .el-checkbox__inner {
        width: 1.5vw;
        height: 1.5vw;
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
        top: 10px;
    }
    .el-checkbox__inner::after {
        height: 1vw;
        width: 0.5vw;
        left: 0.3vw;
        border: 3px solid #98d87d;
        border-left: 0;
        border-top: 0;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #fff;
    }
}
</style>
