import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Picker, Container, Left, Button, Body, Title, Subtitle, Right, Header, Icon, Item, Label, Input, Content, Form, DatePicker, Tabs, Tab } from 'native-base';
import { Formik } from 'formik'
import { FlexView, CenteredNotice } from '~/components/layout';
import Field from './edit/Field';
import { graphql, compose } from "react-apollo";
import { FORM_PARAMS_QUERY, UPDATE_EVENT_MUTATION } from '~/queries/events';
import DateField from './edit/DateField';
import SelectField from './edit/SelectField'
import GlobalError from './edit/GlobalError'
import to from 'await-to-js';
import {camelCase} from 'lodash'


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  submitForm = async (values, actions) => {
    const { event, updateEventMutation, closeModal } = this.props
    const [err, res] = await to(updateEventMutation({
      variables: {
        eventId: event.id,
        attributes: {
          name: values.name,
          description: values.description,
          eventTypeId: values.eventTypeId,
          location: values.location,
          beginsAt: values.beginsAt,
          endsAt: values.endsAt,
          url: values.url,
          url2: values.url2,
          url3: values.url3,
          sponsorship: values.sponsorship,
          sponsorshipDate: values.sponsorshipDate,
          cfpUrl: values.cfpUrl,
          cfpDate: values.cfpDate
        }
      }
    }))

    if (err) {
      console.log('Error: ', err)
      actions.setSubmitting(false)
    } else {
      const {data: {updateEvent: {errors, globalErrors}}} = res
      actions.setSubmitting(false)
      if (errors.length) {
        let errHash = {}
        errors.map((e) => errHash[camelCase(e.name)] = e.messages.join(', '))
        actions.setErrors(errHash)
      }

      if (globalErrors.length) {
        actions.setStatus({globalErrors})
      }
      
      if (!globalErrors.length && !errors.length) {
        closeModal()
      }
    }
  }

  render() {
    const {event, closeModal} = this.props
    const {team, loading} = this.props.data

    const formValues = {
      name: event.name,
      description: event.description,
      eventTypeId: event.eventType.id,
      location: event.location,
      beginsAt: event.beginsAt,
      endsAt: event.endsAt,
      url: event.url,
      url2: event.url2,
      url3: event.url3,
      sponsorship: event.sponsorship,
      sponsorshipDate: event.sponsorshipDate,
      cfpUrl: event.cfpUrl,
      cfpDate: event.cfpDate
    }

    if (!team) {
      if(loading) return <CenteredNotice header loading />
      else return <CenteredNotice header text="Failed to load form"/>
    }

    return (
    <Container>
        <Header>
          <Left>
            <Button icon transparent onPress={closeModal}>
              <Icon name="close" active/>
            </Button>
          </Left>
          <Body>
            <Title>{event.name}</Title>
            <Subtitle>Edit</Subtitle>
          </Body>
          <Right></Right>
        </Header>

        <Content>
          <Formik initialValues={formValues} onSubmit={this.submitForm}>
            {({values, errors, status = {}, handleSubmit, setFieldValue, isSubmitting}) => {
              console.log('Errors: ', errors)
              const {globalErrors} = status
              const errorMessages = globalErrors && (globalErrors.map((e) => <GlobalError key={e}>{e}</GlobalError>))
              return (
                <React.Fragment>
                  <Tabs>
                    <Tab heading="Basic">
                      <Form>
                        {errorMessages}
                        <Field label="Name" name="name" errors={errors} values={values} setFieldValue={setFieldValue} />
                        <Field textarea label="Description" name="description" errors={errors} values={values} setFieldValue={setFieldValue} />
                        <SelectField label="Event Type" options={team.eventTypes} optionLabelField='name' name="eventTypeId" errors={errors} values={values} setFieldValue={setFieldValue}  />
                        {/* city */}
                        
                        <Field textarea label="Location" name="location" errors={errors} values={values} setFieldValue={setFieldValue} />

                        <FlexView row>
                          <DateField label="Begins At" name="beginsAt" errors={errors} values={values} setFieldValue={setFieldValue} />
                          <DateField label="Ends At" name="endsAt" errors={errors} values={values} setFieldValue={setFieldValue} />
                        </FlexView>
                        {/* owner */}
                      </Form>
                    </Tab>

                    <Tab heading="Advanced">
                      <Form>
                        {errorMessages}
                        <Field label="Url 1" name="url" errors={errors} values={values} setFieldValue={setFieldValue} />
                        <Field label="Url 2" name="url2" errors={errors} values={values} setFieldValue={setFieldValue} />
                        <Field label="Url 3" name="url3" errors={errors} values={values} setFieldValue={setFieldValue} />

                        <Field label="Sponsorship" name="sponsorship" errors={errors} values={values} setFieldValue={setFieldValue} />
                        <DateField label="Sponsorship Deadline" name="sponsorshipDate" errors={errors} values={values} setFieldValue={setFieldValue} />
                        
                        <Field label="CFP Url" name="cfpUrl" errors={errors} values={values} setFieldValue={setFieldValue} />
                        <DateField label="CFP Deadline" name="cfpDate" errors={errors} values={values} setFieldValue={setFieldValue} />
                      </Form>
                    </Tab>
                  </Tabs>
                
                  <FlexView style={{padding: 15}}>
                    <Button block success 
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      loading={true}>
                      {isSubmitting ?  (<ActivityIndicator
                        animating={true}
                        size='small'
                        color='black'
                      />) : <Text>Save</Text>}
                    </Button>
                  </FlexView>
                </React.Fragment>
              )
            }}
          </Formik>
        </Content>
      </Container>
    );
  }
}

export default compose(
  graphql(FORM_PARAMS_QUERY),
  graphql(UPDATE_EVENT_MUTATION, { name: 'updateEventMutation'})
)(Edit)