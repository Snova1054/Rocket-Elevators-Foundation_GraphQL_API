let {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

// Defines the type
module.exports = new GraphQLObjectType({
    name: 'Intervention',
    description: 'A intervention',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        author: {
            type: new GraphQLNonNull(GraphQLString)
        },
        start_date:  {
            type: GraphQLString
        },
        end_date:  {
            type: GraphQLString
        },
        result:  {
            type: new GraphQLNonNull(GraphQLString)
        },
        report:  { 
            type: new GraphQLNonNull(GraphQLString)
        },
        status:  { 
            type: new GraphQLNonNull(GraphQLString)
        },
        customer_id:  { 
            type: new GraphQLNonNull(GraphQLID)
        },
        building_id:  { 
            type: new GraphQLNonNull(GraphQLID)
        },
        battery_id:  { 
            type: new GraphQLNonNull(GraphQLID)
        },
        column_id:  { 
            type: GraphQLID
        },
        elevator_id:  { 
            type: GraphQLID
        },
        employee_id:  { 
            type: GraphQLID
        }
    }
})