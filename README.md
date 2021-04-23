## Live Demo
+1 267-817-5382

<hr>

## Goal

building contact center
- [x] Implement proper routing to an agent queue
- [x] Design a thoughtful contact flow
- [x] It must have at least one Lambda function
- [x] Lambda function that hits a public API to grab some information about a subject of your choosing and shares the data in the flow
- [x] Include as many features of Connect as possible
- [x] Including branching on DTMF menus
- [x] Hold music
- [x] Lambdas will be deployable via SAM, Serverless, or Terraform.

<hr>

## Resources, tools, and runtime used

- [Amazon Connect](https://aws.amazon.com/connect/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Amazon DynamoDB](https://aws.amazon.com/dynamobd/)
- [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/)
- [Amazon Lex](https://aws.amazon.com/lex/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Serverless](https://www.serverless.com/)


<hr>

## Key Features

-   If user profile store database, user is greeted with names on profile
-   user can direct their call to Sales, Customer Service, and Technical Support representatives through DTMF
-   user can leave a callback number in a callback queue if no other representatives are available
-   user can create, update, delete their profile with user's phoneNumber, firstName, lastName, age info
-   user can retrieve current weather information based on their Amazon Lex input
      -   By city
-   user can get current gold & silver price based on their DTMF
      -   Press 1, Gold info
      -   Press 2, Silver info
   
<hr>

## contact flow
```

├── Press1, Press2, Press3  
│   │       # join customer queue if there are available Sales representatives (Mon to Fri, 9 a.m. to 5 p.m.)
│   │       # join customer queue if there are available Customer Service representatives (Mon to Fri, 9 a.m. to 5 p.m.)
│   │       # join customer queue if there are available Technical Support representatives (24/7 always working)
│   │                                                         
│   │           # if there are no available representatives                   
│   │                           
│   ├── Press1      # user can leave call back number to be placed in callback queue
│   │                   
│   └── Press2      # user can hang up
│
│           
├── Press4  
│   │       # manage profile (create, update, delete) by phoneNumber                    
│   │                           
│   ├── Press1      # create profile (get firstName, lastName, age using by Amazon Lex. primary key is user phoneNumber)
│   │                         
│   │               
│   ├── Press2      # update profile (phone number check using lambda whether or not database has this phoneNumber)
│   │   │
│   │   │               
│   │   ├── Press1      # update user name (using by Amazon Lex)    
│   │   │               
│   │   ├── Press2      # update user age (using by Amazon Lex)  
│   │   │               
│   │   └── Press3      # move main menu  
│   │
│   │                     
│   ├── Press3      # delete profile (phone number check using lambda whether or not database has this phoneNumber)
│   │   │
│   │   │               
│   │   ├── Press1      # move to next
│   │   │   │       
│   │   │   ├── Press1      # confirm to delete
│   │   │   │               
│   │   │   └── Press2      # cancel and move main menu
│   │   │                              
│   │   └── Press2      # move main menu  
│   │                                                 
│   └── Press4      # move main menu      
│
│                                  
└── Press5      # navigates to the Bonus feature
    │                       
    ├── Press1      # get Gold or Silver price
    │   │
    │   │               
    │   ├── Press1      # get Gold price    
    │   │               
    │   ├── Press2      # get Silver price   
    │   │               
    │   └── Press3      # move previous menu   
    │                     
    ├── Press2      # get current weather(using Amazon Lex by CityName)
    │                   
    └── Press3      # move main menu 
    

```
<hr>

## Dial Manual

> Press 1 / 2 / 3:   

-   user can join customer queue if there are currently available Sales representatives
-   When there are no available representatives:
  
    -   Press 1: user can leave their callback number to be placed in callback queue
    -   Press 2: user can hang up

>   Press 4:

-   user navigates to the Profile menu flow

    -   Press 1: user can create a new profile
    -   Press 2: user can update an existing profile
    -   Press 3: user can delete an existing profile
    -   Press 4: user can return to the main menu


>   Press 5: 

-   user navigates to the Bonus Features menu

    -   Press 1: user can get Gold and Silver current market price
    -   Press 2: user can get current weather of desired city


<hr>

## DynamoDB Table

TableName: userTable

![Image of Yaktocat](./DynamoDB%20Table%20format%20img.png)

|*phoneNumber|age|firstName|lastName|
| --- | --- | --- | --- |
|71435xxxxx|31|jeon|han|
|21382xxxxx|33|jinho|myung|
