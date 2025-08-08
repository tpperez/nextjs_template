import { graphqlClient } from '@/app/services/http/graphql'

import { GET_FOOTER_QUERY } from './get-footer.const'
import type { IGetFooterResponse } from './get-footer.type'

const getFooterData = async () => {
  try {
    const response = await graphqlClient.query<IGetFooterResponse>(
      GET_FOOTER_QUERY,
      {},
      {
        baseUrl: 'https://graphql.datocms.com/',
        revalidate: 300, // 5 min
        headers: {
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        },
      },
    )

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    console.error('Error fetching datocms:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export default getFooterData
