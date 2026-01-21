export const quizData = [
    {
        id: 1,
        question: "Your website needs to store user-uploaded profile photos. Which service is most cost-effective?",
        options: ["EC2", "S3", "RDS", "EBS"],
        answer: "S3",
        explanation: "Amazon S3 (Simple Storage Service) is designed for object storage like images, videos, and backups. It costs significantly less than block storage (EBS) or database storage (RDS) for this use case."
    },
    {
        id: 2,
        question: "You need to run a piece of code every day at 8:00 AM to process logs. You don't want to manage servers.",
        options: ["EC2 Auto Scaling", "Lambda + EventBridge", "Fargate", "Redshift"],
        answer: "Lambda + EventBridge",
        explanation: "EventBridge (formerly CloudWatch Events) can trigger a Lambda function on a schedule (CRON). This is a serverless solution with zero idle cost."
    },
    {
        id: 3,
        question: "Which database would you choose for a high-traffic social media app needing millisecond latency?",
        options: ["Glacier", "DynamoDB", "Redshift", "Athena"],
        answer: "DynamoDB",
        explanation: "DynamoDB is a NoSQL key-value database designed for single-digit millisecond latency at any scale. Perfect for high-velocity data like likes/comments."
    },
    {
        id: 4,
        question: "A company wants to securely manage private keys and rotate database passwords automatically.",
        options: ["AWS Secrets Manager", "IAM Roles", "S3 Encryption", "KMS"],
        answer: "AWS Secrets Manager",
        explanation: "Secrets Manager is specifically built to rotate, manage, and retrieve database credentials and API keys. KMS handles encryption keys, but not password rotation logic."
    },
    {
        id: 5,
        question: "You need to host a Docker container application but don't want to manage the underlying EC2 instances.",
        options: ["ECS on EC2", "AWS Fargate", "Lambda", "Lightsail"],
        answer: "AWS Fargate",
        explanation: "Fargate is the serverless compute engine for containers (ECS/EKS). It removes the need to provision or manage servers/clusters."
    },
    {
        id: 6,
        question: "Which service acts as a 'Virtual Hard Drive' that persists even if an EC2 instance stops?",
        options: ["Instance Store", "EBS", "S3", "EFS"],
        answer: "EBS",
        explanation: "Elastic Block Store (EBS) provides persistent block storage volumes. Instance Store is ephemeral (data persists only while running)."
    },
    {
        id: 7,
        question: "You need to notify 1,000 users via SMS and Email when your system goes down.",
        options: ["SQS", "SNS", "SES", "Kinesis"],
        answer: "SNS",
        explanation: "Simple Notification Service (SNS) uses a pub/sub model to fan out messages to multiple endpoints (Email, SMS, Lambda, HTTP) simultaneously."
    },
    {
        id: 8,
        question: "Your global application users are complaining about slow load times. How do you speed up content delivery?",
        options: ["Route 53", "CloudFront", "Global Accelerator", "Direct Connect"],
        answer: "CloudFront",
        explanation: "CloudFront is a CDN (Content Delivery Network) that caches content at edge locations close to users, drastically reducing latency."
    },
    {
        id: 9,
        question: "Which networking component allows EC2 instances in a private subnet to download updates from the internet?",
        options: ["Internet Gateway", "NAT Gateway", "VPC Peering", "Egress-Only Internet Gateway"],
        answer: "NAT Gateway",
        explanation: "A NAT Gateway enables instances in a private subnet to connect to the internet (e.g. for updates) but prevents the internet from initiating connections with those instances."
    },
    {
        id: 10,
        question: "You need to analyze petabytes of data stored in S3 using standard SQL. You want to pay only for queries run.",
        options: ["Redshift", "Athena", "RDS", "OpenSearch"],
        answer: "Athena",
        explanation: "Athena is a serverless interactive query service that makes it easy to analyze data in S3 using standard SQL. You pay only for the queries that you run."
    },
    {
        id: 11,
        question: "Which service protects your web applications from common web exploits like SQL injection and cross-site scripting?",
        options: ["AWS Shield", "AWS WAF", "Inspector", "GuardDuty"],
        answer: "AWS WAF",
        explanation: "AWS WAF (Web Application Firewall) helps protect your web applications or APIs against common web exploits and bots that may affect availability, compromise security, or consume excessive resources."
    },
    {
        id: 12,
        question: "You need a fully managed graph database service.",
        options: ["DynamoDB", "Neptune", "ElastiCache", "Timestream"],
        answer: "Neptune",
        explanation: "Amazon Neptune is a fast, reliable, fully managed graph database service that makes it easy to build and run applications that work with highly connected datasets."
    },
    {
        id: 13,
        question: "Which service tracks user activity and API usage across your AWS account for auditing?",
        options: ["CloudWatch", "CloudTrail", "Config", "Artifact"],
        answer: "CloudTrail",
        explanation: "CloudTrail tracks user activity and API calls. It records who made the API call, when it was made, and from which IP address, which is essential for auditing."
    },
    {
        id: 14,
        question: "You have a fleet of EC2 instances. You want to ensure they are all patched with the latest security updates automatically.",
        options: ["Systems Manager", "Inspector", "OpsWorks", "CodeDeploy"],
        answer: "Systems Manager",
        explanation: "AWS Systems Manager (specifically Patch Manager) automates the process of patching managed instances with security related updates."
    },
    {
        id: 15,
        question: "Which storage class is best for long-term data archiving where retrieval time of 12 hours is acceptable?",
        options: ["S3 Standard", "S3 Intelligent-Tiering", "S3 Glacier Deep Archive", "S3 One Zone-IA"],
        answer: "S3 Glacier Deep Archive",
        explanation: "S3 Glacier Deep Archive is the lowest-cost storage class and supports long-term retention and digital preservation for data that may be accessed once or twice in a year."
    },
    {
        id: 16,
        question: "You need to decouple your microservices to handle high volumes of messages without losing them.",
        options: ["SNS", "SQS", "Kinesis", "EventBridge"],
        answer: "SQS",
        explanation: "Simple Queue Service (SQS) offers a secure, durable, and available hosted queue that lets you integrate and decouple distributed software systems and components."
    },
    {
        id: 17,
        question: "Which service allows you to deploy infrastructure as code using templates?",
        options: ["CodeBuild", "CloudFormation", "Elastic Beanstalk", "OpsWorks"],
        answer: "CloudFormation",
        explanation: "AWS CloudFormation gives you an easy way to model a collection of related AWS and third-party resources, provision them quickly and consistently, and manage them throughout their lifecycles, by treating infrastructure as code."
    },
    {
        id: 18,
        question: "You want to route traffic to different EC2 instances based on the geolocation of the user.",
        options: ["ELB", "Route 53", "CloudFront", "Global Accelerator"],
        answer: "Route 53",
        explanation: "Amazon Route 53 (DNS) supports Geolocation routing policies, which let you choose the resources that serve your traffic based on the geographic location of your users."
    },
    {
        id: 19,
        question: "Which service leverages machine learning to automatically discover, classify, and protect sensitive data in AWS?",
        options: ["GuardDuty", "Macie", "Inspector", "Detective"],
        answer: "Macie",
        explanation: "Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect your sensitive data in AWS."
    },
    {
        id: 20,
        question: "You need to transfer 50 petabytes of data from your on-premises data center to AWS. Bandwidth is limited.",
        options: ["Direct Connect", "S3 Transfer Acceleration", "Snowmobile", "Snowball Edge"],
        answer: "Snowmobile",
        explanation: "AWS Snowmobile is an Exabyte-scale data transfer service used to move extremely large amounts of data (up to 100PB per Snowmobile) to AWS."
    },
    {
        id: 21,
        question: "Which type of EC2 instance is the most cost-effective for fault-tolerant workloads that can handle interruptions?",
        options: ["On-Demand", "Reserved Instances", "Spot Instances", "Dedicated Hosts"],
        answer: "Spot Instances",
        explanation: "Spot Instances let you take advantage of unused EC2 capacity in the AWS cloud. They are available at up to a 90% discount compared to On-Demand prices but can be interrupted."
    },
    {
        id: 22,
        question: "You need a high-performance file system that can be accessed concurrently by hundreds of EC2 instances.",
        options: ["EBS", "S3", "EFS", "Instance Store"],
        answer: "EFS",
        explanation: "Amazon Elastic File System (EFS) provides a simple, serverless, set-and-forget, elastic file system that lets you share file data without provisioning or managing storage."
    },
    {
        id: 23,
        question: "Which service allows you to run SQL queries across multiple AWS data sources (S3, Aurora, Redshift) via a single API?",
        options: ["Athena Federation", "Redshift Spectrum", "Glue", "Lake Formation"],
        answer: "Athena Federation",
        explanation: "Athena Federated Query allows you to run SQL queries across data stored in relational, non-relational, object, and custom data sources."
    },
    {
        id: 24,
        question: "You want to receive an alert if your estimated monthly bill exceeds a certain amount.",
        options: ["Cost Explorer", "Budgets", "Billing Dashboard", "Trusted Advisor"],
        answer: "Budgets",
        explanation: "AWS Budgets allows you to set custom budgets to track your cost and usage. You can set up alerts to be notified via email or SNS when you exceed your threshold."
    },
    {
        id: 25,
        question: "Which service can help you mitigate a DDoS attack?",
        options: ["WAF", "Shield", "Inspector", "GuardDuty"],
        answer: "Shield",
        explanation: "AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that safeguards applications running on AWS. Shield Standard is enabled by default; Advanced offers higher protection."
    },
    {
        id: 26,
        question: "You need to coordinate multiple AWS services into serverless workflows.",
        options: ["Step Functions", "SWF", "Lambda", "Batch"],
        answer: "Step Functions",
        explanation: "AWS Step Functions is a serverless function orchestrator that makes it easy to sequence AWS Lambda functions and multiple AWS services into business-critical applications."
    },
    {
        id: 27,
        question: "Which database engine is compatible with MongoDB workloads?",
        options: ["DocumentDB", "DynamoDB", "Neptune", "Keyspaces"],
        answer: "DocumentDB",
        explanation: "Amazon DocumentDB (with MongoDB compatibility) is a fast, reliable, and fully managed database service that makes it easy to set up, operate, and scale MongoDB-compatible databases."
    },
    {
        id: 28,
        question: "You require a hardware security module (HSM) dedicated to you for regulatory compliance.",
        options: ["KMS", "CloudHSM", "Secrets Manager", "Certificate Manager"],
        answer: "CloudHSM",
        explanation: "AWS CloudHSM is a cloud-based hardware security module (HSM) that enables you to easily generate and use your own encryption keys on the AWS Cloud."
    },
    {
        id: 29,
        question: "Which service provides a dedicated network connection from your premises to AWS?",
        options: ["VPN", "Direct Connect", "PrivateLink", "Transit Gateway"],
        answer: "Direct Connect",
        explanation: "AWS Direct Connect links your internal network to an AWS Direct Connect location over a standard Ethernet fiber-optic cable."
    },
    {
        id: 30,
        question: "You need to deploy a simple web application and want AWS to handle the deployment details (capacity provisioning, load balancing, auto-scaling).",
        options: ["CloudFormation", "Elastic Beanstalk", "OpsWorks", "EC2"],
        answer: "Elastic Beanstalk",
        explanation: "AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker."
    },
    {
        id: 31,
        question: "A company needs to store data with WORM (Write Once, Read Many) protection.",
        options: ["S3 Object Lock", "EBS Snapshots", "Glacier Vault Lock", "KMS Key Policy"],
        answer: "S3 Object Lock",
        explanation: "S3 Object Lock enables you to store objects using a write-once-read-many (WORM) model. You can prevent an object from being deleted or overwritten for a fixed amount of time or indefinitely."
    },
    {
        id: 32,
        question: "Which service is best for processing real-time streaming data at scale?",
        options: ["Kinesis Data Streams", "Glue", "Batch", "SQS"],
        answer: "Kinesis Data Streams",
        explanation: "Amazon Kinesis Data Streams is a scalable and durable real-time data streaming service that can continuously capture gigabytes of data per second from hundreds of thousands of sources."
    },
    {
        id: 33,
        question: "You need to grant temporary access to an AWS bucket for a mobile app user.",
        options: ["IAM User", "Cognito Identity Pools", "S3 Pre-signed URL", "CloudFront Signed Cookie"],
        answer: "Cognito Identity Pools",
        explanation: "Amazon Cognito Identity Pools (Federated Identities) enable you to create unique identities for your users and federate them with identity providers, handling temporary AWS credentials."
    },
    {
        id: 34,
        question: "Which service allows you to test your application on real mobile devices?",
        options: ["Device Farm", "Mobile Hub", "AppSync", "Amplify"],
        answer: "Device Farm",
        explanation: "AWS Device Farm is an app testing service that lets you test and interact with your Android, iOS, and web apps on many real, physical phones and tablets that are hosted by AWS."
    },
    {
        id: 35,
        question: "You want to automate the review of your AWS resources for cost optimization and security best practices.",
        options: ["Trusted Advisor", "Cost Explorer", "Compute Optimizer", "Config"],
        answer: "Trusted Advisor",
        explanation: "AWS Trusted Advisor provides recommendations that help you follow AWS best practices. Trusted Advisor evaluates your account using checks for cost optimization, security, fault tolerance, and performance improvement."
    },
    {
        id: 36,
        question: "Which service provides managed DDoS protection for applications running on AWS?",
        options: ["Shield", "WAF", "Firewall Manager", "GuardDuty"],
        answer: "Shield",
        explanation: "AWS Shield is a managed Distributed Denial of Service (DDoS) protection service. Shield Advanced provides additional detection and mitigation against large and sophisticated DDoS attacks."
    },
    {
        id: 37,
        question: "You need a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log.",
        options: ["QLDB", "Blockchain", "DynamoDB", "Aurora"],
        answer: "QLDB",
        explanation: "Amazon QLDB (Quantum Ledger Database) is a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log owned by a central trusted authority."
    },
    {
        id: 38,
        question: "Which tool allows you to visualize and understand the structure of your serverless applications?",
        options: ["X-Ray", "CloudWatch Graph", "Step Functions", "AppConfig"],
        answer: "X-Ray",
        explanation: "AWS X-Ray helps developers analyze and debug production, distributed applications, such as those built using a microservices architecture. It provides a service map to view dependencies."
    },
    {
        id: 39,
        question: "You want to run a hybrid cloud architecture with AWS services running in your own data center.",
        options: ["Outposts", "Direct Connect", "Storage Gateway", "Local Zones"],
        answer: "Outposts",
        explanation: "AWS Outposts is a fully managed service that offers the same AWS infrastructure, AWS services, APIs, and tools to virtually any datacenter, co-location space, or on-premises facility."
    },
    {
        id: 40,
        question: "Which service is used for easy deployment and management of containerized applications?",
        options: ["Elastic Container Service (ECS)", "EC2", "Lambda", "App Runner"],
        answer: "Elastic Container Service (ECS)",
        explanation: "Amazon ECS is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications."
    },
    {
        id: 41,
        question: "You need to migrate an on-premises Oracle database to Aurora PostgreSQL with minimal downtime.",
        options: ["Database Migration Service (DMS)", "Schema Conversion Tool (SCT)", "DataSync", "Snowball"],
        answer: "Database Migration Service (DMS)",
        explanation: "AWS Database Migration Service (AWS DMS) helps you migrate databases to AWS quickly and securely. The source database remains fully operational during the migration, enhancing uptime."
    },
    {
        id: 42,
        question: "Which feature of Autoscaling allows you to scale based on a metric like CPU utilization?",
        options: ["Target Tracking Scaling", "Scheduled Scaling", "Predictive Scaling", "Step Scaling"],
        answer: "Target Tracking Scaling",
        explanation: "Target Tracking Scaling policies increase or decrease the current capacity of the group based on a target value for a specific metric (e.g., keep CPU at 50%)."
    },
    {
        id: 43,
        question: "You need to send emails to thousands of users and track open rates.",
        options: ["Amazon Pinpoint", "Amazon SES", "Amazon SNS", "Amazon Connect"],
        answer: "Amazon Pinpoint",
        explanation: "While SES sends emails, Amazon Pinpoint is designed for marketing communications and user engagement, allowing you to track campaign performance, open rates, and more."
    },
    {
        id: 44,
        question: "Which service automates the creation, management, and deployment of cryptographic keys?",
        options: ["KMS", "Secrets Manager", "Macie", "Certificate Manager"],
        answer: "KMS",
        explanation: "AWS Key Management Service (KMS) makes it easy to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications."
    },
    {
        id: 45,
        question: "You need to store and retrieve items based on a key-value model with microsecond latency.",
        options: ["DAX", "DynamoDB", "ElastiCache", "MemoryDB"],
        answer: "DAX",
        explanation: "Amazon DynamoDB Accelerator (DAX) is a fully managed, highly available, in-memory cache for DynamoDB that delivers up to a 10x performance improvement - from milliseconds to microseconds."
    },
    {
        id: 46,
        question: "Which service allows you to run code without provisioning or managing servers, paying only for compute time?",
        options: ["Lambda", "EC2", "Fargate", "Batch"],
        answer: "Lambda",
        explanation: "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers, creating workload-aware cluster scaling logic, keeping event integrations, or managing runtimes."
    },
    {
        id: 47,
        question: "You need a scalable data warehouse to run complex analytic queries against petabytes of structured data.",
        options: ["Redshift", "RDS", "DynamoDB", "Athena"],
        answer: "Redshift",
        explanation: "Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud. It allows you to use your data to acquire new insights for your business and customers."
    },
    {
        id: 48,
        question: "Which service helps you model and provision all your cloud infrastructure resources?",
        options: ["CloudFormation", "Config", "Systems Manager", "OpsWorks"],
        answer: "CloudFormation",
        explanation: "AWS CloudFormation gives you an easy way to model a collection of related AWS and third-party resources, provision them quickly and consistently, and manage them throughout their lifecycles."
    },
    {
        id: 49,
        question: "You need to deliver video content to users globally with low latency.",
        options: ["CloudFront", "Global Accelerator", "Route 53", "Direct Connect"],
        answer: "CloudFront",
        explanation: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds."
    },
    {
        id: 50,
        question: "Which service provides on-demand, serverless compute for containers?",
        options: ["Fargate", "ECS", "EKS", "Lambda"],
        answer: "Fargate",
        explanation: "AWS Fargate is a serverless compute engine for containers that works with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS)."
    }
    ,
    {
        id: 51,
        question: "A company wants to securely share specific S3 objects with a partner without creating AWS credentials for them.",
        options: ["S3 Bucket Policy", "IAM Role", "S3 Pre-signed URL", "ACLs"],
        answer: "S3 Pre-signed URL",
        explanation: "Pre-signed URLs allow you to grant temporary access to specific S3 objects for users who don't have AWS credentials."
    },
    {
        id: 52,
        question: "Which service enables you to centrally manage policies across multiple AWS accounts?",
        options: ["AWS Organizations", "IAM", "Resource Access Manager", "Service Control Policies"],
        answer: "AWS Organizations",
        explanation: "AWS Organizations allows you to centrally manage and govern your environment as you grow and scale your AWS resources, using Service Control Policies (SCPs)."
    },
    {
        id: 53,
        question: "You need a filesystem for Windows servers that supports SMB protocol.",
        options: ["EFS", "FSx for Windows File Server", "S3", "EBS"],
        answer: "FSx for Windows File Server",
        explanation: "Amazon FSx for Windows File Server provides fully managed, highly reliable, and scalable file storage that is accessible over the industry-standard Server Message Block (SMB) protocol."
    },
    {
        id: 54,
        question: "Which routing policy would you use to route traffic to the endpoint with the lowest network latency?",
        options: ["Geolocation", "Latency-based routing", "Failover", "Weighted"],
        answer: "Latency-based routing",
        explanation: "Latency-based routing allows you to route traffic to the AWS region that provides the best latency for the user."
    },
    {
        id: 55,
        question: "You need to run a legacy application that requires a hard-coded IP address.",
        options: ["Elastic IP", "Public IP", "Private IP", "Global Accelerator"],
        answer: "Elastic IP",
        explanation: "An Elastic IP address is a static, IPv4 address designed for dynamic cloud computing. You can mask the failure of an instance or software by rapidly remapping the address to another instance."
    },
    {
        id: 56,
        question: "Which service is best for querying log data stored in CloudWatch Logs?",
        options: ["CloudWatch Logs Insights", "Athena", "Kinesis", "Glue"],
        answer: "CloudWatch Logs Insights",
        explanation: "CloudWatch Logs Insights enables you to interactively search and analyze your log data in Amazon CloudWatch Logs."
    },
    {
        id: 57,
        question: "A developer wants to trace calls across microservices to debug latency issues.",
        options: ["CloudTrail", "X-Ray", "CloudWatch", "VPC Flow Logs"],
        answer: "X-Ray",
        explanation: "AWS X-Ray helps developers analyze and debug production, distributed applications, such as those built using a microservices architecture."
    },
    {
        id: 58,
        question: "Which database would you recommend for storing session state data requiring sub-millisecond latency?",
        options: ["DynamoDB", "ElastiCache", "RDS", "Redshift"],
        answer: "ElastiCache",
        explanation: "Amazon ElastiCache is an in-memory data store (Redis/Memcached) ideal for high-speed use cases like session caching."
    },
    {
        id: 59,
        question: "You need to encrypt data stored in an EBS volume. Which service manages the keys?",
        options: ["AWS KMS", "AWS Secrets Manager", "AWS Certificate Manager", "IAM"],
        answer: "AWS KMS",
        explanation: "AWS Key Management Service (KMS) is used to create and manage cryptographic keys for encrypting data across AWS services, including EBS."
    },
    {
        id: 60,
        question: "Which service can notify you if an EC2 instance is underutilized?",
        options: ["Cost Explorer", "Trusted Advisor", "CloudWatch", "Systems Manager"],
        answer: "Trusted Advisor",
        explanation: "AWS Trusted Advisor checks your infrastructure and provides recommendations for cost optimization, including identifying underutilized EC2 instances."
    },
    {
        id: 61,
        question: "Which VPC feature acts as a firewall for associated subnets?",
        options: ["Security Group", "Network ACL", "Route Table", "Internet Gateway"],
        answer: "Network ACL",
        explanation: "A Network Access Control List (NACL) is an optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets."
    },
    {
        id: 62,
        question: "You need to store objects that are accessed frequently for the first 30 days and then rarely.",
        options: ["S3 Standard", "S3 Intelligent-Tiering", "S3 Standard-IA", "S3 Glacier"],
        answer: "S3 Intelligent-Tiering",
        explanation: "S3 Intelligent-Tiering works by monitoring access patterns and automatically moving objects that have not been accessed to lower-cost access tiers."
    },
    {
        id: 63,
        question: "Which service allows you to run containers on AWS without managing servers?",
        options: ["EC2", "Fargate", "Lightsail", "OpsWorks"],
        answer: "Fargate",
        explanation: "AWS Fargate is a serverless compute engine for containers that removes the need to provision and manage servers."
    },
    {
        id: 64,
        question: "A company wants to migrate 50TB of data to AWS but has a slow internet connection.",
        options: ["Snowball Edge", "Direct Connect", "S3 Transfer Acceleration", "VPN"],
        answer: "Snowball Edge",
        explanation: "AWS Snowball Edge is a data transfer device used to move large amounts of data (TB to PB scale) into AWS when network bandwidth is limited."
    },
    {
        id: 65,
        question: "Which service allows you to create private connections between your VPC and supported AWS services?",
        options: ["VPC Peering", "VPC Endpoint", "VPN Gateway", "Direct Connect"],
        answer: "VPC Endpoint",
        explanation: "A VPC Endpoint enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by PrivateLink without requiring an internet gateway."
    },
    {
        id: 66,
        question: "Which AWS service is used to deploy application code to EC2, Lambda, and on-premises servers?",
        options: ["CodeBuild", "CodeDeploy", "CodePipeline", "CodeCommit"],
        answer: "CodeDeploy",
        explanation: "AWS CodeDeploy automates code deployments to any instance, including Amazon EC2 instances and on-premises servers."
    },
    {
        id: 67,
        question: "You need a fully managed MySQL database with automatic failover.",
        options: ["RDS Multi-AZ", "DynamoDB", "Redshift", "EC2 with MySQL"],
        answer: "RDS Multi-AZ",
        explanation: "Amazon RDS Multi-AZ deployments provide high availability and failover support for DB instances."
    },
    {
        id: 68,
        question: "Which service provides a graphical interface to visualize your serverless workflows?",
        options: ["Step Functions", "Lambda", "EventBridge", "SQS"],
        answer: "Step Functions",
        explanation: "AWS Step Functions provides a visual workflow allowing you to coordinate distributed applications and microservices."
    },
    {
        id: 69,
        question: "A company needs to store financial records for 7 years to meet compliance regulations. Retrieval time can be hours.",
        options: ["S3 Standard", "S3 Glacier Flexible Retrieval", "S3 Standard-IA", "EBS"],
        answer: "S3 Glacier Flexible Retrieval",
        explanation: "S3 Glacier Flexible Retrieval (formerly Glacier) is a low-cost storage class for data archiving where retrieval times of minutes to hours are acceptable."
    },
    {
        id: 70,
        question: "Which architecture pattern helps ensure your application can handle traffic spikes?",
        options: ["Tightly Coupled", "Monolithic", "Decoupled", "Single Availability Zone"],
        answer: "Decoupled",
        explanation: "Decoupling components (e.g., using SQS) allows them to scale independently and handle spikes in traffic without crashing the entire system."
    },
    {
        id: 71,
        question: "You want to run a script to resize images uploaded to S3 automatically.",
        options: ["EC2", "Lambda", "Glue", "Fargate"],
        answer: "Lambda",
        explanation: "AWS Lambda can be triggered by S3 events (like an object upload) to execute code (like image resizing) automatically."
    },
    {
        id: 72,
        question: "Which service monitors your AWS resources and applications in real-time?",
        options: ["CloudTrail", "CloudWatch", "Config", "Systems Manager"],
        answer: "CloudWatch",
        explanation: "Amazon CloudWatch provides reliable, scalable, and flexible monitoring for your AWS resources, applications, and services."
    },
    {
        id: 73,
        question: "You need to ensure that an EC2 instance is placed on a distinct physical server to meet compliance needs.",
        options: ["Dedicated Host", "Dedicated Instance", "Spot Instance", "Reserved Instance"],
        answer: "Dedicated Host",
        explanation: "An Amazon EC2 Dedicated Host is a physical server with EC2 instance capacity fully dedicated to your use, often required for regulatory compliance."
    },
    {
        id: 74,
        question: "Which service offers a managed Hadoop framework to process vast amounts of data?",
        options: ["EMR", "Redshift", "Athena", "Glue"],
        answer: "EMR",
        explanation: "Amazon EMR (Elastic MapReduce) is the industry-leading cloud big data platform for processing vast amounts of data using open source tools like Hadoop, Spark, and Hive."
    },
    {
        id: 75,
        question: "Which service allows you to distribute traffic across multiple targets in different Availability Zones?",
        options: ["Auto Scaling", "Elastic Load Balancer", "Route 53", "CloudFront"],
        answer: "Elastic Load Balancer",
        explanation: "Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses."
    },
    {
        id: 76,
        question: "You need to establish a dedicated network connection from your premises to AWS bypassing the internet.",
        options: ["VPN", "Direct Connect", "VPC Peering", "Transit Gateway"],
        answer: "Direct Connect",
        explanation: "AWS Direct Connect provides a dedicated private connection from a remote network to your VPC, bypassing the public internet."
    },
    {
        id: 77,
        question: "Which service uses machine learning to detect anomalous behavior in your AWS account?",
        options: ["GuardDuty", "Inspector", "Macie", "Shield"],
        answer: "GuardDuty",
        explanation: "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior using machine learning."
    },
    {
        id: 78,
        question: "You want to centrally manage and automate backups across AWS services.",
        options: ["AWS Backup", "S3 Lifecycle", "EBS Snapshots", "RDS Automated Backups"],
        answer: "AWS Backup",
        explanation: "AWS Backup is a fully managed service that makes it easy to centralize and automate data protection across AWS services."
    },
    {
        id: 79,
        question: "Which service allows you to query data in S3 using SQL without moving it?",
        options: ["Athena", "Redshift", "Glue", "RDS"],
        answer: "Athena",
        explanation: "Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL."
    },
    {
        id: 80,
        question: "You need to store hierarchy data like an organizational chart.",
        options: ["S3", "DynamoDB", "Neptune", "RDS"],
        answer: "Neptune",
        explanation: "Amazon Neptune is a graph database service purpose-built for storing and navigating highly connected datasets like social networks or organizational charts."
    },
    {
        id: 81,
        question: "Which service manages SSL/TLS certificates for your AWS based websites?",
        options: ["AWS Certificate Manager", "IAM", "KMS", "Secrets Manager"],
        answer: "AWS Certificate Manager",
        explanation: "AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS certificates."
    },
    {
        id: 82,
        question: "A startup wants to use a database that scales automatically and charges only for requests.",
        options: ["RDS", "Aurora Serverless", "Redshift", "DynamoDB On-Demand"],
        answer: "DynamoDB On-Demand",
        explanation: "DynamoDB On-Demand offers a flexible billing option capable of serving thousands of requests per second without capacity planning."
    },
    {
        id: 83,
        question: "Which service is best for streaming real-time video?",
        options: ["Kinesis Video Streams", "MediaConvert", "CloudFront", "S3"],
        answer: "Kinesis Video Streams",
        explanation: "Amazon Kinesis Video Streams makes it easy to securely stream video from connected devices to AWS for analytics, machine learning, and playback."
    },
    {
        id: 84,
        question: "You need to coordinate sending email, SMS, and push notifications to users.",
        options: ["Pinpoint", "SNS", "SES", "Connect"],
        answer: "Pinpoint",
        explanation: "Amazon Pinpoint is a flexible and scalable outbound and inbound marketing communications service for Email, SMS, Push, and Voice."
    },
    {
        id: 85,
        question: "Which service allows you to access AWS services from a terminal?",
        options: ["AWS CLI", "AWS Console", "AWS SDK", "CloudShell"],
        answer: "AWS CLI",
        explanation: "The AWS Command Line Interface (CLI) is a unified tool to manage your AWS services from a command line shell."
    },
    {
        id: 86,
        question: "You want to automate the text-to-speech conversion for your application.",
        options: ["Polly", "Transcribe", "Lex", "Rekognition"],
        answer: "Polly",
        explanation: "Amazon Polly is a service that turns text into lifelike speech, allowing you to create applications that talk."
    },
    {
        id: 87,
        question: "Which service provides a catalog of third-party software that you can deploy on AWS?",
        options: ["AWS Marketplace", "Service Catalog", "Systems Manager", "Artifact"],
        answer: "AWS Marketplace",
        explanation: "AWS Marketplace is a digital catalog with thousands of software listings from independent software vendors that make it easy to find, test, buy, and deploy software."
    },
    {
        id: 88,
        question: "You need to migrate an on-premises VMWare environment to AWS.",
        options: ["VMware Cloud on AWS", "EC2", "Lightsail", "Outposts"],
        answer: "VMware Cloud on AWS",
        explanation: "VMware Cloud on AWS relieves you from the burden of managing the physical data center hardware while keeping your VMWare environment intact."
    },
    {
        id: 89,
        question: "Which service is a fully managed Docker registry?",
        options: ["ECR", "ECS", "EKS", "S3"],
        answer: "ECR",
        explanation: "Amazon Elastic Container Registry (ECR) is a fully managed container registry that makes it easy to store, manage, share, and deploy your container images."
    },
    {
        id: 90,
        question: "You want to improve the availability of your application by adding a second AWS region. Which Route 53 policy should you use?",
        options: ["Failover Routing", "Simple Routing", "Geolocation Routing", "Multivalue Answer"],
        answer: "Failover Routing",
        explanation: "Failover routing is used when you want to configure an active-passive failover configuration, perfect for DR scenarios."
    },
    {
        id: 91,
        question: "Which service allows you to create a private network dedicated to your AWS account?",
        options: ["VPC", "VPN", "Direct Connect", "Subnet"],
        answer: "VPC",
        explanation: "Amazon Virtual Private Cloud (VPC) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define."
    },
    {
        id: 92,
        question: "You need to protect your S3 buckets from accidental deletion.",
        options: ["Versioning", "MFA Delete", "Bucket Policy", "All of the above"],
        answer: "All of the above",
        explanation: "Versioning, MFA Delete, and restrictive Bucket Policies are all valid strategies to protect data from accidental deletion."
    },
    {
        id: 93,
        question: "Which service allows you to process large amounts of data using a serverless approach?",
        options: ["Glue", "EMR", "Redshift", "Athena"],
        answer: "Glue",
        explanation: "AWS Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development."
    },
    {
        id: 94,
        question: "You need to manage configuration changes of your AWS resources and view their history.",
        options: ["AWS Config", "CloudTrail", "CloudWatch", "Systems Manager"],
        answer: "AWS Config",
        explanation: "AWS Config is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources."
    },
    {
        id: 95,
        question: "Which service allows you to translate text between languages?",
        options: ["Translate", "Transcribe", "Polly", "Lex"],
        answer: "Translate",
        explanation: "Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language translation."
    },
    {
        id: 96,
        question: "A developer wants to test code locally before deploying to Lambda.",
        options: ["AWS SAM", "CloudFormation", "CodeDeploy", "X-Ray"],
        answer: "AWS SAM",
        explanation: "The AWS Serverless Application Model (SAM) CLI allows you to locally build, test, and debug serverless applications."
    },
    {
        id: 97,
        question: "Which service provides a fully managed message broker for ActiveMQ?",
        options: ["Amazon MQ", "SQS", "SNS", "Kinesis"],
        answer: "Amazon MQ",
        explanation: "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ that makes it easy to set up and operate message brokers in the cloud."
    },
    {
        id: 98,
        question: "You need to store application configuration data and secrets.",
        options: ["Systems Manager Parameter Store", "S3", "DynamoDB", "EFS"],
        answer: "Systems Manager Parameter Store",
        explanation: "AWS Systems Manager Parameter Store provides secure, hierarchical storage for configuration data management and secrets management."
    },
    {
        id: 99,
        question: "Which service protects against specialized and sophisticated DDoS attacks?",
        options: ["Shield Advanced", "Shield Standard", "WAF", "GuardDuty"],
        answer: "Shield Advanced",
        explanation: "AWS Shield Advanced provides expanded DDoS protection for your applications running on EC2, ELB, CloudFront, Global Accelerator, and Route 53."
    },
    {
        id: 100,
        question: "You need to ingest and process real-time clickstream data from a website.",
        options: ["Kinesis Data Firehose", "S3", "Glue", "Storage Gateway"],
        answer: "Kinesis Data Firehose",
        explanation: "Amazon Kinesis Data Firehose is the easiest way to reliably load streaming data into data lakes, data stores, and analytics services."
    },
    {
        id: 101,
        question: "Which AWS service allows you to run Lambda functions at edge locations?",
        options: ["Lambda@Edge", "CloudFront Functions", "Global Accelerator", "Route 53"],
        answer: "Lambda@Edge",
        explanation: "Lambda@Edge allows you to run Lambda functions to customize content that CloudFront delivers, executing the functions in AWS locations closer to the viewer."
    },
    {
        id: 102,
        question: "You need a fully managed file system for Lustre to process high-performance computing (HPC) workloads.",
        options: ["FSx for Lustre", "EFS", "S3", "EBS"],
        answer: "FSx for Lustre",
        explanation: "Amazon FSx for Lustre is a fully managed file system that is optimized for compute-intensive workloads, such as high-performance computing (HPC) and machine learning."
    },
    {
        id: 103,
        question: "Which service enables you to securely upload data to S3 from an on-premises application without using public internet?",
        options: ["VPC Endpoint for S3", "VPN", "Direct Connect", "Transit Gateway"],
        answer: "VPC Endpoint for S3",
        explanation: "A VPC Endpoint (Gateway Endpoint) for S3 allows you to privately access S3 from your VPC without using an internet gateway or NAT device."
    },
    {
        id: 104,
        question: "You want to improve the read performance of your DynamoDB table which has frequent common queries.",
        options: ["DAX", "Global Tables", "ElastiCache", "Read Replicas"],
        answer: "DAX",
        explanation: "DynamoDB Accelerator (DAX) is a fully managed, in-memory cache for DynamoDB that delivers up to a 10x performance improvement."
    },
    {
        id: 105,
        question: "Which AWS service helps you migrate databases to AWS with minimal downtime?",
        options: ["AWS DMS", "Schema Conversion Tool", "DataSync", "Migration Hub"],
        answer: "AWS DMS",
        explanation: "AWS Database Migration Service (DMS) supports homogenous and heterogeneous migrations while keeping the source database fully operational."
    },
    {
        id: 106,
        question: "A company wants to assess its security posture and identify vulnerabilities in EC2 instances.",
        options: ["Inspector", "GuardDuty", "Shield", "Macie"],
        answer: "Inspector",
        explanation: "Amazon Inspector automatically assesses applications for exposure, vulnerabilities, and deviations from best practices."
    },
    {
        id: 107,
        question: "Which service offers on-demand, temporary access to AWS console for debugging?",
        options: ["CloudShell", "Systems Manager", "Cloud9", "WorkSpaces"],
        answer: "CloudShell",
        explanation: "AWS CloudShell is a browser-based shell that makes it easy to securely manage, explore, and interact with your AWS resources."
    },
    {
        id: 108,
        question: "You need to automate the creation of a test environment every morning and delete it at night.",
        options: ["CloudFormation", "OpsWorks", "Elastic Beanstalk", "CodeDeploy"],
        answer: "CloudFormation",
        explanation: "AWS CloudFormation allows you to model your infrastructure as code (JSON/YAML) to automate the deployment and deletion of resources."
    },
    {
        id: 109,
        question: "Which service allows you to connect multiple VPCs and on-premises networks to a single gateway?",
        options: ["Transit Gateway", "VPC Peering", "VPN CloudHub", "Direct Connect Gateway"],
        answer: "Transit Gateway",
        explanation: "AWS Transit Gateway connects VPCs and on-premises networks through a central hub, simplifying your network architecture."
    },
    {
        id: 110,
        question: "You need to retrieve a forgotten database password securely in your application.",
        options: ["Secrets Manager", "Systems Manager Parameter Store", "KMS", "IAM"],
        answer: "Secrets Manager",
        explanation: "AWS Secrets Manager helps you protect secrets needed to access your applications, services, and IT resources. It enables you to easily rotate, manage, and retrieve database credentials."
    },
    {
        id: 111,
        question: "Which service analyzes code to find security flaws and bugs?",
        options: ["CodeGuru", "CodeBuild", "Inspector", "X-Ray"],
        answer: "CodeGuru",
        explanation: "Amazon CodeGuru Reviewer uses machine learning to identify critical issues, security vulnerabilities, and hard-to-find bugs during application development."
    },
    {
        id: 112,
        question: "You need to store Docker images for your ECS applications.",
        options: ["ECR", "S3", "Docker Hub", "EFS"],
        answer: "ECR",
        explanation: "Amazon Elastic Container Registry (ECR) is a fully managed container registry that makes it easy to store, manage, and share Docker container images."
    },
    {
        id: 113,
        question: "Which service provides a managed GraphQL API?",
        options: ["AppSync", "API Gateway", "Lambda", "Amplify"],
        answer: "AppSync",
        explanation: "AWS AppSync simplifies application development by letting you create a flexible API to securely access, manipulate, and combine data from one or more sources using GraphQL."
    },
    {
        id: 114,
        question: "You want to record configurations and changes to your AWS resources for compliance.",
        options: ["AWS Config", "CloudTrail", "CloudWatch", "Artifact"],
        answer: "AWS Config",
        explanation: "AWS Config provides a detailed view of the configuration of AWS resources in your AWS account, including how they are related to one another and how they have changed over time."
    },
    {
        id: 115,
        question: "Which S3 feature enables you to replicate objects across AWS Regions?",
        options: ["Cross-Region Replication (CRR)", "Versioning", "S3 Lifecycle", "Transfer Acceleration"],
        answer: "Cross-Region Replication (CRR)",
        explanation: "Cross-Region Replication (CRR) enables automatic, asynchronous copying of objects across buckets in different AWS Regions."
    },
    {
        id: 116,
        question: "You need to run complex analytics queries against exabytes of unstructured data.",
        options: ["Redshift Spectrum", "Athena", "EMR", "RDS"],
        answer: "Redshift Spectrum",
        explanation: "Redshift Spectrum allows you to efficiently query and retrieve structured and unstructured data from files in Amazon S3 without having to load the data into Amazon Redshift tables."
    },
    {
        id: 117,
        question: "Which service helps you visualize the root cause of performance issues in distributed applications?",
        options: ["X-Ray", "CloudWatch", "CloudTrail", "Inspector"],
        answer: "X-Ray",
        explanation: "AWS X-Ray helps developers analyze and debug production, distributed applications, providing a visual map of services and traces."
    },
    {
        id: 118,
        question: "You want to create a static website with a custom domain name.",
        options: ["S3 + Route 53", "EC2", "Lambda", "LightSail"],
        answer: "S3 + Route 53",
        explanation: "You can host a static website on Amazon S3 and use Amazon Route 53 to manage the DNS for your custom domain."
    },
    {
        id: 119,
        question: "Which service allows you to launch resources in a virtual network that you define?",
        options: ["VPC", "VPN", "Subnet", "Internet Gateway"],
        answer: "VPC",
        explanation: "Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined, protecting them from public access."
    },
    {
        id: 120,
        question: "You need a scalable, serverless database for a mobile game leaderboard.",
        options: ["DynamoDB", "RDS", "Neptune", "Redshift"],
        answer: "DynamoDB",
        explanation: "DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale, perfect for game leaderboards."
    },
    {
        id: 121,
        question: "Which service prevents accidental deletion of S3 objects?",
        options: ["MFA Delete", "Encryption", "Tags", "CloudWatch"],
        answer: "MFA Delete",
        explanation: "MFA Delete requires additional authentication for either changing the versioning state of your bucket or permanently deleting an object version."
    },
    {
        id: 122,
        question: "You need to automate the transfer of files into AWS S3 using SFTP.",
        options: ["AWS Transfer Family", "DataSync", "Storage Gateway", "Snowball"],
        answer: "AWS Transfer Family",
        explanation: "AWS Transfer Family provides fully managed support for file transfers directly into and out of Amazon S3 using SFTP, FTPS, and FTP."
    },
    {
        id: 123,
        question: "Which service provides a dedicated physical server for your EC2 instances?",
        options: ["Dedicated Host", "Dedicated Instance", "Bare Metal", "Spot Instance"],
        answer: "Dedicated Host",
        explanation: "An Amazon EC2 Dedicated Host is a physical server with EC2 instance capacity fully dedicated to your use, allowing you to use your existing per-socket software licenses."
    },
    {
        id: 124,
        question: "You want to deploy a web application using Python without managing the underlying infrastructure.",
        options: ["Elastic Beanstalk", "EC2", "CloudFormation", "OpsWorks"],
        answer: "Elastic Beanstalk",
        explanation: "AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Python (and other languages) without managing servers."
    },
    {
        id: 125,
        question: "Which service uses machine learning to protect your sensitive data in S3?",
        options: ["Macie", "GuardDuty", "Inspector", "Shield"],
        answer: "Macie",
        explanation: "Amazon Macie is a fully managed data security and data privacy service that uses machine learning to discover and protect your sensitive data in AWS."
    },
    {
        id: 126,
        question: "You need to process streaming data and load it into Redshift.",
        options: ["Kinesis Data Firehose", "SQS", "SNS", "Glue"],
        answer: "Kinesis Data Firehose",
        explanation: "Kinesis Data Firehose is the easiest way to load streaming data into data stores and analytics tools, including Amazon Redshift."
    },
    {
        id: 127,
        question: "Which pricing model offers the lowest price for predictable workloads with a 1-year or 3-year commitment?",
        options: ["Reserved Instances", "On-Demand", "Spot Instances", "Dedicated Hosts"],
        answer: "Reserved Instances",
        explanation: "Reserved Instances provide you with a significant discount (up to 75%) compared to On-Demand instance pricing for steady-state usage."
    },
    {
        id: 128,
        question: "Which service allows you to centrally manage access to multiple AWS accounts?",
        options: ["AWS SSO (IAM Identity Center)", "IAM", "Cognito", "Directory Service"],
        answer: "AWS SSO (IAM Identity Center)",
        explanation: "AWS IAM Identity Center (formerly AWS SSO) is where you create, or connect, your workforce identities and manage their access centrally across your AWS organization."
    },
    {
        id: 129,
        question: "You need to connect your on-premises data center to your VPC using a private connection.",
        options: ["Direct Connect", "VPN", "Internet Gateway", "Transit Gateway"],
        answer: "Direct Connect",
        explanation: "AWS Direct Connect links your internal network to an AWS Direct Connect location over a standard Ethernet fiber-optic cable, bypassing the public internet."
    },
    {
        id: 130,
        question: "Which service provides a fully managed implementation of the Apache Airflow platform?",
        options: ["MWAA", "Step Functions", "Glue", "Batch"],
        answer: "MWAA",
        explanation: "Amazon Managed Workflows for Apache Airflow (MWAA) is a managed orchestration service for Apache Airflow that makes it easier to set up and operate end-to-end data pipelines."
    },
    {
        id: 131,
        question: "You need to store key-value pairs with microsecond latency.",
        options: ["MemoryDB for Redis", "DynamoDB", "S3", "RDS"],
        answer: "MemoryDB for Redis",
        explanation: "Amazon MemoryDB for Redis is a Redis-compatible, durable, in-memory database service that delivers microsecond read and write latency."
    },
    {
        id: 132,
        question: "Which service allows you to create and manage digital user identities for your applications?",
        options: ["Cognito", "IAM", "Directory Service", "SSO"],
        answer: "Cognito",
        explanation: "Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily."
    },
    {
        id: 133,
        question: "You want to run a containerized application that requires access to the host's networking stack.",
        options: ["ECS with Host Network Mode", "Fargate", "Lambda", "App Runner"],
        answer: "ECS with Host Network Mode",
        explanation: "Using Host network mode in ECS allows the container to share the networking namespace with the EC2 host, bypassing the Docker network stack."
    },
    {
        id: 134,
        question: "Which service ensures that your AWS resources are complying with your internal governance guidelines?",
        options: ["AWS Config", "Systems Manager", "CloudTrail", "Trusted Advisor"],
        answer: "AWS Config",
        explanation: "AWS Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations."
    },
    {
        id: 135,
        question: "You need to automatically rotate database credentials.",
        options: ["Secrets Manager", "KMS", "IAM", "Certificate Manager"],
        answer: "Secrets Manager",
        explanation: "AWS Secrets Manager helps you protect secrets needed to access your applications. It enables you to easily rotate, manage, and retrieve database credentials."
    },
    {
        id: 136,
        question: "Which service provides protection against SQL injection attacks?",
        options: ["AWS WAF", "Shield", "GuardDuty", "Inspector"],
        answer: "AWS WAF",
        explanation: "AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits like SQL injection and XSS."
    },
    {
        id: 137,
        question: "You want to reduce the cost of your S3 storage for data that is rarely accessed.",
        options: ["Transition to S3 Glacier Deep Archive", "Enable Versioning", "Use S3 Transfer Acceleration", "Use EBS"],
        answer: "Transition to S3 Glacier Deep Archive",
        explanation: "S3 Glacier Deep Archive is Amazon S3's lowest-cost storage class and supports long-term retention and digital preservation for data that may be accessed once or twice in a year."
    },
    {
        id: 138,
        question: "Which service allows you to run functions in response to CloudWatch Alarms?",
        options: ["Lambda", "SNS", "SQS", "EC2"],
        answer: "Lambda",
        explanation: "You can configure CloudWatch Alarms to trigger an SNS topic, which can in turn trigger a Lambda function to take automated remedial action."
    },
    {
        id: 139,
        question: "You need to create a global application with users in Europe and the US. You want the lowest possible latency.",
        options: ["Global Accelerator", "Route 53 with Failover", "CloudFront", "Direct Connect"],
        answer: "Global Accelerator",
        explanation: "AWS Global Accelerator uses the AWS global network to improve the availability and performance of your applications to your users by up to 60%."
    },
    {
        id: 140,
        question: "Which service allows you to test iOS and Android apps on real devices?",
        options: ["Device Farm", "Amplify", "AppSync", "Mobile Hub"],
        answer: "Device Farm",
        explanation: "AWS Device Farm is an application testing service that lets you improve the quality of your web and mobile apps by testing them across an extensive range of real desktop browsers and real mobile devices."
    },
    {
        id: 141,
        question: "You need to store output logs from EMR jobs indefinitely.",
        options: ["S3", "EBS", "Instance Store", "EFS"],
        answer: "S3",
        explanation: "Amazon S3 is the ideal storage solution for EMR logs and output data due to its durability, scalability, and low cost."
    },
    {
        id: 142,
        question: "Which service allows you to simplify the management of your software licenses?",
        options: ["License Manager", "Systems Manager", "Config", "Marketplace"],
        answer: "License Manager",
        explanation: "AWS License Manager makes it easier to manage licenses in AWS and on-premises servers from software vendors such as Microsoft, SAP, Oracle, and IBM."
    },
    {
        id: 143,
        question: "You want to receive alerts when your budget forecast exceeds your limit.",
        options: ["AWS Budgets", "Cost Explorer", "Cost and Usage Report", "Billing Dashboard"],
        answer: "AWS Budgets",
        explanation: "AWS Budgets allows you to set custom budgets to track your cost and usage and sends you alerts when you exceed your budgeted amount."
    },
    {
        id: 144,
        question: "Which service is a fully managed extract, transform, and load (ETL) service?",
        options: ["AWS Glue", "Data Pipeline", "EMR", "Redshift"],
        answer: "AWS Glue",
        explanation: "AWS Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development."
    },
    {
        id: 145,
        question: "You need a dedicated network connection that supports 100 Gbps.",
        options: ["Direct Connect", "VPN", "Internet Gateway", "Transit Gateway"],
        answer: "Direct Connect",
        explanation: "AWS Direct Connect supports high bandwidth dedicated connections (1 Gbps, 10 Gbps, and 100 Gbps) to the AWS Cloud."
    },
    {
        id: 146,
        question: "Which service allows you to run code without provisioning or managing servers?",
        options: ["Lambda", "EC2", "LightSail", "Outposts"],
        answer: "Lambda",
        explanation: "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers."
    },
    {
        id: 147,
        question: "You need to encrypt multiple objects in S3 with different keys.",
        options: ["SSE-KMS", "SSE-S3", "Client-Side Encryption", "SSL"],
        answer: "SSE-KMS",
        explanation: "Server-Side Encryption with AWS KMS (SSE-KMS) allows you to use different CMKs for different objects and provides an audit trail of key usage."
    },
    {
        id: 148,
        question: "Which service provides a logical grouping of resources for billing purposes?",
        options: ["Resource Groups", "Cost Allocation Tags", "Organizations", "Consolidated Billing"],
        answer: "Cost Allocation Tags",
        explanation: "Tags are key-value pairs that allow you to organize your AWS resources. You can activate Cost Allocation Tags to track costs by tag on your cost allocation report."
    },
    {
        id: 149,
        question: "You need to ensure that your data in Transit is encrypted.",
        options: ["SSL/TLS", "KMS", "S3 Encryption", "EBS Encryption"],
        answer: "SSL/TLS",
        explanation: "Using SSL/TLS (Secure Sockets Layer/Transport Layer Security) ensures that data is encrypted while it is being transmitted over the network."
    },
    {
        id: 150,
        question: "Which service allows you to create a secure, private network for your containerized applications?",
        options: ["Amazon VPC", "ECS", "EKS", "App Mesh"],
        answer: "Amazon VPC",
        explanation: "Amazon VPC allows you to control the networking environment (subnets, security groups, route tables) for your containerized applications running on ECS or EKS."
    },
    {
        id: 151,
        question: "You want to run a machine learning model on edge devices.",
        options: ["SageMaker Neo", "Rekognition", "Polly", "Transcribe"],
        answer: "SageMaker Neo",
        explanation: "Amazon SageMaker Neo enables developers to train machine learning models once and run them anywhere in the cloud and at the edge."
    },
    {
        id: 152,
        question: "Which service helps you build a data lake on Amazon S3?",
        options: ["Lake Formation", "Glue", "Athena", "Redshift"],
        answer: "Lake Formation",
        explanation: "AWS Lake Formation is a service that makes it easy to set up a secure data lake in days."
    },
    {
        id: 153,
        question: "You need a fully managed windows file server.",
        options: ["FSx for Windows File Server", "EFS", "S3", "EBS"],
        answer: "FSx for Windows File Server",
        explanation: "Amazon FSx for Windows File Server provides fully managed, highly reliable, and scalable file storage that is accessible over the industry-standard Server Message Block (SMB) protocol."
    },
    {
        id: 154,
        question: "Which service allows you to send text messages (SMS) to users globally?",
        options: ["SNS", "SQS", "SES", "Connect"],
        answer: "SNS",
        explanation: "Amazon SNS allowed you to send SMS messages to 200+ countries."
    },
    {
        id: 155,
        question: "You need to monitor the performance of your application in real-time.",
        options: ["CloudWatch", "CloudTrail", "Config", "X-Ray"],
        answer: "CloudWatch",
        explanation: "Amazon CloudWatch provides you with data and actionable insights to monitor your applications, respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health."
    },
    {
        id: 156,
        question: "Which service enables you to run high-performance computing (HPC) applications?",
        options: ["AWS ParallelCluster", "Batch", "Elastic Beanstalk", "CodeDeploy"],
        answer: "AWS ParallelCluster",
        explanation: "AWS ParallelCluster is an open source cluster management tool that makes it easy for you to deploy and manage High Performance Computing (HPC) clusters on AWS."
    },
    {
        id: 157,
        question: "You need to store user session data for a high-traffic gaming application.",
        options: ["ElastiCache", "S3", "Glacier", "Redshift"],
        answer: "ElastiCache",
        explanation: "Amazon ElastiCache offers fully managed Redis and Memcached. It allows you to retrieve data from fast, managed, in-memory caches, key for gaming session data."
    },
    {
        id: 158,
        question: "Which AWS service is used to create and manage APIs?",
        options: ["API Gateway", "AppSync", "Lambda", "Direct Connect"],
        answer: "API Gateway",
        explanation: "Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale."
    },
    {
        id: 159,
        question: "You want to automate security assessments for your compliance audit.",
        options: ["Audit Manager", "Inspector", "GuardDuty", "Shield"],
        answer: "Audit Manager",
        explanation: "AWS Audit Manager helps you continuously audit your AWS usage to simplify how you assess risk and compliance with regulations and industry standards."
    },
    {
        id: 160,
        question: "Which service allows you to deploy and manage applications in the AWS Cloud without worrying about the infrastructure?",
        options: ["Elastic Beanstalk", "EC2", "Lambda", "Fargate"],
        answer: "Elastic Beanstalk",
        explanation: "AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services."
    },
    {
        id: 161,
        question: "You need to decrypt a file that was encrypted using KMS.",
        options: ["KMS", "IAM", "Secrets Manager", "Certificate Manager"],
        answer: "KMS",
        explanation: "AWS KMS (Key Management Service) provides the API operations (Decrypt) to decrypt data that was encrypted under a customer master key (CMK)."
    },
    {
        id: 162,
        question: "Which service helps you discover and migrate on-premises applications to AWS?",
        options: ["Application Discovery Service", "Migration Hub", "DataSync", "SMS"],
        answer: "Application Discovery Service",
        explanation: "AWS Application Discovery Service collects usage and configuration data from your on-premises servers to help you plan your migration."
    },
    {
        id: 163,
        question: "You want to prevent users from uploading unencrypted objects to S3.",
        options: ["Bucket Policy", "IAM Policy", "ACL", "Security Group"],
        answer: "Bucket Policy",
        explanation: "You can use an S3 Bucket Policy with a 'Deny' effect to prevent uploads (PutObject) that do not include encryption headers."
    },
    {
        id: 164,
        question: "Which service provides a central location to manage and share your standardized application patterns?",
        options: ["Service Catalog", "Marketplace", "Systems Manager", "Config"],
        answer: "Service Catalog",
        explanation: "AWS Service Catalog allows organizations to create and manage catalogs of IT services that are approved for use on AWS."
    },
    {
        id: 165,
        question: "You need to protect your web application from bot attacks.",
        options: ["AWS WAF Bot Control", "Shield", "GuardDuty", "Inspector"],
        answer: "AWS WAF Bot Control",
        explanation: "AWS WAF Bot Control gives you visibility and control over common and pervasive bot traffic to your applications."
    },
    {
        id: 166,
        question: "Which service enables you to build conversational interfaces?",
        options: ["Lex", "Polly", "Transcribe", "Connect"],
        answer: "Lex",
        explanation: "Amazon Lex is a service for building conversational interfaces into any application using voice and text."
    },
    {
        id: 167,
        question: "You need a fast, flexible, NoSQL database service for single-digit millisecond performance at any scale.",
        options: ["DynamoDB", "RDS", "Neptune", "Redshift"],
        answer: "DynamoDB",
        explanation: "Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale."
    },
    {
        id: 168,
        question: "Which service allows you to securely share your AWS resources with other AWS accounts?",
        options: ["Resource Access Manager (RAM)", "IAM", "Organizations", "Service Catalog"],
        answer: "Resource Access Manager (RAM)",
        explanation: "AWS Resource Access Manager (RAM) helps you securely share your resources across AWS accounts, within your organization or with AWS Organizations."
    },
    {
        id: 169,
        question: "You want to run containerized applications without managing the underlying instances.",
        options: ["Fargate", "EC2", "ECS", "EKS"],
        answer: "Fargate",
        explanation: "AWS Fargate is a serverless compute engine for containers that works with both Amazon ECS and Amazon EKS."
    },
    {
        id: 170,
        question: "Which service allows you to extract text and data from scanned documents?",
        options: ["Textract", "Rekognition", "Polly", "Transcribe"],
        answer: "Textract",
        explanation: "Amazon Textract is a machine learning service that automatically extracts text, handwriting, and data from scanned documents."
    },
    {
        id: 171,
        question: "You need to store and manage your team's Git repositories.",
        options: ["CodeCommit", "CodeBuild", "CodeDeploy", "CodePipeline"],
        answer: "CodeCommit",
        explanation: "AWS CodeCommit is a fully managed source control service that hosts secure Git-based repositories."
    },
    {
        id: 172,
        question: "Which service allows you to track the progress of your application migration to AWS?",
        options: ["Migration Hub", "Application Discovery Service", "DMS", "SMS"],
        answer: "Migration Hub",
        explanation: "AWS Migration Hub provides a single location to track the progress of application migrations across multiple AWS and partner solutions."
    },
    {
        id: 173,
        question: "You want to run a script every 5 minutes.",
        options: ["EventBridge (CloudWatch Events)", "Lambda", "Batch", "Step Functions"],
        answer: "EventBridge (CloudWatch Events)",
        explanation: "You can use Amazon EventBridge (formerly CloudWatch Events) to create a rule that runs on a schedule (cron) to trigger a target (e.g. Lambda)."
    },
    {
        id: 174,
        question: "Which service provides a managed desktop-as-a-service (DaaS) solution?",
        options: ["WorkSpaces", "AppStream 2.0", "Connect", "Chime"],
        answer: "WorkSpaces",
        explanation: "Amazon WorkSpaces is a managed, secure Desktop-as-a-Service (DaaS) solution."
    },
    {
        id: 175,
        question: "You need to stream real-time data to an Amazon OpenSearch Service cluster.",
        options: ["Kinesis Data Firehose", "Kinesis Data Streams", "Glue", "S3"],
        answer: "Kinesis Data Firehose",
        explanation: "Kinesis Data Firehose is the easiest way to capture, transform, and load data streams into AWS data stores, including Amazon OpenSearch Service."
    },
    {
        id: 176,
        question: "Which service allows you to build specific computer vision applications?",
        options: ["Amazon Panorama", "Rekognition", "SageMaker", "Kinesis Video Streams"],
        answer: "Amazon Panorama",
        explanation: "Amazon Panorama is a machine learning appliance and SDK that allows you to bring computer vision (CV) to on-premises cameras."
    },
    {
        id: 177,
        question: "You want to identify PII (Personally Identifiable Information) in your S3 bucket.",
        options: ["Macie", "GuardDuty", "Inspector", "Artifact"],
        answer: "Macie",
        explanation: "Amazon Macie uses machine learning to automatically discover, classify, and protect sensitive data (such as PII) in AWS."
    },
    {
        id: 178,
        question: "Which service allows you to securely manage access to your S3 bucket?",
        options: ["IAM & Bucket Policies", "NACLs", "Security Groups", "WAF"],
        answer: "IAM & Bucket Policies",
        explanation: "You use IAM policies (for users) and Bucket policies (for resources) to control access to your Amazon S3 buckets."
    },
    {
        id: 179,
        question: "You need to run a relational database but want to scale read operations.",
        options: ["Read Replicas", "Multi-AZ", "Global Tables", "DAX"],
        answer: "Read Replicas",
        explanation: "Read Replicas allow you to scale out beyond the capacity constraints of a single DB instance for read-heavy database workloads."
    },
    {
        id: 180,
        question: "Which service helps you diagnose and resolve technical issues with your AWS resources?",
        options: ["AWS Support", "Personal Health Dashboard", "Trusted Advisor", "Systems Manager"],
        answer: "AWS Support",
        explanation: "AWS Support offers a range of plans that provide access to tools and expertise to help you get the most out of AWS."
    },
    {
        id: 181,
        question: "You want to ensure that your EBS volumes are deleted when the EC2 instance is terminated.",
        options: ["DeleteOnTermination attribute", "Lifecycle Policy", "Spot Instance", "Termination Protection"],
        answer: "DeleteOnTermination attribute",
        explanation: "The 'DeleteOnTermination' attribute determines whether the EBS volume protecting the instance is deleted when the instance is terminated."
    },
    {
        id: 182,
        question: "Which service provides a fully managed document database?",
        options: ["DocumentDB", "DynamoDB", "RDS", "Neptune"],
        answer: "DocumentDB",
        explanation: "Amazon DocumentDB (with MongoDB compatibility) is a fast, scalable, highly available, and fully managed document database service."
    },
    {
        id: 183,
        question: "You need to reduce the latency of serving static assets to users in Asia.",
        options: ["CloudFront", "Global Accelerator", "Route 53", "Direct Connect"],
        answer: "CloudFront",
        explanation: "Amazon CloudFront is a global content delivery network (CDN) that delivers data, videos, applications, and APIs to your viewers with low latency."
    },
    {
        id: 184,
        question: "Which service allows you to search, view, and organize data in AWS systems?",
        options: ["Resource Groups", "Tag Editor", "Systems Manager", "Cost Explorer"],
        answer: "Resource Groups",
        explanation: "AWS Resource Groups lets you organize AWS resources such as Amazon EC2 instances, Amazon Relational Database Service databases, and Amazon S3 buckets into groups for mass management."
    },
    {
        id: 185,
        question: "You want to run code in response to changes in data primarily in DynamoDB.",
        options: ["DynamoDB Streams + Lambda", "Kinesis", "SNS", "SQS"],
        answer: "DynamoDB Streams + Lambda",
        explanation: "DynamoDB Streams captures a time-ordered sequence of item-level modifications in any DynamoDB table and can trigger a Lambda function."
    },
    {
        id: 186,
        question: "Which service provides highly accurate and easy-to-use search intelligence for your applications?",
        options: ["Kendra", "OpenSearch", "CloudSearch", "Athena"],
        answer: "Kendra",
        explanation: "Amazon Kendra is an intelligent search service powered by machine learning."
    },
    {
        id: 187,
        question: "You need to create and manage cryptographic keys for your applications.",
        options: ["KMS", "Secrets Manager", "Certificate Manager", "CloudHSM"],
        answer: "KMS",
        explanation: "AWS Key Management Service (KMS) makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications."
    },
    {
        id: 188,
        question: "Which service helps you optimize your AWS costs?",
        options: ["Cost Explorer", "Compute Optimizer", "Trusted Advisor", "All of the above"],
        answer: "All of the above",
        explanation: "Cost Explorer, Compute Optimizer, and Trusted Advisor all provide tools and recommendations to help you optimize your AWS spending."
    },
    {
        id: 189,
        question: "You want to improve the fault tolerance of your database.",
        options: ["Multi-AZ Deployment", "Read Replicas", "Backups", "Snapshots"],
        answer: "Multi-AZ Deployment",
        explanation: "Multi-AZ deployments for RDS provide enhanced availability and durability by automatically provisioning and maintaining a synchronous standby replica in a different Availability Zone."
    },
    {
        id: 190,
        question: "Which service allows you to build and run applications on the edge of the 5G network?",
        options: ["Wavelength", "Outposts", "Local Zones", "Direct Connect"],
        answer: "Wavelength",
        explanation: "AWS Wavelength embeds AWS compute and storage services within 5G networks, providing mobile edge computing infrastructure for developing, deploying, and scaling ultra-low-latency applications."
    },
    {
        id: 191,
        question: "You need to coordinate multiple AWS services into serverless workflows.",
        options: ["Step Functions", "SWF", "Lambda", "Batch"],
        answer: "Step Functions",
        explanation: "AWS Step Functions is a low-code, visual workflow service that developers use to build distributed applications, automate IT and business processes, and build data and machine learning pipelines."
    },
    {
        id: 192,
        question: "Which service allows you to easily deploy and run applications in containers?",
        options: ["App Runner", "ECS", "EKS", "Fargate"],
        answer: "App Runner",
        explanation: "AWS App Runner is a fully managed service that makes it easy for developers to efficiently deploy containerized web applications and APIs, at scale and with no prior infrastructure experience required."
    },
    {
        id: 193,
        question: "You want to query data in S3 using a standard SQL interface without any infrastructure setup.",
        options: ["Athena", "Redshift", "Glue", "EMR"],
        answer: "Athena",
        explanation: "Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage."
    },
    {
        id: 194,
        question: "Which service provides a fully managed Redis or Memcached-compatible in-memory data store?",
        options: ["ElastiCache", "DynamoDB", "MemoryDB", "RDS"],
        answer: "ElastiCache",
        explanation: "Amazon ElastiCache is a web service that makes it easy to deploy, operate, and scale an in-memory data store or cache in the cloud."
    },
    {
        id: 195,
        question: "You need to connect your VPC to your remote network via a VPN.",
        options: ["VPN Gateway", "Internet Gateway", "NAT Gateway", "Egress-Only Internet Gateway"],
        answer: "VPN Gateway",
        explanation: "A virtual private gateway is the VPN concentrator on the Amazon side of the Site-to-Site VPN connection."
    },
    {
        id: 196,
        question: "Which service allows you to monitor your applications and automatically respond to performance changes?",
        options: ["CloudWatch", "CloudTrail", "Config", "Auto Scaling"],
        answer: "CloudWatch",
        explanation: "Amazon CloudWatch monitors your AWS resources and the applications you run on AWS in real time."
    },
    {
        id: 197,
        question: "You want to ensure that your S3 buckets are not publicly accessible.",
        options: ["S3 Block Public Access", "Bucket Policy", "ACL", "IAM Policy"],
        answer: "S3 Block Public Access",
        explanation: "Amazon S3 Block Public Access provides settings for access points, buckets, and accounts to help you manage public access to Amazon S3 resources."
    },
    {
        id: 198,
        question: "Which service provides a highly available and scalable DNS web service?",
        options: ["Route 53", "CloudFront", "Global Accelerator", "VPC"],
        answer: "Route 53",
        explanation: "Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service."
    },
    {
        id: 199,
        question: "You need to store and retrieve any amount of data, at any time, from anywhere on the web.",
        options: ["S3", "EBS", "EFS", "Glacier"],
        answer: "S3",
        explanation: "Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance."
    },
    {
        id: 200,
        question: "Which service allows you to run applications in AWS Local Zones?",
        options: ["EC2", "Lambda", "ECS", "All of the above"],
        answer: "All of the above",
        explanation: "AWS Local Zones place compute, storage, database, and other select AWS services closer to end-users for low-latency applications."
    }
    ,
    {
        id: 201,
        question: "Which service allows you to build and scale generative AI applications with foundation models?",
        options: ["Amazon Bedrock", "SageMaker", "Rekognition", "Polly"],
        answer: "Amazon Bedrock",
        explanation: "Amazon Bedrock is a fully managed service that makes foundation models from leading AI startups and Amazon available via an API."
    },
    {
        id: 202,
        question: "You need to share code and libraries across multiple Lambda functions to reduce deployment package size.",
        options: ["Lambda Layers", "Step Functions", "EFS", "S3"],
        answer: "Lambda Layers",
        explanation: "A Lambda layer is a .zip file archive that contains supplementary code or data. Layers let you keep your deployment package small."
    },
    {
        id: 203,
        question: "Which feature allows you to connect supported AWS services to creates seamless point-to-point integrations?",
        options: ["EventBridge Pipes", "SNS", "SQS", "Kinesis"],
        answer: "EventBridge Pipes",
        explanation: "Amazon EventBridge Pipes helps you create point-to-point integrations between event producers and consumers with optional filtering, enrichment, and transformation."
    },
    {
        id: 204,
        question: "You need a globally distributed relational database with local read performance in multiple regions.",
        options: ["Aurora Global Database", "DynamoDB Global Tables", "RDS Read Replicas", "Redshift"],
        answer: "Aurora Global Database",
        explanation: "Amazon Aurora Global Database is designed for globally distributed applications, allowing a single Amazon Aurora database to span multiple AWS Regions."
    },
    {
        id: 205,
        question: "Which service allows you to run Kubernetes pods without managing the underlying EC2 nodes?",
        options: ["EKS usually on Fargate", "ECS", "App Runner", "Lightsail"],
        answer: "EKS usually on Fargate",
        explanation: "Running Amazon EKS on AWS Fargate lets you run Kubernetes pods without provisioning or managing EC2 instances."
    },
    {
        id: 206,
        question: "You verify network path reachability between two resources in your VPC.",
        options: ["VPC Reachability Analyzer", "VPC Flow Logs", "Network Access Analyzer", "Traffic Mirroring"],
        answer: "VPC Reachability Analyzer",
        explanation: "VPC Reachability Analyzer is a configuration analysis tool that enables you to check connectivity between a source and destination in your VPCs."
    },
    {
        id: 207,
        question: "Which service aggregates security findings from multiple AWS services and 3rd party tools?",
        options: ["Security Hub", "GuardDuty", "Inspector", "Macie"],
        answer: "Security Hub",
        explanation: "AWS Security Hub provides a comprehensive view of your security alerts and security posture across your AWS accounts."
    },
    {
        id: 208,
        question: "You want to set up a multi-account environment with best practices blueprints automatically.",
        options: ["Control Tower", "Organizations", "Service Catalog", "Config"],
        answer: "Control Tower",
        explanation: "AWS Control Tower provides the easiest way to set up and govern a secure, multi-account AWS environment, automating the landing zone setup."
    },
    {
        id: 209,
        question: "Which machine learning service allows you to compose music with Generative AI models?",
        options: ["DeepComposer", "DeepRacer", "DeepLens", "Polly"],
        answer: "DeepComposer",
        explanation: "AWS DeepComposer gives developers a creative way to get started with Generative AI, specifically for music composition."
    },
    {
        id: 210,
        question: "You need to run quantum computing algorithms on real quantum hardware.",
        options: ["Amazon Braket", "SageMaker", "EC2 Ultra Clusters", "Quantum Ledger"],
        answer: "Amazon Braket",
        explanation: "Amazon Braket is a fully managed quantum computing service that helps you get started with quantum computing algorithms and hardware."
    },
    {
        id: 211,
        question: "Which service is a time-series database for IoT and operational applications?",
        options: ["Timestream", "DynamoDB", "Redshift", "Neptune"],
        answer: "Timestream",
        explanation: "Amazon Timestream is a fast, scalable, and fully managed time-series database service for IoT and operational applications."
    },
    {
        id: 212,
        question: "You want to create a private network that spans your AWS datacenter and your on-premises environment.",
        options: ["Site-to-Site VPN", "Client VPN", "Direct Connect", "CloudHub"],
        answer: "Site-to-Site VPN",
        explanation: "AWS Site-to-Site VPN creates a secure, IPsec-encrypted connection between your on-premises network and your Amazon VPC."
    },
    {
        id: 213,
        question: "Which service leverages satellite ground stations to communicate with satellites?",
        options: ["AWS Ground Station", "Direct Connect", "Global Accelerator", "Route 53"],
        answer: "AWS Ground Station",
        explanation: "AWS Ground Station is a fully managed service that lets you control satellite communications, process data, and scale your operations."
    },
    {
        id: 214,
        question: "You need to manage your IoT devices at the edge, even when they are disconnected from the cloud.",
        options: ["IoT Greengrass", "IoT Core", "IoT Analytics", "IoT Events"],
        answer: "IoT Greengrass",
        explanation: "AWS IoT Greengrass seamlessly extends AWS to edge devices so they can act locally on the data they generate, while still using the cloud for management."
    },
    {
        id: 215,
        question: "Which service provides a centralized view to manage and audit your compliance status?",
        options: ["Audit Manager", "Artifact", "Config", "Security Hub"],
        answer: "Audit Manager",
        explanation: "AWS Audit Manager helps you continuously audit your AWS usage to simplify how you assess risk and compliance with regulations and industry standards."
    },
    {
        id: 216,
        question: "You want to detect cost anomalies and receive root cause analysis.",
        options: ["Cost Anomaly Detection", "Budgets", "Cost Explorer", "Compute Optimizer"],
        answer: "Cost Anomaly Detection",
        explanation: "AWS Cost Anomaly Detection is a feature that uses machine learning to continuously monitor your cost and usage to detect unusual spends."
    },
    {
        id: 217,
        question: "Which service allows you to create and manage a scalable blockchain network?",
        options: ["Managed Blockchain", "QLDB", "VPC Endpoint", "KMS"],
        answer: "Managed Blockchain",
        explanation: "Amazon Managed Blockchain makes it easy to join public networks or create and manage scalable private networks using Hyperledger Fabric and Ethereum."
    },
    {
        id: 218,
        question: "You need to simulate robotics applications in a 3D environment.",
        options: ["RoboMaker", "TwinMaker", "Sumerian", "GameLift"],
        answer: "RoboMaker",
        explanation: "AWS RoboMaker is a service that makes it easy to simulate and deploy robotics applications at cloud scale."
    },
    {
        id: 219,
        question: "Which service allows users to connect to your AWS network using OpenVPN-based clients?",
        options: ["Client VPN", "Site-to-Site VPN", "Direct Connect", "Connect"],
        answer: "Client VPN",
        explanation: "AWS Client VPN is a managed client-based VPN service that enables you to securely access your AWS resources and on-premises networks."
    },
    {
        id: 220,
        question: "You need a static IP address that provides a fixed entry point to your applications globally.",
        options: ["Global Accelerator", "Elastic IP", "CloudFront", "Route 53"],
        answer: "Global Accelerator",
        explanation: "AWS Global Accelerator uses the AWS global network to improve the availability and performance of your applications to local or global users."
    },
    {
        id: 221,
        question: "Which service allows you to create digital twins of real-world systems?",
        options: ["TwinMaker", "RoboMaker", "Sumerian", "Greengrass"],
        answer: "TwinMaker",
        explanation: "AWS IoT TwinMaker makes it easier for developers to create digital twins of real-world systems like buildings, factories, industrial equipment, and production lines."
    },
    {
        id: 222,
        question: "You need to securely transfer files directly into and out of Amazon S3 using SFTP.",
        options: ["AWS Transfer Family", "DataSync", "Storage Gateway", "Snowball"],
        answer: "AWS Transfer Family",
        explanation: "AWS Transfer Family provides fully managed support for file transfers directly into and out of Amazon S3 using SFTP, FTPS, and FTP."
    },
    {
        id: 223,
        question: "Which service enables you to create conversational interfaces (chatbots) using voice and text?",
        options: ["Amazon Lex", "Polly", "Transcribe", "Connect"],
        answer: "Amazon Lex",
        explanation: "Amazon Lex is a service for building conversational interfaces into any application using voice and text (powered by the same deep learning as Alexa)."
    },
    {
        id: 224,
        question: "You need to find the root cause of security issues using a graph-based visualization.",
        options: ["Detective", "GuardDuty", "Security Hub", "Macie"],
        answer: "Detective",
        explanation: "Amazon Detective simplifies the process of investigating potential security issues and suspicious activities by visualizing data in a graph."
    },
    {
        id: 225,
        question: "Which service offers on-demand cloud desktops for remote workers?",
        options: ["WorkSpaces", "AppStream 2.0", "Cloud9", "Connect"],
        answer: "WorkSpaces",
        explanation: "Amazon WorkSpaces is a fully managed, secure Desktop-as-a-Service (DaaS) solution."
    }
    ,
    {
        id: 226,
        question: "You need to protect your web applications from SQL injection and Cross-Site Scripting (XSS).",
        options: ["AWS WAF", "AWS Shield", "Inspector", "GuardDuty"],
        answer: "AWS WAF",
        explanation: "AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits and bots."
    },
    {
        id: 227,
        question: "Which service allows you to centrally manage WAF rules across multiple AWS accounts?",
        options: ["AWS Firewall Manager", "WAF", "Shield Advanced", "Organizations"],
        answer: "AWS Firewall Manager",
        explanation: "AWS Firewall Manager simplifies your AWS WAF administration and maintenance tasks across multiple accounts and resources."
    },
    {
        id: 228,
        question: "You need to encrypt small amounts of data using a public key and decrypt it with a private key.",
        options: ["KMS Asymmetric Keys", "KMS Symmetric Keys", "Secrets Manager", "ACM"],
        answer: "KMS Asymmetric Keys",
        explanation: "AWS KMS supports asymmetric keys, which represents a mathematically related public and private key pair."
    },
    {
        id: 229,
        question: "You want to automatically rotate the credentials for your RDS database every 30 days.",
        options: ["Secrets Manager", "Systems Manager Parameter Store", "IAM", "KMS"],
        answer: "Secrets Manager",
        explanation: "AWS Secrets Manager helps you protect secrets needed to access your applications, services, and IT resources. It enables you to easily rotate credentials."
    },
    {
        id: 230,
        question: "You need to issue private SSL/TLS certificates for your internal corporate network.",
        options: ["ACM Private CA", "ACM Public Certificates", "LetsEncrypt", "Network Firewall"],
        answer: "ACM Private CA",
        explanation: "AWS Private Certificate Authority (AWS Private CA) enables you to create a private CA hierarchy to issue and revoke private certificates."
    },
    {
        id: 231,
        question: "Which service automatically detects personally identifiable information (PII) in your S3 buckets?",
        options: ["Macie", "GuardDuty", "Inspector", "Security Hub"],
        answer: "Macie",
        explanation: "Amazon Macie is a fully managed data security and data privacy service that uses machine learning to discover and protect your sensitive data in AWS."
    },
    {
        id: 232,
        question: "You need to visualize and analyze the behavior of your VPC flow logs to identify potential security issues.",
        options: ["Detective", "Flow Logs Console", "Athena", "QuickSight"],
        answer: "Detective",
        explanation: "Amazon Detective simplifies the process of investigating potential security issues by visualizing data in a graph."
    },
    {
        id: 233,
        question: "Which service helps you continuously audit your AWS usage to simplify risk and compliance assessment?",
        options: ["Audit Manager", "Artifact", "Config", "CloudTrail"],
        answer: "Audit Manager",
        explanation: "AWS Audit Manager helps you continuously audit your AWS usage to simplify how you assess risk and compliance with regulations."
    },
    {
        id: 234,
        question: "You need to download compliance reports like SOC 2 or ISO 27001 for AWS.",
        options: ["AWS Artifact", "Audit Manager", "Security Hub", "Compliance Center"],
        answer: "AWS Artifact",
        explanation: "AWS Artifact provides on-demand access to AWS' security and compliance reports and select online agreements."
    },
    {
        id: 235,
        question: "Which tool allows you to review your workloads against current AWS best practices?",
        options: ["Well-Architected Tool", "Trusted Advisor", "Compute Optimizer", "Config"],
        answer: "Well-Architected Tool",
        explanation: "The AWS Well-Architected Tool helps you review the state of your workloads and compares them to the latest AWS architectural best practices."
    },
    {
        id: 236,
        question: "You want recommendations for optimal EC2 instance types based on your usage history.",
        options: ["Compute Optimizer", "Cost Explorer", "Budgets", "Systems Manager"],
        answer: "Compute Optimizer",
        explanation: "AWS Compute Optimizer recommends optimal AWS resources for your workloads to reduce costs and improve performance by using machine learning."
    },
    {
        id: 237,
        question: "You want to commit to a specific amount of spend per hour for a 1-year term to get a discount.",
        options: ["Savings Plans", "Reserved Instances", "Spot Instances", "On-Demand"],
        answer: "Savings Plans",
        explanation: "Savings Plans is a flexible pricing model that offers low prices on EC2, Lambda, and Fargate usage, in exchange for a commitment to a consistent amount of usage."
    },
    {
        id: 238,
        question: "You need the flexibility to change the instance family or OS of your reserved capacity.",
        options: ["Convertible Reserved Instances", "Standard Reserved Instances", "Savings Plans", "Spot Instances"],
        answer: "Convertible Reserved Instances",
        explanation: "Convertible RIs provide a discount (up to 54% off On-Demand) and the capability to change the attributes of the RI as long as the exchange results in the creation of RIs of equal or greater value."
    },
    {
        id: 239,
        question: "You want to launch a fleet of Spot Instances that diversifies across multiple instance types to minimize interruption risk.",
        options: ["Spot Fleet", "Auto Scaling Group", "EC2 Fleet", "Cluster Placement Group"],
        answer: "Spot Fleet",
        explanation: "A Spot Fleet request allows you to launch a fleet of Spot Instances that can be diversified across multiple instance families to maintain target capacity."
    },
    {
        id: 240,
        question: "You need to pause your EC2 instances and resume them exactly where they left off, saving the RAM state.",
        options: ["Hibernation", "Stop", "Terminate", "Reboot"],
        answer: "Hibernation",
        explanation: "When you hibernate an instance, AWS signals the OS to perform hibernation (suspend-to-disk). Hibernation saves the contents from the instance memory (RAM) to your EBS root volume."
    },
    {
        id: 241,
        question: "You want to automatically move files in EFS to a lower-cost storage tier after 30 days of inactivity.",
        options: ["EFS Lifecycle Management", "S3 Lifecycle", "Intelligent Tiering", "DataSync"],
        answer: "EFS Lifecycle Management",
        explanation: "Amazon EFS Lifecycle Management automatically moves files that have not been accessed for a set period of time to the Infrequent Access (IA) storage class."
    },
    {
        id: 242,
        question: "You need the lowest-cost storage for long-lived data that is rarely accessed but requires millisecond retrieval when needed.",
        options: ["S3 Glacier Instant Retrieval", "S3 Glacier Deep Archive", "S3 Standard-IA", "S3 One Zone-IA"],
        answer: "S3 Glacier Instant Retrieval",
        explanation: "S3 Glacier Instant Retrieval is an archive storage class that delivers the lowest-cost storage for long-lived data that is rarely accessed and requires retrieval in milliseconds."
    },
    {
        id: 243,
        question: "Which S3 feature automatically optimizes storage costs for data with changing access patterns?",
        options: ["S3 Intelligent-Tiering", "S3 Lifecycle", "S3 Storage Lens", "S3 Analytics"],
        answer: "S3 Intelligent-Tiering",
        explanation: "The S3 Intelligent-Tiering storage class is designed to optimize costs by automatically moving data to the most cost-effective access tier, without performance impact or operational overhead."
    },
    {
        id: 244,
        question: "You need to transfer petabytes of data from on-premises NFS servers to Amazon EFS online.",
        options: ["AWS DataSync", "Storage Gateway", "Snowball", "Transfer Family"],
        answer: "AWS DataSync",
        explanation: "AWS DataSync is an online data transfer service that simplifies, automates, and accelerates copying large amounts of data to and from AWS storage services."
    },
    {
        id: 245,
        question: "You need to transfer data between SaaS applications like Salesforce and AWS services like S3.",
        options: ["Amazon AppFlow", "EventBridge", "Glue", "DataSync"],
        answer: "Amazon AppFlow",
        explanation: "Amazon AppFlow is a fully managed integration service that enables you to securely transfer data between Software-as-a-Service (SaaS) applications and AWS services."
    },
    {
        id: 246,
        question: "Which tool allows data analysts to visually prepare data for analytics without writing code?",
        options: ["Glue DataBrew", "SageMaker Wrangler", "Athena", "Quicksight"],
        answer: "Glue DataBrew",
        explanation: "AWS Glue DataBrew is a visual data preparation tool that makes it easy for data analysts and data scientists to clean and normalize data to prepare it for analytics and machine learning."
    },
    {
        id: 247,
        question: "You want to execute SQL queries across data stored in S3, CloudWatch Logs, and DynamoDB simultaneously.",
        options: ["Athena Federated Query", "Redshift Spectrum", "Glue", "EMR"],
        answer: "Athena Federated Query",
        explanation: "Amazon Athena Federated Query allows you to run SQL queries across data stored in relational, non-relational, object, and custom data sources."
    },
    {
        id: 248,
        question: "You need to run Redshift queries directly against exabytes of data in Amazon S3.",
        options: ["Redshift Spectrum", "Athena", "EMR", "Glue"],
        answer: "Redshift Spectrum",
        explanation: "Amazon Redshift Spectrum is a feature of Amazon Redshift that allows you to run queries against exabytes of unstructured data in Amazon S3, with no loading or ETL required."
    },
    {
        id: 249,
        question: "Which service allows you to run big data frameworks like Spark and Hive without managing clusters?",
        options: ["EMR Serverless", "EMR on EC2", "Glue", "Athena"],
        answer: "EMR Serverless",
        explanation: "Amazon EMR Serverless is a serverless option in Amazon EMR that makes it easy for data analysts and engineers to run open-source big data analytics frameworks without configuring, managing, and scaling clusters."
    },
    {
        id: 250,
        question: "You need a fully managed service to build, deploy, and manage APIs.",
        options: ["API Gateway", "AppSync", "ELB", "CloudFront"],
        answer: "API Gateway",
        explanation: "Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale."
    }
];
