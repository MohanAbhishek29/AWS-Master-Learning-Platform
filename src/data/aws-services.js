import {
    SiAmazonec2, SiAmazonrds, SiAmazondynamodb,
    SiAmazons3, SiAmazoniam, SiAmazoncognito,
    SiAmazonapigateway, SiAwslambda, SiAmazoneks, SiAmazonecs,
    SiAwsfargate, SiAmazonelasticache, SiAmazonredshift,
    SiAmazonroute53, SiAwsamplify, SiAmazonsqs,
    SiAmazonsimpleemailservice, SiAwsorganizations,
    SiAmazonwebservices // Kept only high-confidence icons
} from 'react-icons/si';

import {
    FaShieldAlt, FaServer, FaDatabase, FaNetworkWired,
    FaBrain, FaTools, FaChartBar, FaCubes, FaGlobe,
    FaEye, FaEnvelope, FaBell, FaBolt, FaLock,
    FaBug, FaUserSecret, FaClipboardList, FaHistory, FaSignal // Added replacements
} from 'react-icons/fa';

// Map of categories to colors and labels
export const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'compute', name: 'Compute' },
    { id: 'storage', name: 'Storage' },
    { id: 'database', name: 'Database' },
    { id: 'network', name: 'Networking' },
    { id: 'security', name: 'Security' },
    { id: 'management', name: 'Management & Gov' },
    { id: 'integration', name: 'App Integration' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'devtools', name: 'DevTools' },
];

