const ValidatorFormats = [
  { label: 'URL地址', value: 'url' },
  { label: '邮箱格式', value: 'email' },
  { label: 'IPV6格式', value: 'ipv6' },
  { label: 'IPV4格式', value: 'ipv4' },
  { label: '数字格式', value: 'number' },
  { label: '整数格式', value: 'integer' },
  { label: '身份证格式', value: 'idcard' },
  { label: 'QQ号格式', value: 'qq' },
  { label: '手机号格式', value: 'phone' },
  { label: '货币格式', value: 'money' },
  { label: '中文格式', value: 'zh' },
  { label: '日期格式', value: 'date' },
  { label: '邮编格式', value: 'zip' }
]

export default {
  'zh-CN': {
    settings: {
      'x-validator': {
        title: '校验规则',
        addValidatorRules: '添加校验规则',
        drawer: '配置规则',
        triggerType: {
          title: '触发类型',
          placeholder: '请选择',
          dataSource: [
            {
              label: '输入时',
              value: 'onInput'
            },
            {
              label: '聚焦时',
              value: 'onFocus'
            },
            {
              label: '失焦时',
              value: 'onBlur'
            }
          ]
        },
        format: {
          title: '格式校验',
          placeholder: '请选择',
          dataSource: ValidatorFormats
        },
        validator: {
          title: '自定义校验器',
          tooltip: '格式: function (value){ return "Error Message"}'
        },
        pattern: '正则表达式',
        len: '长度限制',
        max: '长度/数值小于',
        min: '长度/数值大于',
        exclusiveMaximum: '长度/数值小于等于',
        exclusiveMinimum: '长度/数值大于等于',
        whitespace: '不允许空白符',
        required: '是否必填',
        message: {
          title: '错误消息',
          tooltip:
            '错误消息只对当前规则集的一个内置规则生效，如果需要对不同内置规则定制错误消息，请拆分成多条规则'
        }
      }
    },
    SettingComponents: {
      DataSourceSetter: {
        nodeProperty: '节点属性',
        pleaseSelectNode: '请先选择左侧树节点',
        addKeyValuePair: '添加键值对',
        configureDataSource: '配置数据源',
        dataSource: '数据源',
        defaultTitle: '默认标题',
        dataSourceTree: '数据源节点树',
        addNode: '新增节点',
        label: '键名',
        value: '键值',
        item: '选项'
      },
      ReactionsSetter: {
        configureReactions: '配置响应器',
        relationsFields: '依赖字段',
        variableName: '变量名',
        variableNameValidateMessage: '不符合变量命名规则',
        pleaseInput: '请输入',
        sourceField: '来源字段',
        sourceProperty: '字段属性',
        variableType: '变量类型',
        operations: '操作',
        addRelationField: '添加依赖字段',
        propertyReactions: '属性响应(仅支持JS表达式)',
        actionReactions: '动作响应(高级，可选，支持JS语句)',
        visible: '显示/隐藏',
        hidden: 'UI隐藏',
        display: '展示状态',
        pattern: 'UI形态',
        title: '标题',
        description: '描述',
        value: '字段值',
        initialValue: '默认值',
        dataSource: '数据源',
        required: '是否必填',
        component: '组件',
        componentProps: '组件属性',
        decorator: '容器',
        decoratorProps: '容器属性',
        pleaseSelect: '请选择',
        expressionValueTypeIs: '表达式值类型为'
      },
      ValidatorSetter: {
        pleaseSelect: '请选择',
        formats: ValidatorFormats
      }
    }
  }
}
