# **Setup Instructions**  

## **1. Install Required Dependencies**  
Run the following command to install all necessary dependencies:  

```sh
npm install
```

## **2. Create .env file**
In the project root directory, create a .env file and add the following environment variables:

- Connect to Supabase via connection pooling with Supavisor  
DATABASE_URL=xxxx  

- Direct connection to the database (Used for migrations)  
DIRECT_URL=xxxx  

- Next auth secret
AUTH_SECRET=xxxxx  

- AWS Configuration since images are upload here
AWS_SKEY=xxxx  
AWS_AKEY=xxxx  
AWS_REGION=xxxx  
AWS_BUCKET_NAME=xxxx  

- Public access for the objects
NEXT_PUBLIC_AWS_LINK=xxxx  

## **3. Start the server**
```
npm run dev
```

Default user admin pass admin