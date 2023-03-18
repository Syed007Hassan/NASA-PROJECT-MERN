# NASA-PROJECT-MERN
Used [Arwes](https://arwes.dev/) Futuristic Sci-Fi UI and implemented REST APIs. NASA [Exoplanets](https://exoplanetarchive.ipac.caltech.edu/)'s data is used to find out the habitable planets and [SPACEX-API](https://github.com/r-spacex/SpaceX-API) is used for populating launches data.  

## 🚀 Architecture Diagram
![nasa](https://github.com/Syed007Hassan/NASA-PROJECT-MERN/blob/main/Project%20Architectural%20Diagram.png)

## 🚀Getting Started

- In the terminal, run: ```git clone https://github.com/Syed007Hassan/NASA-PROJECT-MERN.git```

- Create a ```server/.env``` file with a ```MONGOATLASPASWORD``` property set to your MongoDB connection string and a ```PORT``` property set to ```5000```.

- In the terminal, run: ```npm install```

- In the terminal, run: ```npm run deploy```

- Browse to the mission control frontend at ```localhost:5000``` and schedule an interstellar launch!

## 🚀 Running the test
To run any autamated tests, run ```npm test```. This will
- Run all the client-side tests: ```npm test --prefix client```

- Run all the server-side tests: ```npm test --prefix server```

## 🚀 Running the project using Dockers

- Ensure that you have the latest version of Docker installed and signed in with your account

- In the terminal, run: ```docker build -t <username>/nasa-project``` (image being made)

- In the terminal, run: ```docker run -it -p 5000:5000 <username>/nasa-project``` (application available at ```localhost:5000```)

- In the terminal, run: ```docker push <username>/nasa-project``` (image being pushed to docker hub)

## 🚀 Creating EC2 instance on AWS and deploying container

- Create an [EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) and configure it.

- If you are using windows [Install OpenSSH](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui)

- Connect to the created instance 

![Screenshot 2023-03-18 122823](https://user-images.githubusercontent.com/104893311/226106753-20dbaed8-f7c5-4a6a-be4b-9f1932fa1258.png)

- Now install dockers

```

sudo yum update

sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

sudo yum docker

sudo service docker start

sudo usermod -a -G docker ec2-user

docker run --restart=always -p 5000:5000 <username>/nasa-project

```

![Screenshot 2023-03-18 172631](https://user-images.githubusercontent.com/104893311/226106965-4da0823a-9b6a-4e77-996b-fa5567cb823a.png)

- Container is deployed and is available at [http://13.210.164.154:5000/](http://13.210.164.154:5000/)

![Screenshot 2023-03-18 173011](https://user-images.githubusercontent.com/104893311/226107114-82021efa-4668-4ca1-b612-6b06d5c1ec01.png)

## 🚀 Technologies used 
- ReactJS: For client side
- NodeJs: For creating REST APIS and handling database 
- Jest: For testing APIS and mocking database
- MongoDB: For performing CRUD operations on launches and planets data
- Dockers: For containerizing application
- Github Actions: For creating a CI/CD pipeline 

## 🚀 Demo 

https://user-images.githubusercontent.com/104893311/226123516-307361b7-1ac1-423a-aa77-595ed54e4b38.mp4


