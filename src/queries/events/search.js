import gql from "graphql-tag";

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