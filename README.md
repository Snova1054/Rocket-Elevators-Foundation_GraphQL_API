# Welcome to Rocket-Elevators-Foundation_GraphQL_API
## First you'll have to either use Postman or you favorite API development environment
### For the newly added features, you can POST a list of all the Interventions according to a specific status that you'll input.
#### Simply add the desired Intervention's attribute after {intevention} without the curly brackets: ({theAttributeYouWant}: {theValueYouWant}) and don't forget to also input the values you want to see! And send it.

### Also, you can change the status a specific Intervention selected by the {id} and then by inputting the desired {status}.
#### You will simply have to add Intervention's you want to change without the curly brackets again after {updateIntervention(id: {IDyouWant}, {theAttributeYouWant: "TheValueYouWant"})} and again, don't forget to also input the values you want to see! And send it.
#### But there's more! If you change the {status} to either "InProgress" or "Completed" (case sensitive). You will change the following:
- if you input "InProgress", you will change the start_date of the Intervention to today's date.
- if you input "Completed", you will change the end_date of the Intervention to today's date.

### And lastly, if you ever want to verify any changes that you have made, you can simply POST the Intervention that you want to see by changing intervention(id: {theIDyouWant}) and done!

## That's it for the new things on the Website, Thank you!
