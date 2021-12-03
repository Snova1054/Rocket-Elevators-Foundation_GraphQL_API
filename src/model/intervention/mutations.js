const { 
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = require('graphql')
const type = require('./type')
const Intervention = require('./intervention')

// Defines the mutations
module.exports = {
    addIntervention: {
        type,
        args: {
            author:   { type: new GraphQLNonNull(GraphQLString) },
            start_date:  { type: GraphQLString },
            end_date:  { type: GraphQLString },
            result:  { type: new GraphQLNonNull(GraphQLString) },
            report:  { type: new GraphQLNonNull(GraphQLString) },
            status:  { type: new GraphQLNonNull(GraphQLString) },
            customer_id:  { type: new GraphQLNonNull(GraphQLID) },
            building_id:  { type: new GraphQLNonNull(GraphQLID) },
            battery_id:  { type: new GraphQLNonNull(GraphQLID) },
            column_id:  { type: GraphQLID },
            elevator_id:  { type: GraphQLID },
            employee_id:  { type: GraphQLID },
        },
        resolve: Intervention.createEntry.bind(Intervention)
    },
    updateIntervention: {
        type,
        args: {
            id:     { type: GraphQLID },
            start_date:  { type: GraphQLString },
            end_date:  { type: GraphQLString },
            status:  { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: Intervention.updateEntry.bind(Intervention)
    }
}
