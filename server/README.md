## Guidelines

1. - We expect you to spend **around 1.5 hours** on this challenge - use your time wisely, we know it's valuable!
2. I have my own docker React + Node typescript template for quick start, so I just used that since it is quicker for me
3. <br><br>
   ### The key decisions
   I have made is to show full api result in findCompanyOwnershipByKey by separating the Direct and Indirect companies with lands.
   <br> Since finding nested companies still would be necessarily to find nested lands it would be smart to return all root ownerships since
   it could be needed for other purposes. As well as showing the result of company that api found by the company name or company id.
   <br>
   <br>
   I know this is what you didn't ask for, but it would be easier to have this structure for the frontEnd as api result rather than result that
   would show only direct and indirect lands like it was done in findCompanyLandsByKey api.


### What improvements I would have done if had more time:
   <br> Well there is a lot of things I would improve here.

<br><br> 1) From testing the company and lands list from csv files I know that there are duplications in names in companyRelations csv file
I found this in the test DataReader.test.ts file describe: "testing the dataReader" test: "testing if the company names not duplicated"
<br>
So since the test did not explain by what parameters we need to search the company tree I made it possible by searching with company name and ID.
Since in the test was said "For a given company" meaning that we need to find tree by given 1 company, so the search result by the search key should
return only one company as result. Therefore, model/dataReaderFile would give only 1 result by find function that returns the value of the first
result in the list therefore there could be possibility that the api would return not desired company as the search result.
However, it would return the desired result if it searched by the company ID.

<br><br> 2) Add phonetic search or regex to find the company by name or id since now it would find the company only by exact name or id

<br><br> 3) Most existing that I wanted to do is Interval Trees (BUT this wasn't part of the code test/task). When you search for company
some companies could have parentID which shows that it is owned by another company. Which makes things even more interesting since now
you can go upwards the tree (Interval Tree) or downwards you will see the comments outs in the code of whatCompanyOwns function. And then
split the whatCompanyOwns function outcome with indirectly root as object {downWards: ownedCompaniesIndirectlyDownwards, upwards: ownedCompaniesIndirectlyUpwards}
where each one of the downwards or upwards has the same structure of object companies and lands results.
With the Interval Tree approach you can find all related lands and companies that not only comes from the found company root but as it's relatives.
It is like finding all your family root from grand grand grandparents that had children, and then you can go with grand siblings such aunties and uncles.
The Solution is also easy for this.

<br><br> 4) allow importing the data. Instead of relaying on the data from csv files, we could paste or inserted data and then search it

4. - Keep your solution simple, making effective use of your chosen language.
5. I have provided all the test including testing the api
6. - We're not looking for production-ready enterprise-scale code (no databases or servers please, and keep boilerplate to a minimum).


# Express.ts Docker
Express.js TypeScript template for React and Node with auto-generated with Docker-Compose deployment and development configuration.
depending on the /server/DockerFile command you will run:
code 'for prod' would be commented out with for prod comment and dev would be commented out with 'for dev'


## To run without docker
you must be in LandTech/server directory

### Install
To install the application, do the following after cloning the repository:
```bash
npm install
```

###For dev
Run only 1 and only command:
```bash
npm run dev
```

MAKE SURE YOU RUN
```bash
npm intall
```
BEFORE THIS

## To run with docker
comeback to the root directory and run
```bash
docker-compose up --build
```
that will build everything by itself.
MAKE SURE YOU HAVE DOCKER INSTALLED AND RUNNING ON YOUR LOCAL MACHINE


# How to run test:
1) Go to server Directory:
   <br> LandTech/server
2) Then run this command:
```bash
npm run test
```
### The test would automatically run all the tests and will listen to any changes. Try make changes and you will see if it impacts on the code results.
### it won't halt unless you stop it, wait until it finish all the tests
### Watch Usage will appear in the console press q to quit watch mode
### alternatively press 'Control' + 'C'


# How to use app:
## After lunching the app:
###1) Go to Browser open localhost:3000
<br><br>

## In order to understand what results you need to know the routes:
<br><br>
## 1) Find all what business owns in Tree (Data Structure) businesses and lands
###   <br> By Company Name or ID which can be directly write in the browser URL
###   <br> http://localhost:3000/findCompaniesOwnership/${ComapnyNameOrID}
###   <br> where ${CompanyNameOrID} == 'Company Name' or 'companyID-R764915829891'
###   <br> examples:
###   1. id: http://localhost:3000/findCompanyOwnership/R764915829891
###   2. name: http://localhost:3000/findCompanyOwnership/Suniresuni stralli UK Limited
###   <br> to NOTE this:
###      <br> "http://localhost:3000/findCompanyOwnership/Suniresuni stralli UK Limited"
###      <br> would be translated by a browser automatically to this:
###      http://localhost:3000/findCompanyOwnership/Suniresuni%20stralli%20UK%20Limited/


## 2) Find all lands that business owns in Tree (Data Structure)
### <br> Since we want to get only info about how many lands does the company
### owns in this api you only will see the tree of Directly and Indirect lands result
### which will include the total amount of lands person has, and the land object which
### will contain landId and companyId.
### In this case I think most effective is the findCompaniesOwnership api since it gives
### all needed information as the search result
### so how to use that api:
###   <br> By Company Name or ID which can be directly write in the browser URL
###   <br> http://localhost:3000/findCompanyLands/${ComapnyNameOrID}
###   <br> where ${CompanyNameOrID} == 'Company Name' or 'companyID-R764915829891'
###   <br> examples:
###   1. id: http://localhost:3000/findCompanyLands/R764915829891
###   2. name: http://localhost:3000/findCompanyLands/Suniresuni stralli UK Limited
###   <br> to NOTE this:
###      <br> "http://localhost:3000/findCompanyLands/Suniresuni stralli UK Limited"
###      <br> would be translated by a browser automatically to this:
###      http://localhost:3000/findCompanyLands/Suniresuni%20stralli%20UK%20Limited/
      
