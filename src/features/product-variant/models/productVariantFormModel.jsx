export default {
  formId: 'productCreateForm',
  formField: {
    variantId: {
      key: 'variantId',
      name: 'variantId',
    },
    product: {
      key: 'product',
      name: 'product',
      label: 'Product',
      requiredErrorMsg: 'Product is required',
    },
    sku: {
      key: 'sku',
      name: 'sku',
      label: 'SKU',
      requiredErrorMsg: 'SKU is required',
    },
    variantName: {
      key: 'variantName',
      name: 'variantName',
      label: 'Product Variant Name',
      requiredErrorMsg: 'Product Variant Name is required',
    },
    variantImage: {
      key: 'variantImage',
      name: 'variantImage',
      label: 'Thumbnail',
    },
    variantStatus: {
      key: 'variantStatus',
      name: 'variantStatus',
      label: 'Product Variant Status',
      requiredErrorMsg: 'Product Variant Status is required',
    },
    variantDescription: {
      key: 'variantDescription',
      name: 'variantDescription',
      label: 'Product Variant Description',
      requiredErrorMsg: 'Product Variant Description is required',
    },
    variantTags: {
      key: 'variantTags',
      name: 'variantTags',
      label: 'Tags',
    },
    quantity: {
      key: 'quantity',
      name: 'quantity',
      label: 'Initial Quantity',
      requiredErrorMsg: 'Initial Quantity is required',
      invalidErrorMsg: 'Invalid Initial Quantity format',
    },
    price: {
      basePrice: {
        key: 'basePrice',
        name: 'price.basePrice',
        label: 'Price',
        requiredErrorMsg: 'Price is required',
        invalidErrorMsg: 'Invalid Price format',
      },
      discountedPrice: {
        key: 'discountedPrice',
        name: 'price.discountedPrice',
        label: 'Discounted Price',
        requiredErrorMsg: 'Discounted Price is required',
        invalidErrorMsg: 'Invalid Discounted Price format',
      },
    },
    media: {
      key: 'media',
      name: 'media',
      label: 'Media',
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
    pointValues: [
      {
        membershipLevel: {
          key: 'membershipLevel',
          name: 'membershipLevel',
          requiredErrorMsg: 'Membership Level is required',
        },
        pointValue: {
          key: 'pointValue',
          name: 'pointValue',
          label: 'Point Value',
          requiredErrorMsg: 'Point Value is required',
          invalidErrorMsg: 'Invalid Point Value format',
        },
      },
    ],
  },
}
