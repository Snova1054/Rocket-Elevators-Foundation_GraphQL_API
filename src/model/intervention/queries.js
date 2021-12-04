const { GraphQLList,
        GraphQLID,
        GraphQLString } = require('graphql')
const type = require('./type')
const mutation = require('./mutations')
const Intervention = require("./intervention")

// Defines the queries
module.exports = {
    interventions: {
        type: new GraphQLList(type),
        args: {
            id: {
                type: GraphQLID
            },
            author: {
                type: GraphQLString
            },
            start_date: {
                type: GraphQLString
            },
            end_date: {
                type: GraphQLString
            },
            result: {
                type: GraphQLString
            },
            report: {
                type: GraphQLString
            },
            status: {
                type: GraphQLString
            },
            customer_id: {
                type: GraphQLID
            },
            building_id: {
                type: GraphQLID
            },
            battery_id: {
                type: GraphQLID
            },
            column_id: {
                type: GraphQLID
            },
            elevator_id: {
                type: GraphQLID
            },
            employee_id: {
                type: GraphQLID
            },
        },
        resolve: Intervention.findMatching.bind(Intervention)
    },
    intervention: {
        type,
        args: {
            id: {
                type: GraphQLID
            },
            author: {
                type: GraphQLString
            },
            start_date: {
                type: GraphQLString
            },
            end_date: {
                type: GraphQLString
            },
            result: {
                type: GraphQLString
            },
            report: {
                type: GraphQLString
            },
            status: {
                type: GraphQLString
            },
            customer_id: {
                type: GraphQLID
            },
            building_id: {
                type: GraphQLID
            },
            battery_id: {
                type: GraphQLID
            },
            column_id: {
                type: GraphQLID
            },
            elevator_id: {
                type: GraphQLID
            },
            employee_id: {
                type: GraphQLID
            },
        },
        resolve: Intervention.getByID.bind(Intervention)
    }
}