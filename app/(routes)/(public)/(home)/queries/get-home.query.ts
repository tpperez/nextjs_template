import { graphqlClient } from '@/app/services/http'

import type { IHomeResponse } from './get-home.type'
import { GET_HOME_QUERY } from './get-home-query.const'

const getHomeData = async () => {
  try {
    const response = await graphqlClient.query<IHomeResponse>(
      GET_HOME_QUERY,
      {},
      {
        baseUrl: 'https://graphql.datocms.com/',
        revalidate: 300,
        headers: {
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        },
      },
    )

    return {
      success: true,
      data: response.data?.home,
    }
  } catch (error) {
    console.error('Error fetching home:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export default getHomeData
