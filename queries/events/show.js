import gql from "graphql-tag";

export const SHOW_QUERY = gql`query showEvent($eventId: Int) {
  event: events(id: $eventId) {
    id
    name
    beginsAt
    endsAt
    fullLocation
    approved
    committed
    archived
    eventType {
      id
      name
    }
    attendees {
      id
      user {
        name
        avatarUrl
      }
      attendeeType {
        name
      }
    }
  }
}`

export const queries = {
  SHOW_QUERY,
}