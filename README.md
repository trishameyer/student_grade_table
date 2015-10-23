# Version 0.5

#### Description
Version 0.5 starts where v.1 left off with adding in the delete functionality. When clicking on the delete button we need to add an event handler that will remove the current row
from the DOM only after we have successfully remove the object from the array.
### Scope
- JS Functionality
    - Add an anonymous funciton as the click handler to the dynamically created delete button for each student row - (Event Delegation)
    - Delete button click handler function should have a call to removeStudent function that removes the object in the student_array
        - Suggested method
            - Using index of the row of the current button to remove from array
            - Store the index when adding to the DOM into a data attribute
    - Once the object has been removed from the array the DOM element row that the delete button resides in should be removed.