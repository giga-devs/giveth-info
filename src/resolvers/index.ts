import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://mainnet.serve.giveth.io/graphql',
    cache: new InMemoryCache({
        addTypename: false
      })
});

const customquery = async (query) => {
    try {
        const { data } = await client.query({
            query: query
            });
        return data;
    } catch (error) {
        throw error;
    }
};


const GET_DONATIONS_INFO = gql`
    query {
        donations {
          	createdAt
        }
    }`;

const GET_DONATIONS_VALUEUSD = gql`
    query {
        donations {
            valueUsd
        }
    }`;

const GET_DONORS_IDS = gql`
    query {
        donations {
          user {
            id
          }
        }
    }`;

const GET_TOTAL_PROJECTS = gql`
    query {
        projects {
            totalCount
        }
    }`;

const GET_TOP_DONORS = gql`
    query {
        donations {
            valueUsd
            user {
                walletAddress
            }
        }
    }`;

const GET_TOP_PROJECTS = gql`
    query {
        donations {
            valueUsd
            project {
                id
                title
            }
        }
    }`;

export const resolvers = {
    getDonations: () => customquery(GET_DONATIONS_INFO),
    getValueUSD: () => customquery(GET_DONATIONS_VALUEUSD),
    getDonorsIds: () => customquery(GET_DONORS_IDS),
    getProjectsCount: () => customquery(GET_TOTAL_PROJECTS),
    getTopDonors: () => customquery(GET_TOP_DONORS),
    getTopProjects: () => customquery(GET_TOP_PROJECTS)
};
