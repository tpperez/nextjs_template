import { graphqlClient } from '@/app/services/http/graphql'

import type { IDatocmsResponse } from './get-datocms.type'
import { GET_DATOCMS_QUERY } from './get-datocms-query.const'

const getDatocmsData = async () => {
  try {
    const response = await graphqlClient.query<IDatocmsResponse>(
      GET_DATOCMS_QUERY,
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

export default getDatocmsData
