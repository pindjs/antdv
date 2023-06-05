import type { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'ant-design-vue',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    '@shebao/antdv': 'Formily.Antdv',
    '@shebao/antdv-designable': 'Formily.AntdvDesignable',
    '@shebao/antdv-setters': 'Formily.AntdvSetters',
    '@shebao/antdv-settings-form': 'Formily.AntdvSettingsForm',
    '@shebao/antdv-prototypes': 'Formily.AntdvPrototypes',
  },
}
