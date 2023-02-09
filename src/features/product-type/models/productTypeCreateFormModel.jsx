export default {
  formId: 'productTypeCreateForm',
  formField: {
    productType: {
      key: 'productType',
      name: 'productType',
      label: 'Product Type',
      requiredErrorMsg: 'Product Type is required',
    },
    productTypeImage: {
      key: 'productTypeImage',
      name: 'productTypeImage',
      label: 'Thumbnail',
    },
    productTypeStatus: {
      key: 'productTypeStatus',
      name: 'productTypeStatus',
      label: 'Status',
      requiredErrorMsg: 'Product Type Status is required',
    },
    productTypeDescription: {
      key: 'productTypeDescription',
      name: 'productTypeDescription',
      label: 'Description',
      requiredErrorMsg: 'Product Type Description is required',
    },
    productTypeTags: {
      key: 'productTypeTags',
      name: 'productTypeTags',
      label: 'Tags',
    },
    meta: {
      metaTagTitle: {
        key: 'metaTagTitle',
        name: 'meta.metaTagTitle',
        label: 'Meta Tag Title',
        requiredErrorMsg: 'Meta Tag Title is required',
      },
      metaTagDescription: {
        key: 'metaTagDescription',
        name: 'meta.metaTagDescription',
        label: 'Meta Tag Description',
        requiredErrorMsg: 'Meta Tag Description is required',
      },
      pageSlug: {
        key: 'pageSlug',
        name: 'meta.pageSlug',
        label: 'Page Slug',
        requiredErrorMsg: 'Page Slug is required',
      },
    },
  },
}
