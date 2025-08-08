import { graphqlClient } from '@/app/services/http/graphql'

import { GET_HEADER_QUERY } from './get-header.const'
import type { IGetHeaderResponse } from './get-header.type'

const getHeaderData = async () => {
  try {
    const response = await graphqlClient.query<IGetHeaderResponse>(
      GET_HEADER_QUERY,
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

export default getHeaderData
