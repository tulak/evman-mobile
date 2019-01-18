import gql from "graphql-tag";

export const SHOW_QUERY = gql`query showEvent($eventId: Int) {
  events(id: $eventId) {
    id
    name
    beginsAt
    endsAt
    fullLocation
    location
    approved
    committed
    archived
    cfpUrl
    cfpDate
    description
    sponsorship
    sponsorshipDate
    url
    url2
    url3

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

export const SEARCH_EVENTS_QUERY = gql`query searchEvents($name: String) {
  events(
    filtererPayload:{
      constrains:[{
        name:"name"
        condition:"like"
        values:[$name]
      }]
      sort_rules:[{
        name:"begins_at",
        direction:"desc"
      }]
    }
    onlyCurrentTeam: true
  ) {
    id
    name
    fullLocation
    beginsAt
  }
}`

export const COMMITTED_EVENTS_QUERY = gql`query CommittedEvents {
  committed_events:events(
    scopes:["actual","unarchived", "committed"],
    onlyCurrentTeam: true
  ) {
    id
    name
    fullLocation
    beginsAt
  }
}`

export const TRACKED_EVENTS_QUERY = gql`query TrackedEvents {
  tracked_events:events(
    scopes:["actual","unarchived","tracked"],
    onlyCurrentTeam: true
  ) {
    id
    name
    fullLocation
    beginsAt
  }
}`

export const CFP_DEADLINE_EVENTS_QUERY = gql`query CfpDeadlineEvents {
  cfp_deadline_events:events(
    scopes:["actual","unarchived","within_cfp_deadline"],
    onlyCurrentTeam: true
  ) {
    id
    name
    fullLocation
    beginsAt
  }
}`

export const UPDATE_EVENT_MUTATION = gql`mutation updateEvent($eventId:ID!, $attributes: EventAttributes!) {
  updateEvent(eventId:$eventId,attributes:$attributes) {
    event {
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
      location
      sponsorship
      sponsorshipDate
      url
      url2
      url3
      eventType {
        id
        name
      }
    }
    errors {
      name
      messages
    }

    globalErrors
  }
}`

export const FORM_PARAMS_QUERY = gql`query {
  team {
    id
    name
    eventTypes {
      id
      name
    }
    eventProperties {
      id
      name
      position
      behaviour
      required
      
      options {
        id
        name
      }
    }
    
  }
}`