# !!! SUPER IMPORTANT

- Be EXTREMELY careful not to make unrelated changes to styles or logic in the codebase while fixing lint errors, or refactoring.

- Do not wreck the layout and styling of the codebase while fixing actual issues, be ABSOLUTELY certain of this.

- I do not want to get to the end of fixing this considerable amount of lint errors and project structure refactor and have the app be broken, regressions, content missing, styling that were once working now broken.  AVOID THIS AT ALL COSTS.  The current configuration may have lint errors, but it's 95% current from a UI perspective. Making any kind of changes would only serve to create more work redoing the code you may have removed or tweaked to a state that actually requires us to remake it, fix it, etc...

## Refactoring Tasks

### Breaking up large files into sub-components 
(using a components folder inside the component's folder)

1. Scan the codebase and make a list with checkboxes of any component files longer than 500 lines.

2. Follow our code standards to refactor these components.

3. Do not attempt to refactor an entire big component all in one shot. Use this initial architecture phase to create a list of all the files that need to be refactored because they are above 500 lines long.

4. Do a second pass for architecture, add sub tasks that outline the sections that need to be refactored by component name and location. Mark the region to be extracted in the component using comments for yourself. 

5. Once the initial analysis and architecture phases have completed, then beging to refactor components, one region at a time, referring back to this task list in between and updating your progress.

WARNING! For some really large components trying to do too many steps at once will result in you missing details, code, and doing a less than perfect job refactoring to follow our coding standards. This is unacceptable. Take your time and shoot for 100% perfection by working on smaller sections piece by piece.

## Rearranging files into a more logical structure and better locations

1. Do an architecture pass where we will ascertain files that are out of place and a file tree for a new structure in which the logical placement of files feels totally clean and makes perfect sense.

2. Before beginning any work make a plan and document that plan here in this file. Add all major tasks with checkboxes as well as related sub-tasks

3. Begin moving the files to this new logical structure matching the filetree we've created

4. Moving files will require updating the paths of the relative imports in each component and any components consuming it.  

    a. Determine if you can use Typescript's built in feature set for updating imports around the codebase when a file is moved.  If so, this is the most reliable least amount of work method. Make sure typescript is automatically updating consumer import paths around the entire codebase.

    b. **If** this is not possible, be very thorough in updating this task list before starting any work. Identify the current location of a file, the new location of the file, and a list of any files that consume that file and create subtasks allowing us to track the process of updating imports.

5. As you move files make sure you also update `@.brain/directory-structure.md` with every file and folder move, deletion, edit, or change. Keep this document up to date.

Warning! Sometimes you can lose context after moving a file and assume that consumers reporting errors are wrong to do so because the file itself doesn't exist at the location they are seeking it anymore, and as a result remove use of that file from the consuming file. THIS IS WRONG. Do not do this.

