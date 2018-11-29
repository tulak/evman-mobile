import gql from "graphql-tag";

export const PROFILE_QUERY = gql`query me {
  me {
    id
    name
    email
    avatarUrl
    jobTitle
    organization
    phone
    github
    twitter
    teams {
      id
      name
      description
      usersCount
    }
  }
}`