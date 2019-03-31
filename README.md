# SurveyX


A Dapp to help you manage authenticity of parties by completing a simple survey, rewarding you with proof of auth and crowd opinions, and a lucky randomly selected participant with a coin reward!

the app can be viewed at its current state at : http://surveyX.io 

future featues and implementaions will be integrated with **Gnosis Ecosystem**

## Usage
Data collecting can be a hard issue filled with bad data irresponsible answers, we believe reward can be a good solution and lottery-like DApp can make user fil more than one form.

So it's a crowd opinion mining and data collection app allow data scientist (or any collectors)to gather authenticated opinion from a selected crowd where gathered data very reliable and specific, although it's a public and anonymous app the collected data is secure and encrypted, just like lottery  the participant spend token to participate and the winning random and fair.

# Actors
## Surveyor
A data scientist interested in an authenticated crowd opinions about a specific subject , they provide the fees for the prize using there wallet(s), can also assign a prediction for the winner as they receive there data

## Participant 
a targeted DApp user who is experienced in the field of the survey and is able to provide meaningful and objective response to the survey in question, will have a small fee for participation and is enrolled in the raffle


# Features
Tools and framework are Truffle v5.0.2, Solidity v0.5.0, react Js.
Main Features:
- Create survey & assign prize.
- Participate in a survey
- Winner selection algorithm 
and compansation 

# Deployment

Use the following steps to run the DApp in a supported shell:
- At the project folder "surveyX", open the Terminal and type the following:
- clone the repo using the following command

		git clone https://github.com/apper-tech/surveyX.git
- install the dependencies using these commands:

		npm install -g truffle
        npm install -g ganache-cli
        npm install
- compile the contracts in preperation for deployment:

        truffle compile
- deploy to local blockchain using these commands:
		
        ganache-cli
        truffle migrate --reset
- start using the DApp using these commands:

		npm start

# The DApp in detail
- **Main Page**
    
    You will get this page after you launch the app ,this is the greeting page
 
<img src="https://drive.google.com/uc?id=1fHrGnALzv6BmHPC85VkW9ttDaxrEZeck">

 - **Test net Check Page**
    
    You might get this page after you launch the app in case of a misconnected network
 
<img src="https://drive.google.com/uc?id=19Vqf_n6UtsBYcDo7Orw3YmFiKCXCDgWw">

- **Participation Page**
    
    if you are invited to participate in a survey you will see the following screen with appropriate controls to do so  
 
<img src="https://drive.google.com/uc?id=1uAG1AgYmFDFMargdkR2lZRvdNk0bbgjJ">

- **Survey Management Page**
    
    if you created a survey you can see all the states about it here, an option to end the survey after enough data has been collected, and a shareable link to the participants
  
 
<img src="https://drive.google.com/uc?id=1iSTgiJEkiITfuxsRaMEMUxnpcHyUgvp1">

- **Survey Creation Page**
    
    A page to create a new survey and assign the opitions,pay the fee and start enrolling participants
  
 
<img src="https://drive.google.com/uc?id=1VHkxBexFbs3CfBqUTZTAgNaZLxafi_mj">

 - **Survey Created**
   
    You will get this page after you created a survey
 
<img src="https://drive.google.com/uc?id=1BwUuMZwwDlu7Dpt7XrrftaQQ_EEVuDYz">

# Future Work
- add a more dynamic survey options module (preferably off-chain)
- Imporove winner selection alogrithm, allow creator to specify some parameters
- TBD: upgrading our business model to generate profit 

# Bonus Feature
- Login with UPort
- Optionally ensure validated identity with services like Telegram Passport

## License
MIT 
