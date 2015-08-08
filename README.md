# SGT - Student Grade Table

## Version 0.5
#### Description
Version 0.5 starts where v.1 left off with adding in the delete functionality. When clicking on the delete button we need to add an event handler that will remove the current row
from the DOM only after we have successfully remove the object from the array.
### Scope
- JS Functionality
    - Add click handler to the dynamically created delete button per row
    - Delete button click handler should call a removeStudent function that removes the object in the student_array
        - Suggested methods
            - Using index of the row of the current button to remove from array
            - Store the index when adding to the DOM into a data attribute
            - Most Advanced - Store DOM element that is dynamically created into the student object
                - have a delete method within the student object that would be called to remove the element from the DOM and soft delete from the array
    - Once the object has been removed from the array the DOM element row that the delete button resides in should be removed.

### Assignments - A.K.A criteria for success on this version of the project
1. On the repo of the Lead developers, create issues for line items listed under the scope heading above.
    1. Issues should be created without being assigned to a specific user
    1. <b>Start working on issues</b>
        1. User goes through open issue list and assigns themselves an issue
        1. Create new branch for current issue
            1. start from master branch `git checkout master`
            1. Create branch with this command `git checkout -b [relevent_issue_name]` <b>Replace [relevent_issue_name] with descriptive branch name</b>
        1. Start coding
        1. Test Code
        1. Add, Commit, Push
        1. Create Pull request in Github to [forked_repo]/master branch
            1. Assign to another developer working on the project
            1. Review Pull request
                1. Collaborate on PR - Comment on any issues or questions
            1. Assigned User merges PR into [forked_repo] - master
    1. If More issues
        1. Goto above - Start working on issues
    1. Else
        1. Create Pull request from [forked_repo] - master to LearningFuze/SGT - [team_name_branch]
        1. Name Pull request [Lead Developers Name] / [Other Team Memembers Names] - v.5
    1. Ready for Peer Review
     
