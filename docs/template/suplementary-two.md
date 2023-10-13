# Supplementary Specification (FURPS+)

## Functionality


•	Account Creation: create a valid account, add required information such as username, email address and password. The system validates the information provided and creates the account.
•	Login: The system verifies the provided credentials and authenticates the user.
•	Post creation, comments: The user composes the content of the posts in a text field. The system allows the user to insert links into the content if necessary.
•	Voting on Posts and Comments: Users can vote on existing posts and comments. 
•	Vote Withdrawal: Users have the option to withdraw their vote in a post or comment.
•	Post and Comment Deletion Restrictions: Users are not allowed to delete posts or comments, as well as edit or hide them after posting. Only the system administrator has this capability.
•	Tracking users' actions in the system, such as account creation, posts, comments, and votes.
•	Recording of information such as time, day, months and years of actions, identification of the responsible user and details of the actions performed.
•	These logs can be used for monitoring, troubleshooting, and investigating suspicious activity.
•	Reporting the total number of users, most popular posts, recent comments and voting statistics.
•	The system is compatible with different web browsers and devices such as desktops, laptops, tablets and smartphones (with some adaptations)



## Usability 

•	The system presents the user with an intuitive and easy-to-understand interface.
•	Navigation elements, such as menus and icons, are organized logically and accessible to users.
•	The information structure is visually clear to make it easier to understand and locate the functionalities.
•	Provides visual feedback to the user indicating successful actions, errors, or processing states.
•	Displays clear confirmation or error messages so that users understand the outcome of their interactions.
•	The loading of actions are fast preventing users from getting confused or impatient.
•	Easy to fill out forms.
•	Rich text formatting: Users can apply formatting options (for example, bold, italic, url links, and code format) when creating posts. 
•	The system has a consistent visual identity so that users recognize it easily.
•	The system offers relevant alert information at strategic points in the interface when users are making mistakes in their actions.


## Reliability

•	High availability: The forum is accessible and operational with minimal downtime. 
•	Performance: The application is able to handle the expected workload, ensuring a fast and efficient response to users.
•	Security: The forum has robust authentication and authorization mechanisms to protect information and prevent unauthorized access. 
•	Error handling: The forum handles errors and provides useful messages to users.
•	Simultaneous treatment of users: The forum can handle multiple users interacting simultaneously without problems.



## Performance

•	Fast page loading: The forum has optimized page load times and responsive user interactions.

## Supportability

•	Compatibility: The forum is compatible with popular browsers and operating systems.
•	Scalability: The forum can handle a large number of users and forum activity.
•	Installation: The forum uses different versions for Windows and mac's, necessary to install updated versions of node and python.

## +

### Design Constraints

•	Visually appealing design: The DDD Forum has a visually appealing and consistent user interface.
•	Efficient coding practices: The forum uses efficient coding practices and follows best practices in software development.
•	Adherence to standards: The forum adheres to web standards and best practices and a clean architecture combined with Domain-Driven Design.

### Implementation Constraints

•	Visually appealing design: The DDD Forum has a visually appealing, simple and consistent user interface.
•	Efficient coding practices: The forum uses efficient coding practices and follows best practices in software development.
•	Adherence to standards: The forum adheres to web standards and best practices and a clean architecture combined with Domain-Driven Design. -Built based on: Clean Architecture, SOLID principles and best practices of Domain-Driven Design using TypeScript.


### Interface Constraints

•	The forum is adapted to different devices, managing to meet the complexities of screen size, device orientation, input restrictions such as touch, keyboard or mouse.
•	The interface responds simultaneously to interactions.
•	Notifications, warnings and alerts should be implemented usingToast; APIs: The DDD Forum provides APIs for third-party developers to create extensions or plugins. Compatibility with other systems: The forum is designed to integrate with other forum software or content management systems.

### Physical Constraints


•	Physical environment in which the forum runs can meet the requirements 
•	The design of the application takes into account the energy consumed, optimizing this feature ensuring a proper user experience.
•	Connectivity restrictions: In some situations, the application may experience connectivity constraints, such as unstable network connections, low bandwidth, or connection unavailability. The interface design and functionality should take these limitations into account, but the forum does not provide offline features or unstable connectivity conditions.
•	Hardware restrictions: The forum design takes into account the different hardware capacities such as CPU, memory to ensure proper performance and a user experience compatible with the capabilities of the available hardware.
