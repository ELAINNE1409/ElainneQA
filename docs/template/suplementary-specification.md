# Supplementary Specification (FURPS+)

## Functionality

_Specifies functionalities that:_

- _are common across several US/UC;_
- _are not related to US/UC, namely: Audit, Reporting and Security._


1.	Account Creation:
•	To access the system, you must create a valid account.
•	The user must provide the necessary information such as username, email address and password.
•	After filling in the required fields, the user can submit the account creation form.
•	The system validates the information provided and creates the account.
2.	Login:
•	After creating an account, the user can log in to the system.
•	The user enters their username and password.
•	The system verifies the supplied credentials and authenticates the user.
•	Once authenticated, the user has access to the functionalities of the system.
3.	Post Creation:
•	After logging in, the user can create posts.
•	The user composes the content of the post in a text field.
•	The system allows the user to insert links into the content if necessary.
•	When sending the post, the system stores the information and displays the new post on the page.
4.	Links
•	Users have the option to insert links in posts and comments, which when triggered direct users to the corresponding pages on the web.
5.	Comments:
•	Users can add comments to existing posts.
•	To comment, the user types their comment in a specific text field.
•	The system saves the comment and displays it along with the corresponding post.
•	The user can comment comments, that is, create a new comment by the existing one.
6.	Voting on Posts and Comments:
•	Users can vote on existing posts and comments.
•	Each post or comment has a positive (1) and negative (-1) vote option.
•	By clicking on the desired option, the system records the user's vote.
7.	Withdrawal of Votes:
•	Users have the option to withdraw their vote on a post or comment.
•	If a user has already voted for an item, they can click the voting option again to remove it.
•	The system updates the number of votes and records the withdrawal of the vote by the user.
8.	Restrictions on Deleting Posts and Comments:
•	Users are not allowed to delete posts or comments, as well as edit or hide them after publication.
•	Only the system administrator has this capability.

- _are not related to the US/UC, namely: Auditing, Reporting and Security: 
1.	Audit:
•	Tracking users' actions in the system, such as account creation, posts, comments, and votes.
•	Recording of information such as time, day, months and years of actions, identification of the responsible user and details of the actions performed.
•	These logs can be used for monitoring, troubleshooting, and investigating suspicious activity.
2.	Reporting:
•	Reporting the total number of users, most popular posts, recent comments and voting statistics.
3.	Interoperability:
•	Integration with other platforms???
4.	Compatibility:
•	The system is compatible with different web browsers and devices such as desktops, laptops, tablets and smartphones (with some adaptations)




## Usability 

_Evaluates the user interface. It has several subcategories,
among them: error prevention; interface aesthetics and design; help and
documentation; consistency and standards._


1.	Intuitive design:
•	The system presents the user with an intuitive and easy-to-understand interface.
•	Navigation elements, such as menus and icons, are organized logically and accessible to users.
•	The information structure is visually clear to make it easier to understand and locate the functionalities.
2.	User feedback:
•	Provides visual feedback to the user indicating successful actions, errors, or processing states.
•	Displays clear confirmation or error messages so that users understand the outcome of their interactions.
•	The loading of actions are fast preventing users from getting confused or impatient.
3.	Easy to fill out forms:
•	The process of filling out forms is optimized, easy and efficient. 
•	Validations are real-time to highlight errors and help users fix them immediately.
•	Rich text formatting: Users can apply formatting options (for example, bold, italic, url links, and code format) when creating posts.
4.	Visual consistency:
•	The system has a consistent visual identity so that users recognize it easily.
•	The colors, typography, and icons are simple to indicate actions.
5.	Responsividade:
•	The system does not adapt to different screen sizes and devices.
•	Content and interface elements automatically adjust on desktop devices.
6.	Help and documentation:
•	The system does not provide help resources such as documentation or tutorials to assist users in understanding the system and troubleshooting common problems.
•	The system offers relevant alert information at strategic points in the interface when users are making mistakes in their actions.
7.	Usability tests:
•	As a user I can easily perform specific tasks such as creating an account, logging in, creating a post or comment.
•	As a user I can easily find the navigation elements and complete the tasks intuitively.
•	The system provides visual feedback on actions.
•	Suggested improvement to the system: supporting documentation in the interface (such as a menu bar)


## Reliability
_Refers to the integrity, compliance and interoperability of the software. The requirements to be considered are: frequency and severity of failure, possibility of recovery, possibility of prediction, accuracy, average time between failures._


•	High availability: The forum is accessible and operational with minimal downtime. 
•	Performance: The application is able to handle the expected workload, ensuring a fast and efficient response to users.
•	Security: The forum has robust authentication and authorization mechanisms to protect information and prevent unauthorized access. 
•	Error handling: The forum handles errors and provides useful messages to users.
•	Simultaneous treatment of users: The forum can handle multiple users interacting simultaneously without problems.


## Performance
_Evaluates the performance requirements of the software, namely: response time, start-up time, recovery time, memory consumption, CPU usage, load capacity and application availability._


•	Fast page loading: The forum has optimized page load times and responsive user interactions.

## Supportability
_The supportability requirements gathers several characteristics, such as:
testability, adaptability, maintainability, compatibility,
configurability, installability, scalability and more._ 



•	Compatibility: The forum is compatible with popular browsers and operating systems.
•	Scalability: The forum can handle a large number of users and forum activity.
•	Installation: The forum uses different versions for Windows and mac's, necessary to install updated versions of node and python.



## +

### Design Constraints

_Specifies or constraints the system design process. Examples may include: programming languages, software process, mandatory standards/patterns, use of development tools, class library, etc._
  

•	Visually appealing design: The DDD Forum has a visually appealing and consistent user interface.
•	Efficient coding practices: The forum uses efficient coding practices and follows best practices in software development.
•	Adherence to standards: The forum adheres to web standards and best practices and a clean architecture combined with Domain-Driven Design.



### Implementation Constraints

_Specifies or constraints the code or construction of a system such
such as: mandatory standards/patterns, implementation languages,
database integrity, resource limits, operating system._


•	Visually appealing design: The DDD Forum has a visually appealing, simple and consistent user interface.
•	Efficient coding practices: The forum uses efficient coding practices and follows best practices in software development.
•	Adherence to standards: The forum adheres to web standards and best practices and a clean architecture combined with Domain-Driven Design. -Built based on: Clean Architecture, SOLID principles and best practices of Domain-Driven Design using TypeScript.



### Interface Constraints
_Specifies or constraints the features inherent to the interaction of the
system being developed with other external systems._


•	The forum is adapted to different devices, managing to meet the complexities of screen size, device orientation, input restrictions such as touch, keyboard or mouse.
•	The interface responds simultaneously to interactions.
•	Notifications, warnings and alerts should be implemented usingToast; APIs: The DDD Forum provides APIs for third-party developers to create extensions or plugins. Compatibility with other systems: The forum is designed to integrate with other forum software or content management systems.


### Physical Constraints

_Specifies a limitation or physical requirement regarding the hardware used to house the system, as for example: material, shape, size or weight._

•	Physical environment in which the forum runs can meet the requirements 
•	The design of the application takes into account the energy consumed, optimizing this feature ensuring a proper user experience.
•	Connectivity restrictions: In some situations, the application may experience connectivity constraints, such as unstable network connections, low bandwidth, or connection unavailability. The interface design and functionality should take these limitations into account, but the forum does not provide offline features or unstable connectivity conditions.
•	Hardware restrictions: The forum design takes into account the different hardware capacities such as CPU, memory to ensure proper performance and a user experience compatible with the capabilities of the available hardware.
