import gql from "graphql-tag";

export const CALENDAR_QUERY = gql`query calendar($range: String) {
  events(filtererPayload:{
    constrains:{
      name:"begins_at",
      condition:"range",
      values:[$range]
    }
  }) {
    id
    name
    beginsAt
    endsAt
    fullLocation
  }
}`