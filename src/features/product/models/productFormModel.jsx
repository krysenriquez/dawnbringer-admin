export default {
  formId: 'productForm',
  formField: {
    productType: {
      key: 'productType',
      name: 'productType',
      label: 'Product Type',
      requiredErrorMsg: 'Product Type is required',
    },
    productName: {
      key: 'productName',
      name: 'productName',
      label: 'Product Name',
      requiredErrorMsg: 'Product Name is required',
    },
    productImage: {
      key: 'productImage',
      name: 'productImage',
      label: 'Thumbnail',
    },
    productStatus: {
      key: 'productStatus',
      name: 'productStatus',
      label: 'Status',
      requiredErrorMsg: 'Product Status is required',
    },
    productDescription: {
      key: 'productDescription',
      name: 'productDescription',
      label: 'Description',
      requiredErrorMsg: 'Product Description is required',
    },
    productTags: {
      key: 'productTags',
      name: 'productTags',
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
