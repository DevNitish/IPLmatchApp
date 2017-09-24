To run the app
============
 - Unzip the files
 - Make sure that the Node and mongodb is installed 
 - Mongo server must be running on`mongodb://localhost:27017/ipl`. See `config.js` file
 - You must also dump csv data in mongo db by running `subapp` (see `subapp folder `instructions are given on file)
 - `npm install` to installed dependencies 
 - `npm start` to run app
 -  The neo ipl app will run on`http://localhost:4050`

Features of App
==
 - User can register to IPL app
 - User can see the Teams
 - User can select the year for which he wants to see data
 - There is a contact form

Technologies used to build this:
--------------------------------
 - Mongodb, angular js, Nodejs and express js
 - For front end Bootstrap-4 is used
 - Used API of cloudinary to store pictures on online server
 - Used node app to dump data into mongo db (see `subapp`) 
 - Used Gulp to minify the js and cs files 

Areas of Improvements
---------------
 - Can make game statistics using d3.js
 - User login functionality 

Screenshots
==
![All Team view][1]![Registration page][2]![matches details][3]![home page][4]




![Contact pave][5]


  [1]: https://he-s3.s3.amazonaws.com/media/uploads/9538511.JPG
  [2]: https://he-s3.s3.amazonaws.com/media/uploads/b579ba5.PNG
  [3]: https://he-s3.s3.amazonaws.com/media/uploads/c8210ef.JPG
  [4]: https://he-s3.s3.amazonaws.com/media/uploads/d8a42aa.JPG
  [5]: https://he-s3.s3.amazonaws.com/media/uploads/7a61a84.JPG