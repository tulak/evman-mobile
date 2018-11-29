import gql from "graphql-tag";

export const SHOW_QUERY = gql`query showEvent($eventId: Int) {
  events(id: $eventId) {
    id
    name
    beginsAt
    endsAt
    fullLocation
    approved
    committed
    archived
    cfpUrl
    cfpDate
    description
    eventType {
      id
      name
    }
    attendees {
      id
      user {
        id
        name
        avatarUrl
      }
      attendeeType {
        id
        name
      }
    }
    eventPropertyAssignments {
      label
      behaviour
      values
    }
    eventTalks{
      id
      description
      state
      talk {
        id
        name
        abstract
        eventType{
          id
          name
        }
      }
      user {
        id
        name
        avatarUrl
      }
    }
    eventNotes {
      id
      content
      createdAt
      user{
        id
        name
        avatarUrl
      }
    }
  }
}`

export const queries = {
  SHOW_QUERY,
}