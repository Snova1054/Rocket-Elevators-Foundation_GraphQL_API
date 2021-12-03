const { GraphQLObjectType } = require('graphql')
const interventionMutation = require('../model/intervention/mutations')

module.exports = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addIntervention: interventionMutation.addIntervention,
        updateIntervention: interventionMutation.updateIntervention
    }
})