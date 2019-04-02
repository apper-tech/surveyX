# SurveyX

This DApp allows for any survey. The main usage is to facilitate crowd opinion mining through incentivization with rewards. Another use-case is to ensure the authenticity of people by asking them to complete a simple survey, and rewarding them with proof-of-auth that they can use to, for example, login as-human to some external integrated systems.

You can always check the latest implemented features at http://surveyX.io 

The DApp will be soon reimplemented with **Gnosis Apollo**

## Usage
Encouraging the crowd to participate in surveys is a tough task. And having the data not filled with bad quality and irresponsible answers could be tougher. We believe that rewards can be a good solution and a lottery-like DApp can encourage users to fill clean and clear data.

So it's a crowd opinion mining and data collection app allows data scientist (or any collectors) to gather authenticated opinion from a targetted crowd. Facilitate having the gathered data reliable and accurate.

# Actors
## Surveyor
A data scientist who is interested in an authenticated crowd opinions about a specific subject. He also has to provide the prize to be rewarded to participant later (most likely be crypto tokens). 
Depending upon our business model, that yet to be concluded, this user can also define the equation, and its parameters, that specify a selected prize winner(s).

## Participant 
The targeted participant is a normal user who can fill a survey and provide meaningful and objective responses to the survey in question. 
According to our business model, that is not finalized yet, this user may pay a small fee for participation and will be enrolled in a raffle.


# Features
Tools and frameworks are Truffle v5.0.2, Solidity v0.5.0 and React.
Main Features:
- Create a survey.
- Participate in a survey.
- Pre-Pay the prize and define its criterias (to be implemented).
- Reward the selected prize winner (to be implemented).
- Winner(s) selection equation for giving compensation (to be implemented)

# Deployment

Use the following steps to run the DApp in a supported shell:
- At the project folder "surveyX", open the Terminal and type the following:
- Clone the repo using the following command

		git clone https://github.com/apper-tech/surveyX.git
- Install the dependencies using these commands:

		npm install -g truffle
        npm install -g ganache-cli
        npm install
- Compile the contracts in preparation for deployment:

        truffle compile
- Deploy to local blockchain using these commands:
		
        ganache-cli
        truffle migrate --reset
- Start using the DApp using these commands:

		npm start

# The DApp in detail
- **Main Page**
    
    You will get this page after you launch the app. It is the landing page:
 
<img src="https://drive.google.com/uc?id=1fHrGnALzv6BmHPC85VkW9ttDaxrEZeck">

 - **Test-net Main-net Connectivity Check Page**
    
    You might get this page after you launch the app in case of a misconnected network
 
<img src="https://drive.google.com/uc?id=1ID3fAkCsXAd2vMWPO47LnzXcyHZiQBSy">

- **Participation Page**
    
    If you are invited to participate in a survey you will see the following screen with appropriate controls to do so  
 
<img src="https://drive.google.com/uc?id=1uAG1AgYmFDFMargdkR2lZRvdNk0bbgjJ">

- **Survey Management Page**
    
    If you created a survey, you can see all the states about it here. Additionally, you will have here an option to end the survey, after enough data has been collected, and a shareable link to the participants
  
 
<img src="https://drive.google.com/uc?id=1iSTgiJEkiITfuxsRaMEMUxnpcHyUgvp1">

- **Survey Creation Page**
    
    A page to create a new survey, define the options, pay the fee and start enrolling participants
  
 
<img src="https://drive.google.com/uc?id=1VHkxBexFbs3CfBqUTZTAgNaZLxafi_mj">

 - **Survey Created**
   
    You will get this page after you create a survey
 
<img src="https://drive.google.com/uc?id=1BwUuMZwwDlu7Dpt7XrrftaQQ_EEVuDYz">

# Future Work
- Reimplement with Gnosis Apollo.
- Enable dynamic survey options.
- Enable the Surveyor to define the winner selection algorithm, by specifying an equation and its parameters (fairly complex logic has to be implemented here).
- Design and implement a business model (the business model specify how we will generate profit
s).
- Use NonRepudiationX as an off-chain scalability solution.
# Bonus Features
- Login with UPort
- Optionally ensure validated identity with services like Telegram Passport.
- Partnership and Integrate with other systems.

## License
MIT 