export const services = [
    // --- COMPUTE ---
    {
        id: 'ec2',
        name: 'Amazon EC2',
        category: 'compute',
        icon: SiAmazonec2,
        tagline: 'Virtual Servers in the Cloud',
        description: 'Secure, resizable compute capacity in the cloud. Launch applications when needed without upfront commitments.',
        detailedDescription: `Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud. Using Amazon EC2 eliminates your need to invest in hardware up front, so you can develop and deploy applications faster.
        
        You can use Amazon EC2 to launch as many or as few virtual servers as you need, configure security and networking, and manage storage. Amazon EC2 enables you to scale up or down to handle changes in requirements or spikes in popularity, reducing your need to forecast traffic.
        
        Key Features:
        • Global Infrastructure: Deploy in multiple regions for high availability.
        • Broad Selection: Choose from hundreds of instance types optimized for compute, memory, storage, or GPU.
        • Elastic IPs: Static IP addresses designed for dynamic cloud computing.`,
        analogy: 'Virtual Rental Machines. Like renting a computer in the cloud that you can totally control.',
        useCases: ['Web Servers', 'Backend Applications', 'Gaming Servers'],
        pricing: 'Pay-per-second. Free tier: 750 hours/month (t2.micro).',
        color: '#FF9900'
    },
    {
        id: 'lambda',
        name: 'AWS Lambda',
        category: 'compute',
        icon: SiAwslambda,
        tagline: 'Run Code without Servers',
        description: 'Run code without provisioning or managing servers. You pay only for the compute time you consume.',
        detailedDescription: `AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers. You can trigger Lambda from over 200 AWS services and SaaS applications, and only pay for what you use.
        
        With Lambda, you upload your code as a ZIP file or container image, and Lambda automatically allocates compute execution power and runs your code based on the incoming request or event, for any scale of traffic. It manages the compute fleet that offers memory, CPU, network, and other resources to your code.`,
        analogy: 'Event-driven execution. Like a "Function-as-a-Service" where code runs only when triggered.',
        useCases: ['Data Processing', 'Real-time File Processing', 'Serverless Backends'],
        pricing: 'Pay per request and duration. Free tier: 1M requests/month.',
        color: '#FF9900'
    },
    {
        id: 'ecs',
        name: 'Amazon ECS',
        category: 'compute',
        icon: SiAmazonecs,
        tagline: 'Run Containers on AWS',
        description: 'Highly secure, reliable, and scalable way to run containers.',
        detailedDescription: `Amazon Elastic Container Service (Amazon ECS) is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications. It deeply integrates with the rest of the AWS platform to provide a secure and easy-to-use solution for running container workloads in the cloud.
        
        ECS creates and manages a cluster of servers (or Fargate instances) and handles the placement of your containers (tasks) onto those servers. It handles load balancing, health monitoring, and scaling of your containers.`,
        analogy: 'Container Management. Like a conductor for your Docker containers.',
        useCases: ['Microservices', 'Batch Processing', 'Hybrid Applications'],
        pricing: 'Pay for EC2 or Fargate resources used.',
        color: '#FF9900'
    },
    {
        id: 'eks',
        name: 'Amazon EKS',
        category: 'compute',
        icon: SiAmazoneks,
        tagline: 'Managed Kubernetes Service',
        description: 'Start, run, and scale Kubernetes without installing or operating your own Kubernetes control plane.',
        detailedDescription: `Amazon Elastic Kubernetes Service (Amazon EKS) is a managed service that runs Kubernetes on AWS. Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. 
        
        EKS automatically manages the availability and scalability of the Kubernetes control plane nodes responsible for scheduling containers, managing application availability, storing cluster data, and other key tasks.`,
        analogy: 'Kubernetes Management. AWS handles the complex "brain" of Kubernetes for you.',
        useCases: ['Kubernetes Applications', 'Machine Learning', 'Hybrid Deployment'],
        pricing: 'Pay per cluster/hour + worker nodes.',
        color: '#FF9900'
    },
    {
        id: 'fargate',
        name: 'AWS Fargate',
        category: 'compute',
        icon: SiAwsfargate,
        tagline: 'Serverless Compute for Containers',
        description: 'Serverless compute engine for containers that works with both Amazon ECS and Amazon EKS.',
        detailedDescription: `AWS Fargate is a serverless, pay-as-you-go compute engine that lets you focus on building applications without managing servers. Fargate is compatible with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).
        
        When you use Fargate, you don't need to provision and manage servers, handle capacity planning, or isolate container workloads for security. Fargate manages the underlying infrastructure for you.`,
        analogy: 'Serverless Containers. Just run the container without caring about the underlying EC2 instance.',
        useCases: ['Web Apps', 'APIs', 'Microservices'],
        pricing: 'Pay for vCPU and memory resources used.',
        color: '#FF9900'
    },
    {
        id: 'lightsail',
        name: 'Amazon Lightsail',
        category: 'compute',
        icon: FaServer,
        tagline: 'Simple Virtual Private Servers',
        description: 'Easy-to-use cloud platform that offers everything needed to build an application or website.',
        detailedDescription: `Amazon Lightsail offers easy-to-use virtual private server (VPS) instances, containers, storage, databases, and more at a cost-effective monthly price.
        
        It is designed to be the easiest way to launch and manage a virtual private server with AWS. Lightsail includes everything you need to launch a project quickly – a virtual machine, SSD based storage, data transfer, DNS management, and a static IP address – for a low, predictable price.`,
        analogy: 'Simplified Cloud. Like a pre-packaged VPS solution (DigitalOcean style) for beginners.',
        useCases: ['Simple Web Apps', 'WordPress Blogs', 'Dev/Test Environments'],
        pricing: 'Fixed monthly pricing (e.g., $3.50/mo).',
        color: '#FF9900'
    },

    // --- STORAGE ---
    {
        id: 's3',
        name: 'Amazon S3',
        category: 'storage',
        icon: SiAmazons3,
        tagline: 'Scalable Object Storage',
        description: 'Object storage built to store and retrieve any amount of data from anywhere.',
        detailedDescription: `Amazon Simple Storage Service (Amazon S3) is an object storage service featuring industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries use it to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics.
        
        S3 provides easy-to-use management features so you can organize your data and configure finely-tuned access controls to meet your specific business, organizational, and compliance requirements.`,
        analogy: 'Infinite Hard Drive. Stores files as objects in buckets.',
        useCases: ['Backups', 'Static Websites', 'Data Lakes', 'Media Storage'],
        pricing: 'Pay for storage + requests + transfer.',
        color: '#569A31'
    },
    {
        id: 'ebs',
        name: 'Amazon EBS',
        category: 'storage',
        icon: FaDatabase, // Fallback
        tagline: 'Block Storage for EC2',
        description: 'Easy to use, high performance block storage service designed for use with Amazon EC2.',
        detailedDescription: `Amazon Elastic Block Store (Amazon EBS) provides block level storage volumes for use with EC2 instances. EBS volumes remain independent from the lifecycle of an instance, meaning they can persist data even after the attached EC2 instance is terminated.
        
        EBS helps you tune applications with the right storage capacity, performance, and cost. It offers multiple volume types to optimize storage performance and cost for a broad range of applications.`,
        analogy: 'Virtual Hard Disk. A detachable drive you plug into your EC2 server.',
        useCases: ['Boot Volumes', 'Database Storage', 'Enterprise Applications'],
        pricing: 'Pay for provisioned size (GB) + performance (IOPS).',
        color: '#569A31'
    },
    {
        id: 'efs',
        name: 'Amazon EFS',
        category: 'storage',
        icon: FaNetworkWired, // Fallback
        tagline: 'Serverless File System',
        description: 'Serverless, fully elastic file storage so you can share file data without provisioning or managing storage.',
        detailedDescription: `Amazon Elastic File System (Amazon EFS) provides a simple, serverless, set-and-forget, elastic file system. It automatically grows and shrinks as you add and remove files with no need for management or provisioning.
        
        It is designed to provide massive scale, high availability, and high durability. EFS is accessible from multiple EC2 instances simultaneously, making it perfect for shared data workloads.`,
        analogy: 'Network Shared Drive (NAS). A folder that many EC2 servers can access at once.',
        useCases: ['CMS Content', 'Shared Data Sets', 'Dev Tools'],
        pricing: 'Pay for storage used.',
        color: '#569A31'
    },
    {
        id: 'glacier',
        name: 'S3 Glacier',
        category: 'storage',
        icon: FaCubes, // Fallback
        tagline: 'Long-term Archive Storage',
        description: 'Secure, durable, and extremely low-cost cloud storage classes for data archiving and long-term backup.',
        detailedDescription: `Amazon S3 Glacier storage classes are purposely built for data archiving, providing you with the highest performance, most retrieval flexibility, and the lowest cost archive storage in the cloud.
        
        You can choose from three archive storage classes optimized for different access patterns and storage duration. It provides virtually unlimited scalability and is designed for 99.999999999% (11 9s) of durability.`,
        analogy: 'Deep Freeze Vault. Cheap storage for things you rarely need to look at.',
        useCases: ['Compliance Archives', 'Media Archives', 'Backup Replacement'],
        pricing: 'Extremely low cost per GB.',
        color: '#569A31'
    },

    // --- DATABASE ---
    {
        id: 'rds',
        name: 'Amazon RDS',
        category: 'database',
        icon: SiAmazonrds,
        tagline: 'Managed Relational Databases',
        description: 'Set up, operate, and scale a relational database in the cloud with just a few clicks.',
        detailedDescription: `Amazon Relational Database Service (Amazon RDS) is a collection of managed services that makes it simple to set up, operate, and scale databases in the cloud. It frees you to focus on your applications and business by handling time-consuming database administration tasks like provisioning, patching, backup, recovery, failure detection, and repair.
        
        RDS supports popular engines including Amazon Aurora, PostgreSQL, MySQL, MariaDB, Oracle Database, and SQL Server.`,
        analogy: 'Automated Database Admin. Supports MySQL, PostgreSQL, Oracle, SQL Server.',
        useCases: ['Web Apps', 'E-commerce', 'Enterprise Apps'],
        pricing: 'Pay for instance hours + storage.',
        color: '#3B48CC'
    },
    {
        id: 'dynamodb',
        name: 'Amazon DynamoDB',
        category: 'database',
        icon: SiAmazondynamodb,
        tagline: 'Fast NoSQL Database',
        description: 'Key-value and document database that delivers single-digit millisecond performance at any scale.',
        detailedDescription: `Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale. DynamoDB offers built-in security, continuous backups, automated multi-region replication, in-memory caching, and data export tools.
        
        It is designed to handle consistent, single-digit millisecond latency for the world's most demanding applications, supporting peaks of more than 20 million requests per second.`,
        analogy: 'Super-Fast Spreadsheet. NoSQL database for massive scale and speed.',
        useCases: ['Gaming', 'Mobile Apps', 'Ad Tech'],
        pricing: 'Pay for R/W capacity or storage.',
        color: '#3B48CC'
    },
    {
        id: 'aurora',
        name: 'Amazon Aurora',
        category: 'database',
        icon: FaDatabase, // Fallback (or use SiAmazonrds)
        tagline: 'High Performance Managed DB',
        description: 'MySQL and PostgreSQL-compatible relational database built for the cloud.',
        detailedDescription: `Amazon Aurora is a fully managed relational database engine that's compatible with MySQL and PostgreSQL. It combines the speed and availability of high-end commercial databases with the simplicity and cost-effectiveness of open source databases.
        
        Aurora is up to five times faster than standard MySQL databases and three times faster than standard PostgreSQL databases. It features a distributed, fault-tolerant, self-healing storage system that auto-scales up to 128TB per database instance.`,
        analogy: 'RDS on Steroids. Faster, more durable, and auto-scaling relational DB.',
        useCases: ['High-traffic Web Apps', 'SaaS Applications'],
        pricing: 'Pay for instance + storage.',
        color: '#3B48CC'
    },
    {
        id: 'elasticache',
        name: 'Amazon ElastiCache',
        category: 'database',
        icon: SiAmazonelasticache,
        tagline: 'In-Moment Caching System',
        description: 'Deploy, operate, and scale popular open source compatible in-memory data stores (Redis/Memcached).',
        detailedDescription: `Amazon ElastiCache is a fully managed, in-memory caching service supporting flexible, real-time use cases. You can use ElastiCache for caching, which accelerates application and database performance, or as a primary data store for use cases that don't require durability like session stores, gaming leaderboards, streaming, and analytics.
        
        ElastiCache is compatible with Redis and Memcached.`,
        analogy: 'Short-term Memory (RAM). Speeds up database queries by remembering frequent answers.',
        useCases: ['Session Store', 'Gaming Leaderboards', 'Caching'],
        pricing: 'Pay for node hours.',
        color: '#3B48CC'
    },

    // --- NETWORKING ---
    {
        id: 'vpc',
        name: 'Amazon VPC',
        category: 'network',
        icon: FaNetworkWired, // Fallback
        tagline: 'Isolated Cloud Network',
        description: 'Provision a logically isolated section of the AWS Cloud where you can launch AWS resources.',
        detailedDescription: `Amazon Virtual Private Cloud (Amazon VPC) gives you full control over your virtual networking environment, including resource placement, connectivity, and security. It lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.
        
        You can create specific subnets for your web servers (public) and backend systems (private), and control the flow of traffic with route tables and gateways.`,
        analogy: 'Private Data Center. Your own secure slice of the cloud with your IP rules.',
        useCases: ['Network Isolation', 'Security', 'Traffic Control'],
        pricing: 'Free basics. Pay for NAT/VPN.',
        color: '#8C4FFF'
    },
    {
        id: 'cloudfront',
        name: 'Amazon CloudFront',
        category: 'network',
        icon: FaGlobe, // Fallback
        tagline: 'Content Delivery Network',
        description: 'Fast, highly secure and programmable content delivery network (CDN).',
        detailedDescription: `Amazon CloudFront is a web service that speeds up distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users. CloudFront delivers your content through a worldwide network of data centers called edge locations.
        
        When a user requests content that you're serving with CloudFront, the user is routed to the edge location that provides the lowest latency (time delay), so that content is delivered with the best possible performance.`,
        analogy: 'Local Caching Servers. Puts content closer to users worldwide for speed.',
        useCases: ['Streaming', 'Static Website Acceleration', 'Security (DDoS)'],
        pricing: 'Pay for data transfer out.',
        color: '#8C4FFF'
    },
    {
        id: 'route53',
        name: 'Amazon Route 53',
        category: 'network',
        icon: SiAmazonroute53,
        tagline: 'Scalable DNS System',
        description: 'Highly available and scalable cloud Domain Name System (DNS) web service.',
        detailedDescription: `Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. It is designed to give developers and businesses an extremely reliable and cost effective way to route end users to Internet applications by translating names like www.example.com into the numeric IP addresses like 192.0.2.1 that computers use to connect to each other.
        
        Route 53 effectively connects user requests to infrastructure running in AWS – such as EC2 instances, load balancers, or S3 buckets – and can also be used to route users to infrastructure outside of AWS.`,
        analogy: 'Phonebook of the Internet. Translates domain names to IP addresses.',
        useCases: ['Domain Registration', 'DNS Routing', 'Health Checks'],
        pricing: 'Pay per hosted zone + queries.',
        color: '#8C4FFF'
    },
    {
        id: 'apigateway',
        name: 'API Gateway',
        category: 'network',
        icon: SiAmazonapigateway,
        tagline: 'Build & Manage APIs',
        description: 'Fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs.',
        detailedDescription: `Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. APIs act as the "front door" for applications to access data, business logic, or functionality from your backend services.
        
        Using API Gateway, you can create RESTful APIs and WebSocket APIs that enable real-time two-way communication applications. API Gateway supports containerized and serverless workloads, as well as web applications.`,
        analogy: 'Front Desk / Receptionist. Manages incoming API requests and routes them to backend services.',
        useCases: ['RESTful APIs', 'WebSocket APIs', 'Serverless Fontends'],
        pricing: 'Pay per million calls.',
        color: '#8C4FFF'
    },

    // --- SECURITY ---
    {
        id: 'iam',
        name: 'AWS IAM',
        category: 'security',
        icon: SiAmazoniam,
        tagline: 'Identity Access Management',
        description: 'Securely control access to AWS services and resources for your users.',
        detailedDescription: `AWS Identity and Access Management (IAM) provides fine-grained access control across all of AWS. With IAM, you can specify who can access which services and resources, and under which conditions. With IAM policies, you manage permissions to your workforce and systems to ensure least-privilege permissions.
        
        IAM is a specific feature of your AWS account offered at no additional charge. You will be charged only for use of other AWS services by your users.`,
        analogy: 'User Accounts & Permissions. Who can do what in your AWS account.',
        useCases: ['Access Control', 'MFA', 'Service Roles'],
        pricing: 'Free.',
        color: '#DD344C'
    },
    {
        id: 'cognito',
        name: 'Amazon Cognito',
        category: 'security',
        icon: SiAmazoncognito,
        tagline: 'Customer Identity Management',
        description: 'Simple and secure user sign-up, sign-in, and access control.',
        detailedDescription: `Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Apple, Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0 and OpenID Connect.`,
        analogy: 'Auth-as-a-Service. Handles login/signup for your mobile/web apps.',
        useCases: ['App Authentication', 'Social Logins', 'SAML Integration'],
        pricing: 'Free tier up to 50k MAU.',
        color: '#DD344C'
    },
    {
        id: 'shield',
        name: 'AWS Shield',
        category: 'security',
        icon: FaShieldAlt,
        tagline: 'DDoS Protection',
        description: 'Managed Distributed Denial of Service (DDoS) protection service.',
        detailedDescription: `AWS Shield is a managed Distributed Denial of Service (DDoS) protection service that safeguards applications running on AWS. AWS Shield provides always-on detection and automatic inline mitigations that minimize application downtime and latency, so there is no need to engage AWS Support to benefit from DDoS protection.`,
        analogy: 'Bodyguard against mobs. Stops valid traffic from being overwhelmed by attacks.',
        useCases: ['DDoS Protection', 'Application Availability'],
        pricing: 'Standard is free. Advanced is expensive subscription.',
        color: '#DD344C'
    },
    {
        id: 'guardduty',
        name: 'Amazon GuardDuty',
        category: 'security',
        icon: FaEye, // Fallback
        tagline: 'Intelligent Threat Detection',
        description: 'A threat detection service that continuously monitors for malicious activity and unauthorized behavior.',
        detailedDescription: `Amazon GuardDuty is a threat detection service that continuously monitors your AWS accounts and workloads for malicious activity and delivers detailed security findings for visibility and remediation. GuardDuty combines machine learning and integrated threat intelligence from AWS and leading third parties to protect your AWS accounts and workloads.`,
        analogy: 'Security Camera System. Watch for suspicious bad guys in your account.',
        useCases: ['Threat Detection', 'Account Compromise Detection'],
        pricing: 'Pay per event analyzed.',
        color: '#DD344C'
    },
    {
        id: 'waf',
        name: 'AWS WAF',
        category: 'security',
        icon: FaShieldAlt, // Fallback from SiAwswaf
        tagline: 'Web Application Firewall',
        description: 'Protect your web applications from common web exploits that could affect availability or security.',
        detailedDescription: `AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits and bots that may affect availability, compromise security, or consume excessive resources. AWS WAF gives you control over how traffic reaches your applications by enabling you to create security rules that control bot traffic and block common attack patterns, such as SQL injection or cross-site scripting.`,
        analogy: 'Bouncer at the Club Door. Checks every request to see if it\'s allowed in.',
        useCases: ['SQL Injection Protection', 'XSS Prevention', 'Bot Control'],
        pricing: 'Pay per rule + request.',
        color: '#DD344C'
    },
    {
        id: 'inspector',
        name: 'Amazon Inspector',
        category: 'security',
        icon: FaBug, // Fallback from SiAmazoninspector
        tagline: 'Automated Vulnerability Management',
        description: 'Automated vulnerability management service that continually scans AWS workloads for software vulnerabilities.',
        detailedDescription: `Amazon Inspector is an automated vulnerability management service that continually scans AWS workloads for software vulnerabilities and unintended network exposure. Amazon Inspector automatically discovers and scans running EC2 instances and container images residing in Amazon Elastic Container Registry (Amazon ECR) for software vulnerabilities and unintended network exposure.`,
        analogy: 'Safety Inspector. Checks your servers to make sure the doors are locked properly.',
        useCases: ['EC2 Vulnerability Scan', 'Container Image Scan'],
        pricing: 'Pay per instance/image scanned.',
        color: '#DD344C'
    },
    {
        id: 'secretsmanager',
        name: 'AWS Secrets Manager',
        category: 'security',
        icon: FaUserSecret, // Fallback from SiAwssecretsmanager
        tagline: 'Rotate, Manage & Retrieve Secrets',
        description: 'Helps you protect secrets needed to access your applications, services, and IT resources.',
        detailedDescription: `AWS Secrets Manager helps you manage, retrieve, and rotate database credentials, application keys, and other secrets throughout their lifecycles. Users and applications retrieve secrets with a call to Secrets Manager API, eliminating the need to hard-code sensitive information in plain text.`,
        analogy: 'Digital Safe. Securely stores passwords and keys so you don\'t write them in code.',
        useCases: ['Database Credentials', 'API Keys'],
        pricing: 'Pay per secret per month.',
        color: '#DD344C'
    },

    // --- MANAGEMENT & GOVERNANCE ---
    {
        id: 'cloudwatch',
        name: 'Amazon CloudWatch',
        category: 'management',
        icon: FaChartBar, // Fallback from SiAmazoncloudwatch
        tagline: 'Observability & Monitoring',
        description: 'Monitoring and observability service built for DevOps engineers, developers, SREs, and IT managers.',
        detailedDescription: `Amazon CloudWatch provides you with data and actionable insights to monitor your applications, respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health. CloudWatch collects monitoring and operational data in the form of logs, metrics, and events.`,
        analogy: 'Dashboard & Alarms. The eyes and ears of your infrastructure.',
        useCases: ['Log Aggregation', 'Metrics Monitoring', 'Setting Alarms'],
        pricing: 'Pay per metric/log GB.',
        color: '#E05243'
    },
    {
        id: 'cloudtrail',
        name: 'AWS CloudTrail',
        category: 'management',
        icon: FaHistory, // Fallback from SiAmazoncloudtrail
        tagline: 'User Activity & API Auditing',
        description: 'Tracks user activity and API usage. Enables governance, compliance, and operational and risk auditing.',
        detailedDescription: `AWS CloudTrail records AWS API calls for your account and delivers log files to you. The recorded information includes the identity of the API caller, the time of the API call, the source IP address of the API caller, the request parameters, and the response elements returned by the AWS service.`,
        analogy: 'CCTV Recording. Records "who did what and when" in your account.',
        useCases: ['Compliance', 'Troubleshooting Deployment', 'Security Audit'],
        pricing: 'First copy free.',
        color: '#E05243'
    },
    {
        id: 'config',
        name: 'AWS Config',
        category: 'management',
        icon: FaClipboardList, // Fallback from SiAmazonconfig
        tagline: 'Resource Inventory & Compliance',
        description: 'Assess, audit, and evaluate the configurations of your AWS resources.',
        detailedDescription: `AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past so that you can see how the configurations and relationships change over time.`,
        analogy: 'Rule Enforcer. "You must have encryption on" - Config checks if you do.',
        useCases: ['Compliance Auditing', 'Change Management'],
        pricing: 'Pay per configuration item recorded.',
        color: '#E05243'
    },
    {
        id: 'autoscaling',
        name: 'AWS Auto Scaling',
        category: 'management',
        icon: FaChartBar,
        tagline: 'Application Scaling',
        description: 'Monitors your applications and automatically adjusts capacity to maintain steady, predictable performance.',
        detailedDescription: `AWS Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. Using AWS Auto Scaling, it's easy to setup application scaling for multiple resources across multiple services in minutes.`,
        analogy: 'Thermostat. Adds more AC (servers) when it gets hot (traffic high).',
        useCases: ['Handling Traffic Spikes', 'Cost Optimization'],
        pricing: 'Free (you pay for underlying resources).',
        color: '#E05243'
    },

    // --- APPLICATION INTEGRATION ---
    {
        id: 'sqs',
        name: 'Amazon SQS',
        category: 'integration',
        icon: SiAmazonsqs,
        tagline: 'Simple Queue Service',
        description: 'Fully managed message queuing service that enables you to decouple and scale microservices.',
        detailedDescription: `Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. SQS eliminates the complexity and overhead associated with managing and operating message oriented middleware, and empowers developers to focus on differentiating work.`,
        analogy: 'Buffer/Waiting Line. Holds messages until the receiver is ready to process them.',
        useCases: ['Decoupling Microservices', 'Batch Processing', 'Job Queues'],
        pricing: 'Pay per million requests.',
        color: '#D9408D'
    },
    {
        id: 'sns',
        name: 'Amazon SNS',
        category: 'integration',
        icon: FaBell, // Fallback from SiAmazonsns
        tagline: 'Simple Notification Service',
        description: 'Fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication.',
        detailedDescription: `Amazon Simple Notification Service (Amazon SNS) is a fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication. The A2A pub/sub functionality provides topics for high-throughput, push-based, many-to-many messaging between distributed systems, microservices, and event-driven serverless applications.`,
        analogy: 'Megaphone/Broadcaster. Send one message, and many subscribers get it (Email, SMS, Lambda).',
        useCases: ['Push Notifications', 'Fanout Archtecture', 'Alerting'],
        pricing: 'Pay per million requests.',
        color: '#D9408D'
    },
    {
        id: 'eventbridge',
        name: 'Amazon EventBridge',
        category: 'integration',
        icon: FaBolt, // Fallback from SiAmazoneventbridge
        tagline: 'Serverless Event Bus',
        description: 'Serverless event bus to build event-driven applications at scale using events from your own applications, SaaS apps, and AWS services.',
        detailedDescription: `Amazon EventBridge is a serverless event bus service that you can use to connect your applications using data from your own applications, software-as-a-service (SaaS) sources, and AWS services. EventBridge delivers a stream of real-time data from event sources such as Zendesk or Shopify to targets like AWS Lambda and other SaaS applications.`,
        analogy: 'Central Nervous System. Connects apps using data events.',
        useCases: ['Event-driven Architecture', 'SaaS Integration'],
        pricing: 'Pay per event matched.',
        color: '#D9408D'
    },

    // --- ANALYTICS ---
    {
        id: 'kinesis',
        name: 'Amazon Kinesis',
        category: 'analytics',
        icon: FaChartBar, // Fallback
        tagline: 'Real-time Data Streaming',
        description: 'Easily collect, process, and analyze video and data streams in real time.',
        detailedDescription: `Amazon Kinesis makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information. Amazon Kinesis offers key capabilities to cost-effectively process streaming data at any scale, along with the flexibility to choose the tools that best suit the requirements of your application.`,
        analogy: 'Data Firehose. Ingests massive streams of data instantly.',
        useCases: ['Log Analytics', 'Real-time Metrics', 'Video Streams'],
        pricing: 'Pay for shard hours.',
        color: '#693CC5'
    },
    {
        id: 'athena',
        name: 'Amazon Athena',
        category: 'analytics',
        icon: FaDatabase, // Fallback
        tagline: 'Query S3 with SQL',
        description: 'Interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL.',
        detailedDescription: `Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage, and you pay only for the queries that you run.
        
        Athena enables you to analyze data directly in Amazon S3 without the need to load it into a separate analytics platform.`,
        analogy: 'SQL for Files. Run database queries directly on text files in S3.',
        useCases: ['Log Analysis', 'Ad-hoc Data Analysis'],
        pricing: 'Pay per TB scanned.',
        color: '#693CC5'
    },

    // --- AI / ML ---
    {
        id: 'sagemaker',
        name: 'Amazon SageMaker',
        category: 'ai',
        icon: FaBrain, // Fallback
        tagline: 'Build, Train & Deploy ML',
        description: 'Fully managed service that provides every developer and data scientist to build ML models.',
        detailedDescription: `Amazon SageMaker helps data scientists and developers to prepare, build, train, and deploy high-quality machine learning (ML) models quickly by bringing together a broad set of capabilities purpose-built for ML. 
        
        It provides a complete set of tools to create generic or custom ML models, including managed Jupyter notebooks, automatic model tuning, and easy deployment to production.`,
        analogy: 'ML Studio. A complete workshop for building artificial intelligence models.',
        useCases: ['Custom ML Models', 'TensorFlow/PyTorch', 'Jupyter Notebooks'],
        pricing: 'Pay for instance usage.',
        color: '#125C2B' // Greenish for AI
    },
    {
        id: 'bedrock',
        name: 'Amazon Bedrock',
        category: 'ai',
        icon: FaBrain, // Fallback
        tagline: 'Generative AI Foundation Models',
        description: 'Easiest way to build and scale generative AI applications with foundation models.',
        detailedDescription: `Amazon Bedrock is a fully managed service that makes foundation models (FMs) from leading AI startups and Amazon available via an API, so you can choose from a wide range of FMs to find the model that is best suited for your use case.
        
        With Bedrock's serverless experience, you can quickly get started, easily customize FMs with your own data, and seamlessly integrate and deploy them into your applications using AWS tools.`,
        analogy: 'AI Model API. Access Claude, Stable Diffusion, and Titan via API.',
        useCases: ['Chatbots', 'Text Generation', 'Image Generation'],
        pricing: 'Pay per token.',
        color: '#125C2B'
    },
    {
        id: 'polly',
        name: 'Amazon Polly',
        category: 'ai',
        icon: FaBrain, // Fallback
        tagline: 'Text-to-Speech',
        description: 'Turn text into lifelike speech using deep learning.',
        detailedDescription: `Amazon Polly is a service that turns text into lifelike speech, allowing you to create applications that talk, and build entirely new categories of speech-enabled products. Polly's Text-to-Speech (TTS) service uses advanced deep learning technologies to synthesize natural sounding human speech.`,
        analogy: 'Robot Voice Actor. Reads your text out loud realistically.',
        useCases: ['Audiobooks', 'Voice Assistants', 'Accessibility'],
        pricing: 'Pay per character.',
        color: '#125C2B'
    },
    {
        id: 'rekognition',
        name: 'Amazon Rekognition',
        category: 'ai',
        icon: FaBrain, // Fallback
        tagline: 'Image & Video Analysis',
        description: 'Automate your image and video analysis with machine learning.',
        detailedDescription: `Amazon Rekognition offers pre-trained and customizable computer vision (CV) capabilities to extract information and insights from your images and videos. You can use Rekognition to detect objects, people, text, scenes, and activities in images and videos, as well as to detect any inappropriate content.`,
        analogy: 'Computer Vision API. Recognizes faces, objects, and text in images.',
        useCases: ['FaceID', 'Content Moderation', 'Object Detection'],
        pricing: 'Pay per image analyzed.',
        color: '#125C2B'
    },

    // --- DEVTOOLS ---
    {
        id: 'codepipeline',
        name: 'AWS CodePipeline',
        category: 'devtools',
        icon: FaTools, // Fallback
        tagline: 'Automate CI/CD Pipelines',
        description: 'Fully managed continuous delivery service that helps you automate your release pipelines.',
        detailedDescription: `AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates. CodePipeline automates the build, test, and deploy phases of your release process every time there is a code change, based on the release model you define.`,
        analogy: 'Assembly Line Manager. Automates the steps from code commit to deployment.',
        useCases: ['Automated Deployments', 'CI/CD'],
        pricing: 'Pay per active pipeline.',
        color: '#4A4A4A' // Greyish
    },
    {
        id: 'amplify',
        name: 'AWS Amplify',
        category: 'devtools',
        icon: SiAwsamplify,
        tagline: 'Build Full-stack Apps',
        description: 'Set of tools and services that lets frontend web and mobile developers build full stack applications.',
        detailedDescription: `AWS Amplify is a set of tools and services that enables mobile and front-end web developers to build secure, scalable full stack applications, powered by AWS. With Amplify, you can configure app backends and connect your app in minutes, deploy static web apps in a few clicks, and easily manage app content outside the AWS console.`,
        analogy: 'Frontend Accelerator. Easy backend-as-a-service for React/Vue/Mobile apps.',
        useCases: ['Mobile Backends', 'Hosting Single Page Apps', 'Auth & Data'],
        pricing: 'Pay for build time + hosting.',
        color: '#FF9900' // Orange-ish usually
    }
];
