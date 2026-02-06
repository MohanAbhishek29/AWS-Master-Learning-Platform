export const galaxyData = {
    nodes: [
        // --- THE CORE ---
        { id: "AWS", group: 0, val: 300, color: "#ffffff", desc: "The Cloud" },

        // --- CATEGORY HUBS ---
        { id: "Compute", group: 1, val: 250, color: "#FF9900" },
        { id: "Storage", group: 1, val: 250, color: "#00A1C9" },
        { id: "Database", group: 1, val: 250, color: "#3B48CC" },
        { id: "Network", group: 1, val: 250, color: "#8C4FFF" },
        { id: "Security", group: 1, val: 250, color: "#FF0055" },
        { id: "Analytics", group: 1, val: 250, color: "#693CC5" },
        { id: "AI_ML", group: 1, val: 250, color: "#125C2B" },
        { id: "DevTools", group: 1, val: 250, color: "#4A4A4A" },
        { id: "Messaging", group: 1, val: 250, color: "#FF4F81" },
        { id: "Management", group: 1, val: 250, color: "#E91E63" },
        { id: "AppIntegration", group: 1, val: 250, color: "#CC2200" }, // New Hub
        { id: "Migration", group: 1, val: 250, color: "#44AA00" },     // New Hub

        // --- COMPUTE ---
        { id: "EC2", group: 2, val: 200, color: "#FF9900", desc: "Virtual Servers" },
        { id: "Lambda", group: 2, val: 200, color: "#FF9900", desc: "Serverless Functions" },
        { id: "Fargate", group: 2, val: 200, color: "#FF9900", desc: "Serverless Containers" },
        { id: "ECS", group: 2, val: 200, color: "#FF9900", desc: "Container Service" },
        { id: "EKS", group: 2, val: 200, color: "#FF9900", desc: "Kubernetes" },
        { id: "ElasticBeanstalk", group: 2, val: 200, color: "#FF9900", desc: "Easy Deploy" },
        { id: "Lightsail", group: 2, val: 200, color: "#FF9900", desc: "Simple VPS" },
        { id: "Batch", group: 2, val: 200, color: "#FF9900", desc: "Batch Computing" },

        // --- STORAGE ---
        { id: "S3", group: 2, val: 200, color: "#00A1C9", desc: "Object Storage" },
        { id: "EBS", group: 2, val: 200, color: "#00A1C9", desc: "Block Storage" },
        { id: "EFS", group: 2, val: 200, color: "#00A1C9", desc: "File System" },
        { id: "Glacier", group: 2, val: 200, color: "#00A1C9", desc: "Archive" },
        { id: "StorageGateway", group: 2, val: 200, color: "#00A1C9", desc: "Hybrid Storage" },
        { id: "FSx", group: 2, val: 200, color: "#00A1C9", desc: "Windows File Server" },
        { id: "Backup", group: 2, val: 200, color: "#00A1C9", desc: "Centralized Backup" },

        // --- DATABASE ---
        { id: "RDS", group: 2, val: 200, color: "#3B48CC", desc: "Relational DB" },
        { id: "DynamoDB", group: 2, val: 200, color: "#3B48CC", desc: "NoSQL" },
        { id: "Aurora", group: 2, val: 200, color: "#3B48CC", desc: "Cloud Native DB" },
        { id: "ElastiCache", group: 2, val: 200, color: "#3B48CC", desc: "Caching" },
        { id: "Neptune", group: 2, val: 200, color: "#3B48CC", desc: "Graph DB" },
        { id: "Redshift", group: 2, val: 200, color: "#3B48CC", desc: "Warehousing" },
        { id: "Timestream", group: 2, val: 200, color: "#3B48CC", desc: "Time Series DB" },

        // --- NETWORK ---
        { id: "VPC", group: 2, val: 200, color: "#8C4FFF", desc: "Virtual Network" },
        { id: "Route53", group: 2, val: 200, color: "#8C4FFF", desc: "DNS" },
        { id: "CloudFront", group: 2, val: 200, color: "#8C4FFF", desc: "CDN" },
        { id: "APIGateway", group: 2, val: 200, color: "#8C4FFF", desc: "API Management" },
        { id: "DirectConnect", group: 2, val: 200, color: "#8C4FFF", desc: "Dedicated Connection" },
        { id: "TransitGateway", group: 2, val: 200, color: "#8C4FFF", desc: "Network Hub" },

        // --- SECURITY ---
        { id: "IAM", group: 2, val: 200, color: "#FF0055", desc: "Identity" },
        { id: "Cognito", group: 2, val: 200, color: "#FF0055", desc: "User Auth" },
        { id: "WAF", group: 2, val: 200, color: "#FF0055", desc: "Firewall" },
        { id: "Shield", group: 2, val: 200, color: "#FF0055", desc: "DDoS Protection" },
        { id: "KMS", group: 2, val: 200, color: "#FF0055", desc: "Encryption Keys" },
        { id: "Inspector", group: 2, val: 200, color: "#FF0055", desc: "Vulnhub Scanner" },
        { id: "GuardDuty", group: 2, val: 200, color: "#FF0055", desc: "Threat Detection" },

        // --- ANALYTICS ---
        { id: "Kinesis", group: 2, val: 200, color: "#693CC5", desc: "Streaming Data" },
        { id: "Athena", group: 2, val: 200, color: "#693CC5", desc: "SQL Query" },
        { id: "Glue", group: 2, val: 200, color: "#693CC5", desc: "ETL Service" },
        { id: "EMR", group: 2, val: 200, color: "#693CC5", desc: "Big Data" },
        { id: "QuickSight", group: 2, val: 200, color: "#693CC5", desc: "BI Dashboards" },
        { id: "MSK", group: 2, val: 200, color: "#693CC5", desc: "Managed Kafka" },

        // --- AI/ML ---
        { id: "SageMaker", group: 2, val: 200, color: "#125C2B", desc: "Build ML Models" },
        { id: "Bedrock", group: 2, val: 200, color: "#125C2B", desc: "Generative AI" },
        { id: "Polly", group: 2, val: 200, color: "#125C2B", desc: "Text-to-Speech" },
        { id: "Rekognition", group: 2, val: 200, color: "#125C2B", desc: "Image Analysis" },
        { id: "Transcribe", group: 2, val: 200, color: "#125C2B", desc: "Speech-to-Text" },
        { id: "Comprehend", group: 2, val: 200, color: "#125C2B", desc: "NLP" },

        // --- DEVTOOLS ---
        { id: "CodePipeline", group: 2, val: 200, color: "#4A4A4A", desc: "CI/CD" },
        { id: "CodeBuild", group: 2, val: 200, color: "#4A4A4A", desc: "Build Code" },
        { id: "CodeDeploy", group: 2, val: 200, color: "#4A4A4A", desc: "Deploy Code" },
        { id: "CodeCommit", group: 2, val: 200, color: "#4A4A4A", desc: "Source Control" },
        { id: "Amplify", group: 2, val: 200, color: "#FF9900", desc: "Frontend Framework" },

        // --- MESSAGING ---
        { id: "SQS", group: 2, val: 200, color: "#FF4F81", desc: "Queues" },
        { id: "SNS", group: 2, val: 200, color: "#FF4F81", desc: "Notifications" },
        { id: "EventBridge", group: 2, val: 200, color: "#FF4F81", desc: "Event Bus" },
        { id: "SES", group: 2, val: 200, color: "#FF4F81", desc: "Email" },

        // --- MANAGEMENT ---
        { id: "CloudWatch", group: 2, val: 200, color: "#E91E63", desc: "Monitoring" },
        { id: "CloudTrail", group: 2, val: 200, color: "#E91E63", desc: "Audit Logs" },
        { id: "Config", group: 2, val: 200, color: "#E91E63", desc: "Compliance" },
        { id: "AutoScaling", group: 2, val: 200, color: "#E91E63", desc: "Scale Compute" },
        { id: "SystemsManager", group: 2, val: 200, color: "#E91E63", desc: "Ops Center" },

        // --- EXTRAS ---
        { id: "ELB", group: 2, val: 200, color: "#8C4FFF", desc: "Load Balancing" },
        { id: "ECR", group: 2, val: 200, color: "#FF9900", desc: "Container Registry" },

        // --- APP INTEGRATION ---
        { id: "StepFunctions", group: 2, val: 200, color: "#CC2200", desc: "Orchestration" },
        { id: "AppSync", group: 2, val: 200, color: "#CC2200", desc: "GraphQL" },
        // API_Gateway removed (Already exists as APIGateway in Network)

        // --- MIGRATION ---
        { id: "DMS", group: 2, val: 200, color: "#44AA00", desc: "Database Migration" },
        { id: "SMS", group: 2, val: 200, color: "#44AA00", desc: "Server Migration" },
        { id: "Snowball", group: 2, val: 200, color: "#44AA00", desc: "Data Transport" },
    ],
    links: [
        // --- CORE CONNECTIONS (The Unification) ---
        { source: "AWS", target: "Compute" }, { source: "AWS", target: "Storage" },
        { source: "AWS", target: "Database" }, { source: "AWS", target: "Network" },
        { source: "AWS", target: "Security" }, { source: "AWS", target: "Analytics" },
        { source: "AWS", target: "AI_ML" }, { source: "AWS", target: "DevTools" },
        { source: "AWS", target: "Messaging" }, { source: "AWS", target: "Management" },
        { source: "AWS", target: "AppIntegration" }, { source: "AWS", target: "Migration" },

        // --- CATEGORY SPINES ---
        { source: "Compute", target: "EC2" }, { source: "Compute", target: "Lambda" },
        { source: "Compute", target: "Fargate" }, { source: "Compute", target: "ECS" },
        { source: "Compute", target: "EKS" }, { source: "Compute", target: "ElasticBeanstalk" },
        { source: "Compute", target: "Lightsail" }, { source: "Compute", target: "Batch" },

        { source: "Storage", target: "S3" }, { source: "Storage", target: "EBS" },
        { source: "Storage", target: "EFS" }, { source: "Storage", target: "Glacier" },
        { source: "Storage", target: "StorageGateway" }, { source: "Storage", target: "FSx" },
        { source: "Storage", target: "Backup" },

        { source: "Database", target: "RDS" }, { source: "Database", target: "DynamoDB" },
        { source: "Database", target: "Aurora" }, { source: "Database", target: "ElastiCache" },
        { source: "Database", target: "Neptune" }, { source: "Database", target: "Timestream" },
        { source: "Database", target: "Redshift" },

        { source: "Network", target: "VPC" }, { source: "Network", target: "Route53" },
        { source: "Network", target: "CloudFront" }, { source: "Network", target: "APIGateway" },
        { source: "Network", target: "DirectConnect" }, { source: "Network", target: "TransitGateway" },

        { source: "Security", target: "IAM" }, { source: "Security", target: "Cognito" },
        { source: "Security", target: "WAF" }, { source: "Security", target: "Shield" },
        { source: "Security", target: "KMS" }, { source: "Security", target: "Inspector" },
        { source: "Security", target: "GuardDuty" },

        { source: "Analytics", target: "Kinesis" }, { source: "Analytics", target: "Athena" },
        { source: "Analytics", target: "Glue" }, { source: "Analytics", target: "EMR" },
        { source: "Analytics", target: "QuickSight" }, { source: "Analytics", target: "MSK" },

        { source: "AI_ML", target: "SageMaker" }, { source: "AI_ML", target: "Bedrock" },
        { source: "AI_ML", target: "Polly" }, { source: "AI_ML", target: "Rekognition" },
        { source: "AI_ML", target: "Transcribe" }, { source: "AI_ML", target: "Comprehend" },

        { source: "DevTools", target: "CodePipeline" }, { source: "DevTools", target: "CodeBuild" },
        { source: "DevTools", target: "CodeDeploy" }, { source: "DevTools", target: "CodeCommit" },
        { source: "DevTools", target: "Amplify" },

        // --- DATA FLOW CONNECTIONS (The "Transfer" connections) ---
        { source: "EC2", target: "EBS" },
        { source: "EC2", target: "VPC" },
        { source: "Lambda", target: "DynamoDB" },
        { source: "CloudFront", target: "S3" },
        { source: "Kinesis", target: "S3" },
        { source: "Kinesis", target: "Redshift" },
        { source: "Athena", target: "S3" },
        { source: "SageMaker", target: "S3" },
        { source: "CodePipeline", target: "CodeBuild" },
        { source: "CodeDeploy", target: "EC2" },
        { source: "Amplify", target: "Cognito" },

        // --- MESSAGING ---
        { source: "Messaging", target: "SQS" }, { source: "Messaging", target: "SNS" },
        { source: "Messaging", target: "EventBridge" }, { source: "Messaging", target: "SES" },

        // --- MANAGEMENT ---
        { source: "Management", target: "CloudWatch" }, { source: "Management", target: "CloudTrail" },
        { source: "Management", target: "Config" }, { source: "Management", target: "AutoScaling" },
        { source: "Management", target: "SystemsManager" },

        // --- EXTRAS ---
        { source: "Network", target: "ELB" },
        { source: "Compute", target: "ECR" },

        // --- APP INTEGRATION ---
        { source: "AppIntegration", target: "StepFunctions" },
        { source: "AppIntegration", target: "AppSync" },

        // --- MIGRATION ---
        { source: "Migration", target: "DMS" }, { source: "Migration", target: "SMS" },
        { source: "Migration", target: "Snowball" },

        // --- CROSS LINKS ---
        { source: "StepFunctions", target: "Lambda" },
        { source: "StepFunctions", target: "DynamoDB" },
        { source: "AppSync", target: "DynamoDB" },
        { source: "DMS", target: "RDS" },
        { source: "Snowball", target: "S3" },
        { source: "SQS", target: "Lambda" },
        { source: "SNS", target: "Lambda" },
        { source: "EventBridge", target: "Lambda" },
        { source: "ELB", target: "EC2" },
        { source: "ELB", target: "AutoScaling" },
        { source: "CloudWatch", target: "EC2" },
        { source: "CloudWatch", target: "Lambda" },
        { source: "ECR", target: "ECS" },
        { source: "ECR", target: "EKS" },
    ]
};
