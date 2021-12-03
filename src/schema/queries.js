const { GraphQLObjectType } = require('graphql')
const interventionQueries = require('../model/intervention/queries')

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        intervention: interventionQueries.intervention,
        interventions: interventionQueries.interventions
    }
})