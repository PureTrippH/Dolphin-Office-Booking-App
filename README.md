# CHC College Counseling Office Web App
## Context
Originally, this was commissioned by the CHC College Counseling Office to better the workflow of their office and appointment scheduling. For Intro to Engineering, me and [Grayson](https://github.com/Krevace/chc-counseling-scheduler) decided to pick up this project and spend a year on it.
## Functionaily
# Counselor's side (Native Application)
They are given a C# frontend that runs natively on their PC. Through it, they can check appointment requests and accept appointments. This will in turn add the appointment to their google calendar. From here, each counselor can reject, accept, or request an edit to every appointment and the students can see which is requested to allow for conversation between student and counselors.

# Student Side (Web App)
A web app is served to the student by going to dolphin-scheduler.org (if I recall that is the domain) and it will navigate the student to a Google OAuth2 page. From here, it will verify the email selected in inside the Cape Henry Collegiate Domain gmail suite and log the user into the web app. From here, the student can book an appointment for any reason, for any amount of time, and with their own date. Automatically, the web app reads the dates already booked on the counselor's calendars and will reflect what is taken and what is available to the student. From there, they can have a back and forth dialogue using the "edit" button between the college counselors.
