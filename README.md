# MeetWith
This is a project that we were working on as a team of 5 for software engineering course thought by Dr. Bejani at Amirkabir University of Technology  
The project finished in January 2023

This is basically a website to reserve meeting with professors.

We used python(django) for back-end and javascript(react) for front-end and PostgreSQL for database and python(ORM) to connect the database and the back-end.

In addiction, during this project we've learned a lot of things about software engineering like UML diagrams and some techniques like ab-test and needs assessment processes and you can see some of it's document's 
([here](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/mh1.jpg)). 
By the way, we gained a lot of experience about team working. I was manager of the team and one of it's back-end developers.

Here is the instruction of how to use the app step by step (the website was in persian but I will explain everything that is happening in every page)


First of all, an admin makes account's for Meeting Holders (MH's) manually using a simple http request. ([example](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/mh1.jpg))


After that, MH's can login to site (the login button for user's and MH's is common and the web app find's out the role automatically)

![MH Login](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/mh2.jpg)


After logging in, the MH can go to 
"زمان ها"
(times) tab to confirm that when are him/her free times in week, in this example, MH is free in sunday from 12 to 13 pm.

![MH set freetimes](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/mh3.jpg)


Now he/she confirms the plan.

![Confirmation](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/mh4.jpg)

![Confirmation](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/mh5.jpg)


So now the mentioned MH has entered him/her free times, now one user can register a meeting with the MH.
First of all the user has to make an account.

![User login](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/user1.jpg)

![User registration](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/user2.jpg)


Now the user can login with email and password.

![User login](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/user3.jpg)


Here the user have to choose the 
"اساتید"
(teachers) tab to see list of all MH's and then he/she chooses one option to filter the teachers based on their department.


Here we chose 
"اساتید علوم کامپیوتر"
(Computer Science teachers)

![Teachers tab](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/user4.jpg)


After choosing one teacher, the user can observe week plan of the MH and he/she can choose an available time to have meet with the desired teacher.
In left side of this page, the user can choose a time (between dark green items that are available) and after that he/she can write a topic and description about the meeting and the he/she can click on 
"رزرو"
(reserve) button.

![Reserve tab](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/user5.jpg)


Now he/she must confirm his/her choice.

![Confirmation](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/user6.jpg)


If everything was OK and would've been reserved, both people (MH and user) can observe the meetings that they have in the
"قرار های من"
(my meetings) tab.

Now the involved user and MHH can chose
"جلسات آینده"
(future meetings) to see the reserved meetings with each other.

User timeline (future meetings):

![Confirmation](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/final1.jpg)

MH timeline (future meetings):
![Confirmation](https://raw.githubusercontent.com/bateni1380/MeetWith/master/images/final2.jpg)



