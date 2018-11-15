import gql from "graphql-tag";

export const SHOW_QUERY = gql`query showEvent($eventId: Int) {
  event:events(id: $eventId) {
    id
    name
    beginsAt
    fullLocation
    approved
    committed
    archived
    eventType {
      name
    }
  }
}`

export const queries = {
  SHOW_QUERY,
}