import gql from "graphql-tag";

export const LIST_QUERY = gql`query talks($userId: Int) {
  talks(
    onlyCurrentTeam: true,
    userId: $userId
  ) {
    id
    name
    archived
  }
}`

export const SHOW_QUERY = gql`query talks($id: Int) {
  talks(id: $id) {
    id
    name
    abstract
    createdAt
    eventType {
      id
      name
    }
  }
}`
