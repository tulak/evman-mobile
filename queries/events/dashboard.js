import gql from "graphql-tag";

export const COMMITTED_EVENTS_QUERY = gql`query {
  committed_events:events(
    scopes:["actual","committed"],
    onlyCurrentTeam: true
  ) {
    id
    name
    fullLocation
    beginsAt
  }
}`

export const TRACKED_EVENTS_QUERY = gql`query {
  tracked_events:events(
    scopes:["tracked"],
    onlyCurrentTeam: true
  ) {
    id
    name
    fullLocation
    beginsAt
  }
}`

export const CFP_DEADLINE_EVENTS_QUERY = gql`query {
  cfp_deadline_events:events(
    scopes:["within_cfp_deadline"],
    onlyCurrentTeam: true
  ) {
    id
    name
    fullLocation
    beginsAt
  }
}`

export const queries = {
  COMMITTED_EVENTS_QUERY,
  TRACKED_EVENTS_QUERY,
  CFP_DEADLINE_EVENTS_QUERY
}