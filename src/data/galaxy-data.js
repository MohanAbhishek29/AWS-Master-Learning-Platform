export const galaxyData = {
    nodes: [
        // --- THE CORE ---
        { id: "AWS", group: 0, val: 120, color: "#ffffff", desc: "The Cloud" },

        // --- CATEGORY HUBS ---
        { id: "Compute", group: 1, val: 50, color: "#FF9900" },
        { id: "Storage", group: 1, val: 50, color: "#00A1C9" },
        { id: "Database", group: 1, val: 50, color: "#3B48CC" },
        { id: "Network", group: 1, val: 50, color: "#8C4FFF" },
        { id: "Security", group: 1, val: 50, color: "#FF0055" },
        { id: "Analytics", group: 1, val: 50, color: "#693CC5" },
        { id: "AI_ML", group: 1, val: 50, color: "#125C2B" },
        { id: "DevTools", group: 1, val: 50, color: "#4A4A4A" },

        // --- COMPUTE ---
        { id: "EC2", group: 2, val: 5, color: "#FF9900", desc: "Virtual Servers" },
        { id: "Lambda", group: 2, val: 5, color: "#FF9900", desc: "Serverless Functions" },
        { id: "Fargate", group: 2, val: 5, color: "#FF9900", desc: "Serverless Containers" },
        { id: "ECS", group: 2, val: 5, color: "#FF9900", desc: "Container Service" },
        { id: "EKS", group: 2, val: 5, color: "#FF9900", desc: "Kubernetes" },
        { id: "ElasticBeanstalk", group: 2, val: 5, color: "#FF9900", desc: "Easy Deploy" },
        { id: "Lightsail", group: 2, val: 5, color: "#FF9900", desc: "Simple VPS" },
        { id: "Batch", group: 2, val: 5, color: "#FF9900", desc: "Batch Computing" },

        // --- STORAGE ---
        { id: "S3", group: 2, val: 5, color: "#00A1C9", desc: "Object Storage" },
        { id: "EBS", group: 2, val: 5, color: "#00A1C9", desc: "Block Storage" },
        { id: "EFS", group: 2, val: 5, color: "#00A1C9", desc: "File System" },
        { id: "Glacier", group: 2, val: 5, color: "#00A1C9", desc: "Archive" },
        { id: "StorageGateway", group: 2, val: 5, color: "#00A1C9", desc: "Hybrid Storage" },
        { id: "FSx", group: 2, val: 5, color: "#00A1C9", desc: "Windows File Server" },
        { id: "Backup", group: 2, val: 5, color: "#00A1C9", desc: "Centralized Backup" },

        // --- DATABASE ---
        { id: "RDS", group: 2, val: 5, color: "#3B48CC", desc: "Relational DB" },
        { id: "DynamoDB", group: 2, val: 5, color: "#3B48CC", desc: "NoSQL" },
        { id: "Aurora", group: 2, val: 5, color: "#3B48CC", desc: "Cloud Native DB" },
        { id: "ElastiCache", group: 2, val: 5, color: "#3B48CC", desc: "Caching" },
        { id: "Neptune", group: 2, val: 5, color: "#3B48CC", desc: "Graph DB" },
        { id: "Redshift", group: 2, val: 5, color: "#3B48CC", desc: "Warehousing" },
        { id: "Timestream", group: 2, val: 5, color: "#3B48CC", desc: "Time Series DB" },

        // --- NETWORK ---
        { id: "VPC", group: 2, val: 5, color: "#8C4FFF", desc: "Virtual Network" },
        { id: "Route53", group: 2, val: 5, color: "#8C4FFF", desc: "DNS" },
        { id: "CloudFront", group: 2, val: 5, color: "#8C4FFF", desc: "CDN" },
        { id: "APIGateway", group: 2, val: 5, color: "#8C4FFF", desc: "API Management" },
        { id: "DirectConnect", group: 2, val: 5, color: "#8C4FFF", desc: "Dedicated Connection" },
        { id: "TransitGateway", group: 2, val: 5, color: "#8C4FFF", desc: "Network Hub" },

        // --- SECURITY ---
        { id: "IAM", group: 2, val: 5, color: "#FF0055", desc: "Identity" },
        { id: "Cognito", group: 2, val: 5, color: "#FF0055", desc: "User Auth" },
        { id: "WAF", group: 2, val: 5, color: "#FF0055", desc: "Firewall" },
        { id: "Shield", group: 2, val: 5, color: "#FF0055", desc: "DDoS Protection" },
        { id: "KMS", group: 2, val: 5, color: "#FF0055", desc: "Encryption Keys" },
        { id: "Inspector", group: 2, val: 5, color: "#FF0055", desc: "Vulnhub Scanner" },
        { id: "GuardDuty", group: 2, val: 5, color: "#FF0055", desc: "Threat Detection" },

        // --- ANALYTICS ---
        { id: "Kinesis", group: 2, val: 5, color: "#693CC5", desc: "Streaming Data" },
        { id: "Athena", group: 2, val: 5, color: "#693CC5", desc: "SQL Query" },
        { id: "Glue", group: 2, val: 5, color: "#693CC5", desc: "ETL Service" },
        { id: "EMR", group: 2, val: 5, color: "#693CC5", desc: "Big Data" },
        { id: "QuickSight", group: 2, val: 5, color: "#693CC5", desc: "BI Dashboards" },
        { id: "MSK", group: 2, val: 5, color: "#693CC5", desc: "Managed Kafka" },

        // --- AI/ML ---
        { id: "SageMaker", group: 2, val: 5, color: "#125C2B", desc: "Build ML Models" },
        { id: "Bedrock", group: 2, val: 5, color: "#125C2B", desc: "Generative AI" },
        { id: "Polly", group: 2, val: 5, color: "#125C2B", desc: "Text-to-Speech" },
        { id: "Rekognition", group: 2, val: 5, color: "#125C2B", desc: "Image Analysis" },
        { id: "Transcribe", group: 2, val: 5, color: "#125C2B", desc: "Speech-to-Text" },
        { id: "Comprehend", group: 2, val: 5, color: "#125C2B", desc: "NLP" },

        // --- DEVTOOLS ---
        { id: "CodePipeline", group: 2, val: 5, color: "#4A4A4A", desc: "CI/CD" },
        { id: "CodeBuild", group: 2, val: 5, color: "#4A4A4A", desc: "Build Code" },
        { id: "CodeDeploy", group: 2, val: 5, color: "#4A4A4A", desc: "Deploy Code" },
        { id: "CodeCommit", group: 2, val: 5, color: "#4A4A4A", desc: "Source Control" },
        { id: "Amplify", group: 2, val: 5, color: "#FF9900", desc: "Frontend Framework" },
    ],
    links: [
        // --- CORE CONNECTIONS (The Unification) ---
        { source: "AWS", target: "Compute" }, { source: "AWS", target: "Storage" },
        { source: "AWS", target: "Database" }, { source: "AWS", target: "Network" },
        { source: "AWS", target: "Security" }, { source: "AWS", target: "Analytics" },
        { source: "AWS", target: "AI_ML" }, { source: "AWS", target: "DevTools" },

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
    ]
};
