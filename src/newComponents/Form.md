# config Form表单props配置

| 参数       | 作用   |类型    |  默认值 | 例子/可选值   |
| -----| -----:  |-----:  | :------:  | :----: |
| props.labelPosition  | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width | string  |   'right'    | right/left/top |
| props.labelWidth  | 表单域标签的宽度 | string  |   '100px'    |  |
| props.formData  | 表单数据对象 | object  |    {}  |  |
| props.formItem  | 表单渲染对象 | array  |    []  |  |
| props.rules  | 表单验证规则 | object  |    {}  |  |

# config Form表单props.formItem配置
| 参数       | 作用   |类型    |  默认值 | 例子/可选值   |
| -----| -----:  |-----:  | :------:  | :----: |
| type | 标签名类型 | string  |    |  input/select/date/dateTime...(后续添加需补充)   |
| label | 标签名称 | string  |    |     |
| prop  | 标签属性 | string  |    |     |
| span  | 24栏布局 | number  | 24 |     |
| disabled  | 标签禁用 | string  | true |     |
| options  | 下拉框的选项卡 | array  |  |     |
| slotName  | 插槽。type='input' | string  |   |  prepend/append   |
| defaultTime  | type="dataTime",选中日期后的默认具体时刻 | string  |   |    |

